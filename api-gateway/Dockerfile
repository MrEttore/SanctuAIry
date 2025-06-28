FROM nginx:stable-alpine

RUN apk add --no-cache gettext

COPY conf.d/default.conf.tmpl /etc/nginx/conf.d/default.conf.tmpl

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

RUN ln -sf /dev/stdout /var/log/nginx/access.log \
 && ln -sf /dev/stderr /var/log/nginx/error.log

EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]
