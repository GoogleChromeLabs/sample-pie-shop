Steps followed to deploy app

1.generate google service account key
https://cloud.google.com/docs/authentication/production#auth-cloud-implicit-nodejs

npm install firebase-functions@latest firebase-admin@latest --save
npm install -g firebase-tools

gcloud auth application-default login

https://medium.com/google-cloud/firebase-separating-configuration-from-code-in-admin-sdk-d2bcd2e87de6

2. git clone https://sachinsshetty@github.com/sachinsshetty/2achocolates.git

--Update products
npm install dotenv algoliasearch firebase --save
--

export CLOUD_SDK_REPO="cloud-sdk-$(lsb_release -c -s)"
echo "deb http://packages.cloud.google.com/apt $CLOUD_SDK_REPO main" | sudo tee -a /etc/apt/sources.list.d/google-cloud-sdk.list

curl https://packages.cloud.google.com/apt/doc/apt-key.gpg | sudo apt-key add -


sudo apt-get update && sudo apt-get install google-cloud-sdk

glcoud init
rm -rf node_modules && npm ci && npm run clean && npm run lint && npm run build:prod && gcloud app deploy
