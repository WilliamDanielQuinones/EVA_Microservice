resource "aws_kms_key" "microservice_key" {
  description = "Encryption key for secret config values for the Tesla microservice"
}

resource "aws_kms_grant" "microservice_grant" {
  name              = "microservice_grant"
  key_id            = "${aws_kms_key.microservice_key.key_id}"
  grantee_principal = "${var.iam_role_arn}"
  operations        = ["Encrypt", "Decrypt", "GenerateDataKey"]
}
