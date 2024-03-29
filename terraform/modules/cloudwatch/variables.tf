variable "log_group_name" {
  type = "string"
  description = "Name for cloudwatch log group."
}

variable "microservice_invoke_arn" {
  type = "string"
  description = "ARN of microservice to use for cloudwatch iam policy."
}

variable "iam_role_name" {
  type = "string"
  description = "IAM role name that needs access to cloudwatch."
}
