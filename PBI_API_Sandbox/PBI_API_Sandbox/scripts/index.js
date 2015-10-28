var request = require('request');

var bodyParser = require('body-parser')


var express = require('express')
    , cors = require('cors')
    , app = express();

app.use(cors());
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

app.post('/', function(req, res, next){
    var connectTo = req.url.replace('/?auth=','');
    var body = req.body;
    var str = Object.keys(body).map(function(key){
        return encodeURIComponent(key) + '=' + encodeURIComponent(body[key]);
    }).join('&');
    request.get(
        { uri: connectTo,
            json: true,
            body: str,
            headers: {
                'Content-Type' : 'application/x-www-form-urlencoded',
            }
        },
        function (error, res, object) {
            console.log(res);
        }
    ).pipe(res);
});

app.listen(3000, function(){
    console.log('CORS-enabled web server listening on port 3000');
});


/*

http.createServer(onRequest).listen(3000);

function onRequest(client_req, client_res) {
    console.log('serve: ' + client_req.url.replace('/?auth=',''));

    client_res.setHeader('Access-Control-Allow-Origin', '*');
    client_res.setHeader('Access-Control-Request-Method', '*');
    client_res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST');
    client_res.setHeader('Access-Control-Allow-Headers', '*');
    if ( client_res.method === 'OPTIONS' ) {
        client_res.writeHead(200);
        client_res.end();
        return;
    }

    var options = {
        hostname: client_req.url.replace('/?auth=',''),
        method: 'POST'
    };

    var proxy = http.request(options, function (res) {
        res.pipe(client_res, {
            end: true
        });
    });

    client_req.pipe(proxy, {
        end: true
    });
}*/