git pull

cp devops/prod/WDEnv.php vendor/warp-driven/php-sdk/src/

npm install
npm run build

mkdir ./target/prod
rm ./target/prod/*
zip -r  ./target/prod/wd-vs-woo-prod.zip . -x "devops/**" "target/**" ".*"