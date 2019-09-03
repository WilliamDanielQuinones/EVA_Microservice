output "microservice_api_url" {
  value = "${module.api_gateway.invoke_url}/${module.lambda.function_name}"
  description = "URL to call microservice."
}

output "microservice_api_key" {
  value = "${module.api_gateway.api_key}"
  description = "Api key for microservice api requests. To be used in header of request."
}
