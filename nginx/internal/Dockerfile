FROM nginx:1.25.1-alpine

COPY nginx.conf /etc/nginx/conf.d
RUN rm /etc/nginx/conf.d/default.conf
EXPOSE 80
EXPOSE 443