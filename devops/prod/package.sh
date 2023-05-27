git pull

composer upgrade
cp devops/prod/WDEnv.php src/

npm install
npm run build

mkdir -p ./target/prod
rm ./target/prod/*.zip
zip -r  ./target/prod/wd-vs-woo.zip . -x "devops/**" "node_modules/**" "target/**" ".*"