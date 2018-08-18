const  commonHeader = {'Content-Type': 'text/html'};
const landing  = (req, res) => {
    if(req.url === '/') {
        res.writeHead(200, commonHeader);
        res.write('Hello there');
        res.end();
    }
}
const stats = (req, res) => {
    if(req.url === '/stats') {
        res.writeHead(200, commonHeader);
        res.write('This is stats');
        res.end();
    }
}

module.exports.landing = landing;
module.exports.stats = stats;