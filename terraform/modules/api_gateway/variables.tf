variable "microservice_function_name" {
  type = "string"
  description = "Name of microservice to use as path of API's URL."
}

variable "microservice_invoke_arn" {
  type = "string"
  description = "ARN of microservice to integrate api into microservice."
}
