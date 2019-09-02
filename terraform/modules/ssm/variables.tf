variable "parameter_name" {
  type = "string"
  description = "Name of SSM parameter."
}

variable "parameter_type" {
  type = "string"
  description = "Type of SSM parameter. Valid values are: String, SecureString, StringList."
}

variable "parameter_value" {
  type = "string"
  description = "Value of parameter."
}

variable "kms_key_id" {
  type = "string"
  description = "Id of KMS key used to encrypt and decrypt secrets."
}
