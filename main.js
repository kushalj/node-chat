"use strict";

let port = 8181;

let http = require('http'),
    fs = require('fs'),
    validator = require('validator'); 
 
let app = http.createServer((request, response) => {
    fs.readFile("client.html", 'utf-8', (error, data) => {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.write(data);
        response.end();
    });
    // console.log("http://localhost:" + port);;
});
 
let io = require('socket.io')(app);
 
io.sockets.on('connection', (socket) => {
    socket.on('message_to_server', (data) => {
        let escaped_message = validator.escape(data["message"]);
        io.sockets.emit("message_to_client",{ message: escaped_message });
    });
});

app.listen(port);
console.log("Listening on http://localhost:" + port);


