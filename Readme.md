# spacex api


# Getting started with this APP

## Clone this repo

```zsh 
git clone https://github.com/nizamkolathoden/spacex.git
```
## open the directory assignment
```zsh
cd spacex
```
## wait if you didn't install nodejs and redis in your local mechine first of all install it
### for cache purpose i used redis
[NODEJS](https://nodejs.org/en/)

[Redis](https://redis.io/download/)



## In this directory there is a lot of components/library is missing. first of all, install all this library using this command
```zsh
  npm install
```

## still, there is something is missing dotenv file so create a dotenv file using the following command
```zsh
touch .env
```

## Paste the below code inside the .env file. 
### Here i just give my mongodb atlas api don't missuse it
```zsh
DB=mongodb+srv://nizam:nizam@cluster0.vfd4eqo.mongodb.net/?retryWrites=true&w=majority
PORT=8080
redisHost=127.0.0.1
redisPort=6379
JwtSecret=`\x16aÜZ\x9ET"\x1AnÝ¾\x00\x07ý¸<\x97\tM\x90FÙ\x9F©Uk«'\x91ÅMÕñ@H Âò\t=\x9AÁ³\x06±¼¸Ô\x03\x18¬(ÐÕã·\tòÏö3\\ê\x9B`
JwtRefSecret=x16aÜZ\xhjhyghh9ET"\x1An\ý¸nh<\7\tM\x90FÙ\x9F©Uk«'\x91ÅMÕñ@H Âò\t=\x9AÁ³\x06±¼¸Ô\x03\x18¬(ÐÕã·\tòÏö3\\ê\x9B"

```
### In this app i didn't use jwt refoken,blacklisting token and cors for open ip big security risk don't do in production environment like this
## Now Everything is ok let's run our backend app

```zsh
npm start
```
## voila

## Now we can use the api
### In this case i use Thunder Client vscode extention you can use postman
### First you register using your credentials
eg:
<img width="1440" alt="Screenshot 2022-06-08 at 2 19 16 PM" src="https://user-images.githubusercontent.com/59057736/172574684-3abe146d-28d4-4683-9dff-062a5f91d8b4.png">
### You can also login using your credentials if you already registered
eg:
<img width="1440" alt="Screenshot 2022-06-08 at 2 23 40 PM" src="https://user-images.githubusercontent.com/59057736/172575280-a5a91134-23c9-4c2c-b828-e64571541191.png">
### Just copy the token and paste in the bearer section in show all rockets url
url:
```
localhost:8080/all/rockets
```
<img width="1440" alt="Screenshot 2022-06-08 at 2 29 38 PM" src="https://user-images.githubusercontent.com/59057736/172576706-696f2d2b-40f3-45d1-a06a-3c3bc6dcc50e.png">

### Here we can see, it take 83ms but the next request you can see it's only take 4ms its because the redis 
<img width="1440" alt="Screenshot 2022-06-08 at 2 33 26 PM" src="https://user-images.githubusercontent.com/59057736/172577608-76d9be12-9b02-45fc-99a8-0bb759142cb7.png">

### Now we can see the single rockets/spaceship detials 

### Just copy the token and paste in the bearer section in show single rockets url
eg url:
```
localhost:8080/single/rocket/629ecfc82eb137f004d58e43
```
<img width="1440" alt="Screenshot 2022-06-08 at 2 41 34 PM" src="https://user-images.githubusercontent.com/59057736/172579069-cbc324f8-7b32-4be1-b445-3c6d26c0f461.png">

### If you didn't pass token bearer section it will show 401 Unauthorized
<img width="1440" alt="Screenshot 2022-06-08 at 2 42 49 PM" src="https://user-images.githubusercontent.com/59057736/172579660-2f75cb73-bc34-480f-beb2-10ed88dd2314.png">

### You can use paginataion and filter in all rocket section using query params 
eg:
```
localhost:8080/all/rockets?status=Failed
```
<img width="1440" alt="Screenshot 2022-06-08 at 2 50 17 PM" src="https://user-images.githubusercontent.com/59057736/172581005-09b01eac-d23a-4d9e-a87d-0727527d5e19.png">

eg:
```
localhost:8080/all/rockets?page=1&size=3
```
<img width="1440" alt="Screenshot 2022-06-08 at 2 51 37 PM" src="https://user-images.githubusercontent.com/59057736/172581491-0a4aaf58-517b-4bc8-83a6-2798b0d8ce89.png">
