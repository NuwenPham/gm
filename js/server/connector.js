/**
 * Created by pham on 8/8/17.
 */
var WebSocketServer = require('websocket').server;
var http = require('http');
var basic = require('./basic');

var connector = basic.inherit({
    constructor: function connector(_options) {
        var options = {
            port: 1400
        };
        Object.extend(options, _options);
        basic.prototype.constructor.call(this, options);
        this._init();
    },

    _init: function () {
        this._port = this._opts.port;
        this.create_socket();
    },

    create_socket: function () {
        this._server = http.createServer(function(request, response) {
            // хз че тут
        });

        this._server.listen(1400, function() { });

        this._wsServer = new WebSocketServer({
            httpServer: this._server
        });

        this._wsServer.on('request', this._on_request.bind(this));
    },

    _on_close: function(_connection){
        // член
        console.log("close CHLEN:\n");
        this.trigger("closed", {reason: "clen"});
    },

    _on_message: function(_message){
        console.log("членоэврика");
        if (_message.type === 'utf8') {
            console.log("CHLEN:\n" + _message.utf8Data.toString());
            this.trigger("data", _message.utf8Data);
        }
    },

    _on_request: function(_request){
        var connection = _request.accept(null, _request.origin);

        // здесь точно чего-нибудь недостает :DD
        connection.on('message', this._on_message.bind(this));
        connection.on('close', this._on_close.bind(this));
    },

    send: function(_id, _data){
        var result_obj = {
            id: _id,
            data: _data
        };
        var result_string = JSON.stringify(result_obj);
        this._socket.send(result_string);
    }
});

module.exports = connector;