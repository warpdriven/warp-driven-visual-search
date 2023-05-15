git pull

cp devops/prod/env.php ../wd-ai-php-sdk/src/

npm install
npm run build

mkdir ./target/prod
zip -r  ./target/prod/wd-vs-woo-prod.zip .