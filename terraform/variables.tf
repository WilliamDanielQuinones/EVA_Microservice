variable "tesla_email" {
  type = "string"
  description = "Email used for Tesla Account."
}

variable "tesla_password" {
  type = "string"
  description = "Password used for Tesla Account. This will be stored locally in the terraform.tfstate file and the terraform.tfvars file, neither of which will be checked into source control. On the cloud, these values will be on SSM."
}

variable "tesla_client_id" {
  type = "string"
  description = "Official, current Tesla client ID. Current Tesla codes: https://pastebin.com/pS7Z6yyP"
}

variable "tesla_client_secret" {
  type = "string"
  description = "Official, current Tesla client secret. Current Tesla codes: https://pastebin.com/pS7Z6yyP"
}

variable "google_maps_api_key" {
  type = "string"
  description = "Account API key used for google location services."
}
