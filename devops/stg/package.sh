git pull

composer upgrade

mkdir -p ./target/stg
rm ./target/stg/*.zip
### vim .env files , set the value of WARP_MODEL as STG
zip -r  ./target/stg/plugin-warpdriven-vsr.zip . -x "devops/**" "node_modules/**" "target/**" ".distignore" ".gitignore"
