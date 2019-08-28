# Tesla Api Microservice

Lambda wrapper for the Tesla API. The lambda is set to respond to one endpoint that supports POST and GET http methods. Routes are followed based on the http method and the method route defined as query string parameters in the request.

## API Request

This lambda expects two query string parameters for it to work: route and vehicleName. Rather than having multiple lambdas for different api routes, this microservice will handle all different api routes internally for easier maintainability. The route parameter will be whatever path you want your api call to take, whether its a command for the car or just to retrieve data about the car. Valid route names for each HTTP method can be found in the handler.js file of the microservice.

Since there are currently no POST commands that require a body, there is no need to ever pass a body as part of the call for a POST command.

## Tesla Credentials

As part of the design of this microservice, your credentials are meant to be kept in a safe location only you can access. Currently, this should be in SSM. They should be stored as encrypted paramteres in the Parameter Store. The object that this microservice expects for authenticating your Tesla account is:
```
{"email": "email",
 "password": "password",
 "clientId": "clientId",
 "clientSecret": "clientSecret"}
```

You can find the latest client id and client secret from Tesla's API here:
<https://pastebin.com/pS7Z6yyP>

## Local Development

If using windows, you can use the following powershell script to automatically sync and build your code in aws lambda. This will only work if you have installed and configured the AWS CLI on your system:
```
if [ "$#" -ne 1 ]; then
  echo "Usage : ./build.sh lambdaName";
  exit 1;
fi

lambda=${1%/}; // # Removes trailing slashes
echo "Deploying $lambda";
cd $lambda;
if [ $? -eq 0 ]; then
  echo "...."
else
  echo "Couldn't cd to directory $lambda. You may have mis-spelled the lambda/directory name";
  exit 1
fi

echo "nmp installing...";
npm install
if [ $? -eq 0 ]; then
  echo "done";
else
  echo "npm install failed";
  exit 1;
fi

echo "Checking that aws-cli is installed"
which aws
if [ $? -eq 0 ]; then
  echo "aws-cli is installed, continuing..."
else
  echo "You need aws-cli to deploy this lambda. Google 'aws-cli install'"
  exit 1
fi

echo "removing old zip"
rm archive.zip;

echo "creating a new zip file"
zip archive.zip *  -r -x .git/\* \*.sh tests/\* node_modules/aws-sdk/\* \*.zip

echo "Uploading $lambda to $region";

aws lambda update-function-code --function-name $lambda --zip-file fileb://archive.zip --publish

if [ $? -eq 0 ]; then
  echo "!! Upload successful !!"
  read -p "Press enter to continue"
else
  echo "Upload failed"
  echo "If the error was a 400, check that there are no slashes in your lambda name"
  echo "Lambda name = $lambda"
  read -p "Press enter to continue"
  exit 1;
fi
```

To envoke this build script, make sure you run this script on the same directory where your project folder is (so outside of the project folder):
```.\build.sh EVA_Microservice```
The parameter will be the name of your project folder, which should also be the name of the lambda in aws.
