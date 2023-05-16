git pull

composer upgrade
cp devops/stg/WDEnv.php vendor/warp-driven/php-sdk/src/

npm install
npm run build

mkdir -p ./target/stg
rm ./target/prod/*
zip -r  ./target/stg/wd-vs-woo.zip . -x "devops/**" "target/**" ".*"
