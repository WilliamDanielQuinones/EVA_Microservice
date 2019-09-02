resource "aws_ssm_parameter" "tesla_credentials" {
  name = "Tesla_Microservice_Tesla_Account"
  type = "SecureString"
  key_id = "${var.kms_key_id}"

  value = ""
}

resource "aws_ssm_parameter" "google_maps_api_key" {
  name = "Tesla_Microservice_Google_api_key"
  type = "SecureString"
  key_id = "${var.kms_key_id}"

  value = ""
}
