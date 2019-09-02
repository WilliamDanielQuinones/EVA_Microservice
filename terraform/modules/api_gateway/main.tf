resource "aws_api_gateway_rest_api" "microservice" {
  name        = "${var.api_name}"
  description = "${var.api_description}"
}

resource "aws_api_gateway_resource" "proxy" {
  rest_api_id = "${aws_api_gateway_rest_api.microservice.id}"
  parent_id   = "${aws_api_gateway_rest_api.microservice.root_resource_id}"
  path_part   = "${var.microservice_function_name}"
}

resource "aws_api_gateway_method" "proxy" {
  rest_api_id = "${aws_api_gateway_rest_api.microservice.id}"
  resource_id = "${aws_api_gateway_resource.proxy.id}"

  http_method      = "${var.http_method}"
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
  stage_name  = "${var.api_stage_name}"
}

## API Gateway usage plan and api key
resource "aws_api_gateway_usage_plan" "api_control" {
  name = "${var.usage_plan_name}"

  api_stages {
    api_id = "${aws_api_gateway_rest_api.microservice.id}"
    stage  = "${aws_api_gateway_deployment.api.stage_name}"
  }

  quota_settings {
    limit  = "${var.api_limit}"
    period = "${var.api_limit_period}"
  }

  throttle_settings {
    burst_limit = "${var.throttle_burst_limit}"
    rate_limit  = "${var.throttle_rate_limit}"
  }
}

resource "aws_api_gateway_api_key" "microservice_api_key" {
  name = "${var.api_key_name}"
}

resource "aws_api_gateway_usage_plan_key" "main" {
  key_id        = "${aws_api_gateway_api_key.microservice_api_key.id}"
  key_type      = "API_KEY"
  usage_plan_id = "${aws_api_gateway_usage_plan.api_control.id}"
}
