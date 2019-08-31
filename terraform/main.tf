provider "aws" {
  profile = "default"
  region  = "us-east-1"
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

  depends_on = ["aws_iam_role_policy_attachment.lambda_permissions_policy"]
}

resource "aws_ssm_parameter" "tesla_credentials" {
  name   = "Tesla_Microservice_Tesla_Account"
  #type   = "SecureString"
  type = "String"
  #key_id = "${aws_kms_key.tesla_microservice_key.key_id}"

  value = "{\"email\": \"a@gmail.com\", \"password\": \"123\", \"clientId\": \"456\", \"clientSecret\": \"789\"}"
}

resource "aws_ssm_parameter" "google_maps_api_key" {
  name   = "Tesla_Microservice_Google_api_key"
  ##type   = "SecureString"
  type = "String"
  ##key_id = "${aws_kms_key.tesla_microservice_key.key_id}"

  value = "{\"key\": \"101112\"}"
}
