FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY conf.d/ /etc/nginx/conf.d/

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
