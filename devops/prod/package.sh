git pull

composer upgrade

npm install
npm run build

mkdir -p ./target/prod
rm ./target/prod/*.zip
zip -r  ./target/prod/plugin-warpdriven-vsr.zip . -x "devops/**" "node_modules/**" "target/**" ".*"