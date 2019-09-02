variable "lambda_name" {
  type = "string"
  description = "Name for lambda function."
}

variable "build_file_path" {
  type = "string"
  description = "Path for zipped file of microservice build."
}

variable "lambda_iam_role_name" {
  type = "string"
  description = "Name for lambda's main IAM role."
}

variable "lambda_iam_policy_name" {
  type = "string"
  description = "Name for lambda's IAM policies."
}

variable "lambda_iam_policy" {
  type = "string"
  description = "Policy for lambda permissions."
}


variable "api_gateway_execution_arn" {
  type = "string"
  description = "API Gateway Arn to connect to lambda."
}
