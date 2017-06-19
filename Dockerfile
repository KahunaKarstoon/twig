FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY dist /usr/share/nginx/html
EXPOSE 80
CMD [ "/usr/sbin/nginx", "-g" , "'daemon off;'" ]
