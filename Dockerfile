# 첫 번째 단계: Node.js 이미지를 기반으로 애플리케이션 빌드
FROM node:alpine AS build

WORKDIR '/app'

COPY package.json .
RUN yarn install
COPY . .

RUN yarn run build

# 두 번째 단계: Nginx 이미지를 기반으로 빌드 결과 호스팅
FROM nginx:stable-alpine

# 빌드 결과를 Nginx가 호스팅할 수 있도록 복사
COPY --from=build /app/dist /usr/share/nginx/html

# Nginx가 80번 포트를 사용하므로 80번 포트를 열어둡니다.
EXPOSE 80

# Nginx 시작
CMD ["nginx", "-g", "daemon off;"]
