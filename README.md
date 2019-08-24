# Tesla Api Microservice

Lambda wrapper for the Tesla API. The lambda is set to respond to one endpoint that supports POST and GET http methods. Routes are followed based on the http method and the method route defined as query string parameters in the request.

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

To envoke this build script, make sure you are on the same directory as this script and your project folder (but not inside):
```.\build.sh EVA_Microservice```
The parameter will be the name of your project folder, which should be the name of the lambda in aws
