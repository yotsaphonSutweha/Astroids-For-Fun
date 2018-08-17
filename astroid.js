const EventEmitter = require('events').EventEmitter;
const https = require('https');
const http = require('http')
const util = require('util')

function Astroid() {
    const url = "https://api.nasa.gov/neo/rest/v1/neo/browse?api_key=tHbHQMTLhc5Tc22ag9nFuZkFcpbTDKaTrwakdgri";
    EventEmitter.call(this);
    let astroidEmitter = this;
    let request = https.get(url, (res) => {
        let body = "";
        if(res.statusCode !== 200) {
            request.abort();
            astroidEmitter.emit(new Error(`There was an error retrieving data ${http.STATUS_CODES[res.statusCode]}`));
        }
        res.on('data', (data) => {
            body += data;
            astroidEmitter.emit('data', data);
        });
        res.on('end', () => {
            try {
                if(res.statusCode === 200) {
                    const astroids = JSON.parse(body);
                    astroidEmitter.emit('end', astroids);
                }
            } catch (err) {
                astroidEmitter.emit('err', error);
            }
        }).on('err', (error) => {
            astroidEmitter.emit('err', err);
        });
    })
}

util.inherits(Astroid, EventEmitter);
module.exports = Astroid;