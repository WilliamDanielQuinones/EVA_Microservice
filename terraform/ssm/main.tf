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
