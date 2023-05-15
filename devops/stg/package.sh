git pull

cp devops/stg/env.php ../wd-ai-php-sdk/src/

npm install
npm run build

zip -r  devops/stg/wd-vs-woo.zip .
# zip -r  wd-woo-plugin-nlp-php.zip wd-woo-plugin-nlp-php