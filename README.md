# Basic Chat

npm run db:dev:restart
npm run dev

npx expo start

npx expo export -p web
npx serve dist --single

dotenv -f .env run npx sequelize-cli db:migrate --env local
dotenv -f .env run npx sequelize-cli db:seed:all --env local

StickerSmash
https://docs.expo.dev/tutorial/introduction/

https://docs.expo.dev/router/introduction/