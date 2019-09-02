resource "aws_iam_policy" "logging" {
  name = "logging"

  policy = <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Effect": "Allow",
          "Action": "logs:CreateLogGroup",
          "Resource": "arn:aws:logs:us-east-1:${var.microservice_invoke_arn}:*"
      },
      {
          "Effect": "Allow",
          "Action": [
              "logs:CreateLogStream",
              "logs:PutLogEvents"
          ],
          "Resource": [
              "arn:aws:logs:us-east-1:${var.microservice_invoke_arn}:log-group:${var.log_group_name}:*"
          ]
      }
  ]
}
EOF
}

resource "aws_iam_role_policy_attachment" "logging_policy" {
  role       = "${var.iam_role_arn}"
  policy_arn = "${aws_iam_policy.logging.arn}"
}
