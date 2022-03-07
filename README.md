# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).


## Setup GUIDE ##

cd to the stake directory then :
`npm install` or `yarn install` to install dependencies 
then
`yarn build` or `npm run build` to build the current source of the project 

**note: this step is needed only if you don't have the build folder already or you want to port a new modification to the app**

once done you get a folder call 'build'

**Deploying the reactapp**

# connect to your vps

````
cd /home/www/
mkdir stake
now upload the content of the directory into this folder
````

# installing nginx 

sudo apt install nginx -y

once installed 

go to sites-enable 

````
cd /etc/nginx/sites-enabled
touch stake

````
copy this content to the stake file 

````
server {
        listen 8081; # modify this to the port you want your app to run in
        listen [::]:8081; # this too

        root /home/www/stake/build;
        index index.html index.htm index.nginx-debian.html;

        server_name servername.domain www.servername.domain ipaddress; # you can put all of these or only 1 depends on what you have 

        location / {
                try_files $uri $uri/ =404;
        }
}
````

# restart nginx

systemctl restart nginx

**Note : You can access the website on the http://ip:port**

####

## Contracts Deployment Guide ##

travel to the truffle directory 

# truffle config 

first add your account privatekey ( the one you want to use to deploy the contracts ) into .secret file

after that supply the infura urls on the networks.json file 

contracts live in the contracts folder 

now to deploy the contracts it's simple 

execute this command 


`truffle migrate --network rinkeby ( or --network mainnet )`

wait for it to complete and it should deploy all the contracts 

####