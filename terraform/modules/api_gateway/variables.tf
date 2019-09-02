variable "api_name" {
  type = "string"
  description = "Name of API."
}

variable "api_description" {
  type = "string"
  description = "Description of API."
}

variable "api_stage_name" {
  type = "string"
  description = "Stage name to use as part of path for API's URL."
}

variable "http_method" {
  type = "string"
  description = "HTTP method that API will accept. Valid values are: GET, PUT, POST, DELETE, HEAD, ANY."
}

variable "api_key_name" {
  type = "string"
  description = "Name for API key that API will require."
}

variable "usage_plan_name" {
  type = "string"
  description = "Name for usage plan that API will utilize."
}

variable "api_limit" {
  type = "string"
  description = "Integer limit for API calls in a given period."
  default = 20
}

variable "api_limit_period" {
  type = "string"
  description = "Period to track API calls for limit. Accepted Values are: DAY, WEEK, MONTH."
  default = "DAY"
}

variable "throttle_burst_limit" {
  type = "string"
  description = "Integer limit for API requests at any given time."
  default = 1
}

variable "throttle_rate_limit" {
  type = "string"
  description = "Integer limit for API requests that can occur within one second."
  default = 1
}

variable "microservice_function_name" {
  type = "string"
  description = "Name of microservice to use as part of path of API's URL."
}

variable "microservice_invoke_arn" {
  type = "string"
  description = "ARN of microservice to integrate api into microservice."
}
