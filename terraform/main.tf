provider "aws" {
  profile = "default"
  region  = "us-east-1"
}

data "aws_caller_identity" "current" {}

module "lambda" {
  source = "./modules/lambda"
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
  microservice_function_name = "${module.lambda.function_name}"
  microservice_invoke_arn = "${module.lambda.invoke_arn}"
}

module "ssm" {
  source = "./modules/ssm"
  kms_key_id = "${module.kms.key_id}"
}

module "kms" {
  source = "./modules/kms"
  iam_role_arn = "${module.lambda.iam_role_arn}"
}
