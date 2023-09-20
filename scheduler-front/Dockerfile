FROM node:20-alpine as BUILD_IMAGE

WORKDIR /usr/src/app
COPY package.json .
RUN yarn
COPY . .
RUN yarn build

FROM nginx:stable-alpine as PRODUCTION_IMAGE
COPY --from=BUILD_IMAGE /usr/src/app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]