resource "aws_api_gateway_rest_api" "microservice" {
  name        = "Tesla_API"
  description = "API for calling Tesla Microservice"
}

resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = "${aws_api_gateway_rest_api.microservice.id}"
  parent_id   = "${aws_api_gateway_rest_api.microservice.root_resource_id}"
  path_part   = "${var.microservice_function_name}"
}

resource "aws_api_gateway_method" "proxy" {
  rest_api_id = "${aws_api_gateway_rest_api.microservice.id}"
  resource_id = "${aws_api_gateway_resource.proxy.id}"

  http_method      = "ANY"
  authorization    = "NONE"
  api_key_required = true

  request_validator_id = "${aws_api_gateway_request_validator.proxy.id}"

  request_parameters = {
    "method.request.header.x-api-key" = true
  }
}

resource "aws_api_gateway_request_validator" "proxy" {
  name = "Validate query string parameters and headers"
  rest_api_id = "${aws_api_gateway_rest_api.microservice.id}"
  validate_request_parameters = true
}

resource "aws_api_gateway_integration" "microservice" {
  rest_api_id = "${aws_api_gateway_rest_api.microservice.id}"
  resource_id = "${aws_api_gateway_method.proxy.resource_id}"
  http_method = "${aws_api_gateway_method.proxy.http_method}"

  integration_http_method = "POST"
  type                    = "AWS_PROXY"
  uri                     = "${var.microservice_invoke_arn}"
}

resource "aws_api_gateway_deployment" "api" {
  depends_on = [
    "aws_api_gateway_integration.microservice",
  ]

  rest_api_id = "${aws_api_gateway_rest_api.microservice.id}"
  stage_name  = "tesla_api"
}

## API Gateway usage plan and api key
resource "aws_api_gateway_usage_plan" "api_control" {
  name = "Spam Prevention"

  api_stages {
    api_id = "${aws_api_gateway_rest_api.microservice.id}"
    stage  = "${aws_api_gateway_deployment.api.stage_name}"
  }

  quota_settings {
    limit  = 40
    period = "DAY"
  }

  throttle_settings {
    burst_limit = 1
    rate_limit  = 1
  }
}

resource "aws_api_gateway_api_key" "microservice_api_key" {
  name = "microservice_api_key"
}

resource "aws_api_gateway_usage_plan_key" "main" {
  key_id        = "${aws_api_gateway_api_key.microservice_api_key.id}"
  key_type      = "API_KEY"
  usage_plan_id = "${aws_api_gateway_usage_plan.api_control.id}"
}
