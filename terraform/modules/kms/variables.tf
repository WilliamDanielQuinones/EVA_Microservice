variable "enable" {
  type = "string"
  description = "Number boolean to turn key on or off. 0 = false, 1 = true"
}

variable "key_alias" {
  type = "string"
  description = "Alias for KMS key."
}

variable "key_description" {
  type = "string"
  description = "Description of KMS key usage."
}

variable "grant_name" {
  type = "string"
  description = "Description of IAM policy grant for resource to use KMS key."
}

variable "grant_operations" {
  type = "list"
  description = "Description of KMS key usage."
}

variable "iam_role_arn" {
  type = "string"
  description = "IAM role arn that needs access to key."
}
