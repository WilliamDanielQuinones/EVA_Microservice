output "key_id" {
  value = "${aws_kms_key.microservice_key.key_id}"
  description = "Id of created KMS key."
}
