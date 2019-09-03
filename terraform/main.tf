provider "aws" {
  profile = "default"
  region  = "us-east-1"
}

data "aws_caller_identity" "current" {}

module "lambda" {
  source = "./modules/lambda"
  lambda_name = "Tesla_Microservice"
  build_file_path = "./../archive.zip"

  lambda_iam_role_name = "Tesla_Microservice_Execution_Role"
  lambda_iam_policy_name = "Tesla_Microservice_Permissions_Policy"
  lambda_iam_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Action": [
              "ssm:DescribeParameters"
          ],
          "Resource": "*",
          "Effect": "Allow"
      },
      {
          "Action": [
              "ssm:GetParameter"
          ],
          "Resource": "*",
          "Effect": "Allow"
      },
      {
        "Action": [
            "ssm:GetParameters"
        ],
        "Resource": "*",
        "Effect": "Allow"
      }
  ]
}
EOF

  api_gateway_execution_arn = "${module.api_gateway.execution_arn}"
}

# module "cloudwatch" {
#   source = "./modules/cloudwatch"
#   log_group_name = "/aws/lambda/${module.lambda.function_name}"

#   microservice_invoke_arn = "${module.lambda.invoke_arn}"
#   iam_role_arn = "${module.lambda.iam_role_arn}"
# }

module "api_gateway" {
  source = "./modules/api_gateway"
  api_name = "Tesla_API"
  api_description = "API for calling Tesla microservice"
  api_stage_name = "tesla_api"
  http_method = "ANY"

  api_key_name = "Tesla_Microservice_API_Key"

  usage_plan_name = "Spam Prevention"
  api_limit = 40
  api_limit_period = "DAY"
  throttle_burst_limit = 1
  throttle_rate_limit = 1

  microservice_function_name = "${module.lambda.function_name}"
  microservice_invoke_arn = "${module.lambda.invoke_arn}"
}

module "ssm_parameter_tesla_credentials" {
  source = "./modules/ssm"
  parameter_name = "Tesla_Microservice_Tesla_Account" ## This shouldn't be changed, the microservice is looking for this parameter name
  parameter_type = "SecureString"
  parameter_value = "{\"email\": \"${var.tesla_email}\", \"password\": \"${var.tesla_password}\", \"clientId\": \"${var.tesla_client_id}\", \"clientSecret\": \"${var.tesla_client_secret}\"}"

  kms_key_id = "${module.kms.key_id}"
}

module "ssm_parameter_google_api_key" {
  source = "./modules/ssm"
  parameter_name = "Tesla_Microservice_Google_Api_Key" ## This shouldn't be changed, the microservice is looking for this parameter name
  parameter_type = "SecureString"
  parameter_value = "{\"key\": \"${var.google_maps_api_key}\"}"

  kms_key_id = "${module.kms.key_id}"
}

module "kms" {
  enable = 1
  source = "./modules/kms"
  key_description = "Encryption key for Tesla microservice secrets"
  key_alias = "Tesla-Microservice"

  grant_name = "Tesla_Microservice_KMS_grant"
  grant_operations = ["Encrypt", "Decrypt"]

  iam_role_arn = "${module.lambda.iam_role_arn}"
}
