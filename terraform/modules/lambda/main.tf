resource "aws_lambda_function" "microservice" {
  filename      = "./../archive.zip"
  function_name = "Tesla_Microservice"
  role          = "${aws_iam_role.lambda.arn}"
  handler       = "index.handler"

  source_code_hash = "${filebase64sha256("./../archive.zip")}"

  runtime = "nodejs8.10"

  timeout = 30

  depends_on = ["aws_iam_role_policy_attachment.microservice_permissions"]

  reserved_concurrent_executions = 1
}

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

resource "aws_iam_policy" "microservice_permissions" {
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

resource "aws_lambda_permission" "api" {
  statement_id  = "AllowAPIGatewayInvoke"
  action        = "lambda:InvokeFunction"
  function_name = "${aws_lambda_function.microservice.function_name}"
  principal     = "apigateway.amazonaws.com"

  # The "/*/*" portion grants access from any method on any resource
  # within the API Gateway REST API.
  source_arn = "${var.api_gateway_execution_arn}/*/*"
}

resource "aws_iam_role_policy_attachment" "microservice_permissions" {
  role       = "${aws_iam_role.lambda.name}"
  policy_arn = "${aws_iam_policy.microservice_permissions.arn}"
}
