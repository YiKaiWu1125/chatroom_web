//chatAPI.js
const http = require('http');
const url = require('url');
const fs = require('fs');
let chatRecords = [];
// TODO

http.createServer(function (req, res, something) {
    let path = url.parse(req.url, true).pathname;
    
    console.log("Request:" + path);
    if (path == "/") {
        fs.readFile('index.html', function(err, data) {
            res.writeHead(200, { 'Content-Type': 'text/html'});
            res.write(data);
            return res.end();
        });
    } else if (path == "/chat") {
        // TODO
        let adr = url.parse(req.url, true);
        let qdata = adr.query;
        if(qdata.user!=""||qdata.say!=""){
            chatRecords.push( {user: qdata.user ,say: qdata.say ,time: qdata.time} );
            //console.log("time:"+qdata.time);
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(chatRecords));
        return res.end();
    } else if (path == "/chat/clear"){
        chatRecords = [];
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.write(JSON.stringify(chatRecords));
        return res.end();
    } else if (path == "/chat/save"){
        // Advanced questions
    } else if (path == "/chat/reload") {
        // Advanced questions
    } 
    else {
        res.end();
    }
}).listen(3000);