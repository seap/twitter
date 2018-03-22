# setup local dev environment
1. run the node server of twitter Authorization firstly
```
git clone git@github.com:seap/twitter-auth.git
cd twitter-auth
npm i
npm run start
```

2. we need config 'Access-Control-Allow-Origin' for server, because of browser's same-origin policy
if not, there will be Access-Control error in my twitter page running in browser.
There I recommend nginx config, please refer as below.
```
server {
  listen  80;
  server_name  seayang.me;
  location / {
    add_header 'Access-Control-Allow-Origin' "$http_origin";
    add_header 'Access-Control-Allow-Credentials' "true";
    add_header 'Access-Control-Allow-Headers' 'DNT,X-Mx-ReqToken,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Authorization,token';
    add_header 'Access-Control-Allow-Methods' 'POST, GET, PUT, DELETE, OPTIONS';

    proxy_pass http://127.0.0.1:3000;
  }
}
```

3. run the react page project
```
git clone git@github.com:seap/twitter.git
cd twitter
npm i
npm run start
```
Notes: the twitter server address is fixed in code(/src/redux/twitter.js)
if you config a different domain name in your local nginx, please change it.
```
# /src/redux/twitter.js
const TWITTER_SERVICE = '//seayang.me/service/twitter'
``` 

4. open url http://localhost:4000/twitter/twitters in browser


```
# Runs the app in development mode.
npm start or yarn start

# Builds the app for production to the build folder.
npm run build or yarn build
```
