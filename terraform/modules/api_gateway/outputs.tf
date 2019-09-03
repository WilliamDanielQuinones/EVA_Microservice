output "execution_arn" {
  value = "${aws_api_gateway_rest_api.microservice.execution_arn}"
  description = "Arn to connect API Gateway to desired resource."
}

output "invoke_url" {
  value = "${aws_api_gateway_deployment.api.invoke_url}"
  description = "URL to call microservice."
}

output "api_key" {
  value = "${aws_api_gateway_api_key.microservice_api_key.value}"
  description = "Api key for microservice api requests. To be used in header of request."
}
