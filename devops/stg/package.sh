git pull

composer upgrade
cp devops/stg/WDEnv.php src/

npm install
npm run build

mkdir -p ./target/stg
rm ./target/stg/*.zip
zip -r  ./target/stg/wd-vs-woo.zip . -x "devops/**" "node_modules/**" "target/**" ".*"
