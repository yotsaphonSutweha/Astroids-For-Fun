const http = require('http');
const Router = require('./router');

http.createServer((req, res) => {
    Router.landing(req, res);
    Router.stats(req, res);
}).listen(8080, () => {
    console.log('App is running on localhost:8080');
}) 

