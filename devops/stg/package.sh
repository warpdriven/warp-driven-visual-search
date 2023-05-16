git pull

composer upgrade
cp devops/stg/WDEnv.php vendor/warp-driven/php-sdk/src/

npm install
npm run build

mkdir ./target/stg
rm ./target/prod/*
zip -r  ./target/stg/wd-vs-woo-stg.zip . -x "devops/**" "target/**" ".*"
