git pull

composer upgrade

mkdir -p ./target/prod
rm ./target/prod/*.zip
zip -r  ./target/prod/plugin-warpdriven-vsr.zip . -x "devops/**" "node_modules/**" "target/**" ".*"