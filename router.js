const Astroid = require('./astroid');
const Renderer = require('./renderer');

const  commonHeader = {'Content-Type': 'text/html'};
const landing  = (req, res) => {
    if(req.url === '/') {
        res.writeHead(200, commonHeader);
        Renderer.view('index', {}, res);
        res.end();
    }
}
const stats = (req, res) => {
    if(req.url === '/stats') {
        res.writeHead(200, commonHeader);
        var stats = new Astroid();
        stats.on('end', (data) => {
            let randomNum = Math.floor(Math.random() * (Object.keys(data).length - 0) + 0);
            let values = {
                astroidName: data.near_earth_objects[randomNum].name,
                hazardous: data.near_earth_objects[randomNum].is_potentially_hazardous_asteroid,
                magnitude: data.near_earth_objects[randomNum].absolute_magnitude_h,
                minDiameter: data.near_earth_objects[randomNum].estimated_diameter.kilometers.estimated_diameter_min,
                maxDiameter: data.near_earth_objects[randomNum].estimated_diameter.kilometers.estimated_diameter_max
            };
            Renderer.view('stats', values, res);
            res.end();
        });
        stats.on('err', (err) => {
            res.write(err.message);
            res.end();
        });
    } else {
        res.end();
    }
}
module.exports.landing = landing;
module.exports.stats = stats;