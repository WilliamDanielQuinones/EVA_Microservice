# Tesla Microservice

This is an API wrapper for the Tesla API. This microservice will be useful to you if you would like to get data from your Tesla or send commands to your Tesla without using the official Tesla application.

Using this microservice to send commands to your car will also avoid having to manually wait for the 'waking up' phase the app has to do each time you open it. There are other Tesla applications in the app store that already do this for you, but I don't personally like for a third party to have the credentials to my car.

By using this microservice, only you know where your credentials are and how they are being used.

### TLDR Initial set up

Must have installed and setup:
- AWS CLI
- Terraform

Steps to setup:
- Run build script (build/windows/build.sh)
- Navigate to `terraform` folder
- Create `terraform.tfvars` from `terraform.tfvars.example` and set credentials and Tesla client info
- Run `terraform init`
- Run `terraform plan` (optional)
- Run `terraform apply`
- Run `terraform output` to get the microservice api url and the api key

## About the microservice

The lambda is set to respond to one endpoint that supports POST and GET http methods. Routes are followed based on the http method and the method route, defined as a query string parameter in the request. The URL and Api key used to call this microservice is set by API Gateway, which youll be able to see on the AWS console or on the Terraform output after you plan/apply the infrastructure.

### API Requests

This lambda expects two query string parameters for it to work: route and vehicleName. Valid routes for each HTTP method can be found in the handler.js file of the microservice. Generally, POST requests will be used to send a command to your car, while GET requests are used to retrieve data from your car. Whenever the lambda recieves a request through API Gateway, it will grab your credentials from the SSM Parameter Store and then perform whatever action was specified by the route variable.


### Tesla Credentials

Your credentials are meant to be kept in a safe location only you can access. There are three places where your credentials will be kept to make the microservice work:

- terraform.tfvars (local filesystem only, if using Terraform)
- terraform.tfstate (local filesystem only, if using Terraform)
- SSM

The microservice will create these parameters on the SSM Parameter Store as encrypted parameters using a newly generated KMS key. While these values will be encrypted to and from the application, you can still read these values on the AWS console if you have SSM permissions.


## Using the microservice

After setup is complete, you will have a url to use to talk to your car and an api key for security.

The URL will look like: `https://{api_gateway_id}.execute-api.{aws_region}.amazonaws.com/tesla_api/Tesla_Microservice?vehicleName={name}&route={command}`

With the `x-api-key` header property and the value being the API key set by API Gateway.

You can find the possible `route` variable options in handler.js

### Initial set up

In order to use this microservice, you need to have an AWS account with permissions to create resources in Lambda, SSM, KMS, and API Gateway. You also need to have the AWS CLI installed and properly configured to your account, as well Terraform downloaded and properly set in your system's PATH. Links to setup these services if you don't have them already can be found at the bottom of this README.

Having AWS CLI and Terraform is optional, but highly recommended to easily setup the microservice. If you choose to not use the AWS CLI, you will need to manually update the lambda code. If you choose not to use Terraform, you will need to manually stand up the infrastucture on AWS yourself.

If you have these services ready, setting up the microservice should take 30 seconds.

The first step should be to make sure you generate the build .zip for the lambda by running the build script. If you choose not to use Terraform, you can use this .zip file to import it to AWS manually or using the CLI.

#### Terraform

This is the easiest and recommended way to setup the infrastructure for your microservice. If you choose not to use Terraform, you will have to configure everything on AWS manually. , you can skip most of this section, but just make sure you save your credentials to `terraform.tfvars`.

To setup the microservice, clone the repo and navigate to the `terraform` folder. You will need to copy the `terraform.tfvars.example` file and name it `terraform.tfvars` and then add your credentials and Tesla client info to it. This is what terraform will use to create the proper SSM parameters for your microservice instance. If ever need to update your credentials, you can do so in this file and terraform will update them in SSM for you after a plan/apply.

Once your credentials are set, you will need to run `terraform init` while youre on the `terraform` folder. This only has to be done once to initialize terraform in your directory.

You can check over the top-level `main.tf` for your cloud services configurations and change any values as necessary. The only code dependent values that need to be kept the same are the names of your SSM parameters.

When you're ready to create or update the code or infrastructure on AWS, run `terraform plan` (still in the terraform folder). This will show you all resources and their corresponding config values that are to be created.

After ensuring the plan looks correct, run `terrraform apply`. Terraform will prompt you to validate the changes, you can type 'yes' to confirm.

After the apply is over, that's it! You should be able to call your microservice URL using the URL provided with the `terraform output` command on your console.

#### Sanity Checks

To check if you have AWS CLI installed, run:
``` aws --version ```

To check if you have Terraform installed, run:
``` terraform -v ```


## Local Development

To update the infrastructure, simply run the plan and apply commands again.

To update the code on the remote lambda, just run the build script again, and then you can plan and apply again to update the lambda.


## Helpful Links

Installing and configuring AWS CLI
- <https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html>
- <https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html>

Installing Terraform
- <https://learn.hashicorp.com/terraform/getting-started/install.html>

Latest client ID and client secret from Tesla's API here:
- <https://pastebin.com/pS7Z6yyP>
