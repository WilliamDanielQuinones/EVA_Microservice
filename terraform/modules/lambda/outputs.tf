output "function_name" {
  value = "${aws_lambda_function.microservice.function_name}"
  description = "Name of lambda function."
}

output "invoke_arn" {
  value = "${aws_lambda_function.microservice.invoke_arn}"
  description = "Arn of lambda function."
}

output "iam_role_arn" {
  value = "${aws_iam_role.lambda.arn}"
  description = "Arn of lambda's main IAM role."
}

output "iam_role_name" {
  value = "${aws_iam_role.lambda.name}"
  description = "Name of lambda's main IAM role."
}
