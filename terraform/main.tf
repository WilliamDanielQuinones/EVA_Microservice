provider "aws" {
  profile = "default"
  region  = "us-east-1"
}

data "aws_caller_identity" "current" {}

## Lambda
resource "aws_iam_role" "lambda" {
  name = "lambda"

  assume_role_policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
      {
        "Action": "sts:AssumeRole",
        "Principal": {
          "Service": "lambda.amazonaws.com"
        },
        "Effect": "Allow",
        "Sid": ""
      }
  ]
}
EOF
}

resource "aws_iam_policy" "lambda_permissions" {
  name = "lambda_ssm_permissions"

  policy = <<EOF
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
}

resource "aws_lambda_permission" "apigw" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.tesla_microservice.function_name}"
  principal     = "apigateway.amazonaws.com"

  # The "/*/*" portion grants access from any method on any resource
  # within the API Gateway REST API.
  source_arn = "${aws_api_gateway_rest_api.tesla_microservice.execution_arn}/*/*"
}

resource "aws_iam_role_policy_attachment" "lambda_permissions_policy" {
  role       = "${aws_iam_role.lambda.name}"
  policy_arn = "${aws_iam_policy.lambda_permissions.arn}"
}

# resource "aws_iam_role_policy_attachment" "lambda_logging_policy" {
#   role       = "${aws_iam_role.lambda.name}"
#   policy_arn = "${aws_iam_policy.lambda_logging.arn}"
# }

resource "aws_lambda_function" "tesla_microservice" {
  filename      = "./../archive.zip"
  function_name = "Tesla_Microservice"
  role          = "${aws_iam_role.lambda.arn}"
  handler       = "index.handler"

  source_code_hash = "${filebase64sha256("./../archive.zip")}"

  runtime = "nodejs8.10"

  timeout = 30

  depends_on = ["aws_iam_role_policy_attachment.lambda_permissions_policy"]
}


## SSM
resource "aws_ssm_parameter" "tesla_credentials" {
  name = "Tesla_Microservice_Tesla_Account"
  type = "SecureString"
  #type = "String"
  key_id = "${aws_kms_key.tesla_microservice_key.key_id}"

  value = ""
}

resource "aws_ssm_parameter" "google_maps_api_key" {
  name = "Tesla_Microservice_Google_api_key"
  type = "SecureString"
  #type = "String"
  key_id = "${aws_kms_key.tesla_microservice_key.key_id}"

  value = ""
}

## Api Gateway
resource "aws_api_gateway_rest_api" "tesla_microservice" {
  name        = "Tesla_API"
  description = "This is my API for demonstration purposes"
}

resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = "${aws_api_gateway_rest_api.tesla_microservice.id}"
  parent_id   = "${aws_api_gateway_rest_api.tesla_microservice.root_resource_id}"
  path_part   = "${aws_lambda_function.tesla_microservice.function_name}"
}

resource "aws_api_gateway_method" "proxy" {
  rest_api_id = "${aws_api_gateway_rest_api.tesla_microservice.id}"
  resource_id = "${aws_api_gateway_resource.proxy.id}"

  http_method      = "ANY"
  authorization    = "NONE"
  api_key_required = true

  request_validator_id = "${aws_api_gateway_request_validator.proxy.id}"

  request_parameters = {
    "method.request.header.x-api-key" = true
  }
}

resource "aws_api_gateway_request_validator" "proxy" {
  name                        = "Validate query string parameters and headers"
  rest_api_id                 = "${aws_api_gateway_rest_api.tesla_microservice.id}"
  validate_request_parameters = true
}

resource "aws_api_gateway_integration" "lambda" {
  rest_api_id = "${aws_api_gateway_rest_api.tesla_microservice.id}"
  resource_id = "${aws_api_gateway_method.proxy.resource_id}"
  http_method = "${aws_api_gateway_method.proxy.http_method}"

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${aws_lambda_function.tesla_microservice.invoke_arn}"
}

resource "aws_api_gateway_deployment" "tesla_api" {
  depends_on = [
    "aws_api_gateway_integration.lambda",
  ]

  rest_api_id = "${aws_api_gateway_rest_api.tesla_microservice.id}"
  stage_name  = "tesla_api"
}

## API Gateway usage plan and api key
resource "aws_api_gateway_usage_plan" "spam_prevention" {
  name = "spam_prevention"

  api_stages {
    api_id = "${aws_api_gateway_rest_api.tesla_microservice.id}"
    stage  = "${aws_api_gateway_deployment.tesla_api.stage_name}"
  }

  quota_settings {
    limit  = 40
    period = "DAY"
  }

  throttle_settings {
    burst_limit = 1
    rate_limit  = 1
  }
}

resource "aws_api_gateway_api_key" "slackboit_api_key" {
  name = "slackboit_api_key"
}

resource "aws_api_gateway_usage_plan_key" "main" {
  key_id        = "${aws_api_gateway_api_key.slackboit_api_key.id}"
  key_type      = "API_KEY"
  usage_plan_id = "${aws_api_gateway_usage_plan.spam_prevention.id}"
}

output "base_url" {
  value = "${aws_api_gateway_deployment.tesla_api.invoke_url}"
}

## KMS
resource "aws_kms_key" "tesla_microservice_key" {
  description = "Encryption key for secret config values for the Tesla microservice"
}

resource "aws_kms_grant" "lambda_grant" {
  name              = "lambda_grant"
  key_id            = "${aws_kms_key.tesla_microservice_key.key_id}"
  grantee_principal = "${aws_iam_role.lambda.arn}"
  operations        = ["Encrypt", "Decrypt", "GenerateDataKey"]
}
