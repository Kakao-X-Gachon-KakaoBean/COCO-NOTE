# builder stage
FROM node:alpine as builder

WORKDIR '/usr/src/app'

COPY . .

RUN yarn install --immutable

RUN yarn build

# run stage
FROM nginx
EXPOSE 80
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html
