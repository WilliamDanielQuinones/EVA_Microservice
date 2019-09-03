echo "Creating archive.zip build folder";
cd ../;
if [ $? -eq 0 ]; then
  echo "...."
else
  echo "Couldn't cd to main project directory.";
  exit 1
fi

echo "npm installing...";
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
  echo "You will need aws-cli to deploy this lambda with Terraform. Google 'aws-cli install'"
  exit 1
fi

echo "removing old zip"
rm archive.zip;

echo "creating a new zip file"
zip archive.zip *  -r -x .git/\* \*.sh tests/\* node_modules/aws-sdk/\* terraform/\* build/\* \*.zip

echo "!! Build successful !!"
   read -p "Press enter to continue"
