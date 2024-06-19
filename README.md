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

auth & router
https://blog.logrocket.com/authentication-react-router-v6/
https://docs.expo.dev/router/reference/authentication/
https://docs.expo.dev/router/introduction/

reducer & context
https://react.dev/learn/scaling-up-with-reducer-and-context

storage
https://dev.to/ankittanna/how-to-create-a-type-for-complex-json-object-in-typescript-d81
https://docs.expo.dev/router/reference/authentication/

websockets
https://blog.logrocket.com/Socketentication-react-router-v6/
https://socket.io/how-to/use-with-react

github actions
https://www.raulmelo.me/en/blog/deploying-netlify-github-actions-guide
https://docs.netlify.com/cli/get-started/
https://docs.expo.dev/eas-update/github-actions/

javascript date
https://www.freecodecamp.org/news/how-to-format-dates-in-javascript/