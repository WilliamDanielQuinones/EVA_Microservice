resource "aws_lambda_function" "microservice" {
  filename      = "${var.build_file_path}"
  function_name = "${var.lambda_name}"
  role          = "${aws_iam_role.lambda.arn}"
  handler       = "index.handler"

  source_code_hash = "${filebase64sha256("${var.build_file_path}")}"

  runtime = "nodejs8.10"

  timeout = 30

  depends_on = ["aws_iam_role_policy_attachment.microservice_permissions"]

  reserved_concurrent_executions = 1
}

resource "aws_iam_role" "lambda" {
  name = "${var.lambda_iam_role_name}"

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

resource "aws_iam_policy" "microservice_permissions" {
  name = "${var.lambda_iam_policy_name}"

  policy = "${var.lambda_iam_policy}"
}

resource "aws_iam_role_policy_attachment" "microservice_permissions" {
  role       = "${aws_iam_role.lambda.name}"
  policy_arn = "${aws_iam_policy.microservice_permissions.arn}"
}

## Used only if connecting lambda to API Gateway
resource "aws_lambda_permission" "api" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.microservice.function_name}"
  principal     = "apigateway.amazonaws.com"

  # The "/*/*" portion grants access from any method on any resource
  # within the API Gateway REST API.
  source_arn = "${var.api_gateway_execution_arn}/*/*"
}
