/**
 * Created by pham on 8/8/17.
 */
var WebSocketServer = require('websocket').server;
var http = require('http');

var server = http.createServer(function(request, response) {
    // process HTTP request. Since we're writing just WebSockets
    // server we don't have to implement anything.
});
server.listen(1337, function() { });

// create the server
wsServer = new WebSocketServer({
    httpServer: server
});

// WebSocket server
wsServer.on('request', function(request) {
    var connection = request.accept(null, request.origin);

    // This is the most important callback for us, we'll handle
    // all messages from users here.
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            // process WebSocket message


            console.log("CHLEN:\n" + message.utf8Data.toString());
        }
    });

    connection.on('close', function(connection) {
        // close user connection
        console.log("close CHLEN:\n");
    });
});