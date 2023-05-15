git pull

cp devops/prod/env.php ../wd-ai-php-sdk/src/

npm install
npm run build

zip -r  devops/stg/wd-vs-woo.zip .