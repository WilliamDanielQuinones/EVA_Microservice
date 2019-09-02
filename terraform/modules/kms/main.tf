resource "aws_kms_key" "microservice_key" {
  is_enabled = "${var.enable}"
  description = "${var.key_description}"
  deletion_window_in_days = 7
}

resource "aws_kms_alias" "a" {
  name          = "alias/${var.key_alias}"
  target_key_id = "${aws_kms_key.microservice_key.key_id}"
}

resource "aws_kms_grant" "microservice_grant" {
  name              = "${var.grant_name}"
  key_id            = "${aws_kms_key.microservice_key.key_id}"
  grantee_principal = "${var.iam_role_arn}"
  operations        = "${var.grant_operations}"
}
