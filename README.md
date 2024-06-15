# Basic Chat

npx expo start

npx expo export -p web
npx serve dist --single

dotenv -f .env run npx sequelize-cli db:migrate --env local
dotenv -f .env run npx sequelize-cli db:seed:all --env local