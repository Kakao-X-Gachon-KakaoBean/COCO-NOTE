FROM node:alpine as builder

RUN apk add --no-cache python3 make g++

WORKDIR '/usr/src/app'

COPY . .

RUN yarn install --immutable

RUN yarn build

# run stage
FROM nginx
EXPOSE 80
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
