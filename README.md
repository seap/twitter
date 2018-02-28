
```
# Runs the app in development mode.
npm start or yarn start

# Builds the app for production to the build folder.
npm run build or yarn build
```

# nginx deploy
```
location /static {
    alias  /home/webadmin/twitter/build;
    index index.html index.htm;
    location ~* \.(eot|ttf|woff)$ {
        add_header Access-Control-Allow-Origin *;
    }
}

location /twitter {
    alias  /home/webadmin/twitter/build;
    index  index.html index.htm;
    try_files $uri $uri/ /index.html =404;
}

location /service/twitter/ {
    if ($http_origin ~ seayang\.me(:\d+)?$) {
        add_header 'Access-Control-Allow-Origin' "$http_origin";
        add_header 'Access-Control-Allow-Credentials' "true";
        add_header 'Access-Control-Allow-Headers' 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,token';
        add_header 'Access-Control-Allow-Methods' 'POST, GET, PUT, DELETE, OPTIONS';
    }

    # proxy_set_header   X-Real-IP $remote_addr;
    # proxy_set_header   Host      $http_host;
    proxy_pass         http://127.0.0.1:3000;
  }
```