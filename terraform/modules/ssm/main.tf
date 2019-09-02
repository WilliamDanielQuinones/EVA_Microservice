resource "aws_ssm_parameter" "param" {
  name = "${var.parameter_name}"
  type = "${var.parameter_type}"
  key_id = "${var.parameter_type == "SecureString" ? var.kms_key_id : ""}"

  value = "${var.parameter_value}"
}
