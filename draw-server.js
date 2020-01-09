
var express = require('express');
//initialize the express app
var app = express();
var http = require('http').Server(app);
var io = require("socket.io")(http);
//var server = http.createServer(app);

// set value of port to whatever is in the environment variable PORT, or 9010 if there's nothing there.
var port = process.env.PORT || 9010;

// Configure static paths.
app.use(express.static(__dirname + "/static"));

function onConnection(socket) {
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
}

io.on('connection', onConnection);

http.listen(port, function() {
    console.log("Listening on " + port);
});