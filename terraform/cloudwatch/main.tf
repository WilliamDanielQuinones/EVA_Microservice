resource "aws_iam_policy" "lambda_logging" {
  count = 0
  name = "lambda_logging"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Effect": "Allow",
          "Action": "logs:CreateLogGroup",
          "Resource": "arn:aws:logs:us-east-1:${aws_lambda_function.tesla_microservice.arn}:*"
      },
      {
          "Effect": "Allow",
          "Action": [
              "logs:CreateLogStream",
              "logs:PutLogEvents"
          ],
          "Resource": [
              "arn:aws:logs:us-east-1:${aws_lambda_function.tesla_microservice.arn}:log-group:/aws/lambda/${aws_lambda_function.tesla_microservice.function_name}:*"
          ]
      }
  ]
}
EOF
}
