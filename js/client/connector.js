/**
 * Created by pham on 8/8/17.
 */
(function (_export) {
    var name = "js/client/connector";

    var libs = [
        "js/basic"
    ];

    define(name, libs, function () {
        var basic = require("js/basic");

        var connector = basic.inherit({
            constructor: function connector(_options) {
                var options = {
                    protocol: "ws",
                    host: "127.0.0.1",
                    port: "1337"
                };
                Object.extend(options, _options);
                basic.prototype.constructor.call(this, options);
                this._init();
            },

            _init: function () {
                this._protocol = this._opts.protocol;
                this._host = this._opts.host;
                this._port = this._opts.port;
                this.create_socket();
            },

            create_socket: function () {
                this._socket = new WebSocket(this._protocol + "://" + this._host + ":" + this._port);
                this._socket.addEventListener("open", this._on_open.bind(this));
                this._socket.addEventListener("close", this._on_close.bind(this));
                this._socket.addEventListener("message", this._on_message.bind(this));
                this._socket.addEventListener("error", this._on_error.bind(this));
            },

            close: function () {
                this._socket.close();
            },

            socket: function () {
                return this._socket;
            },

            _on_open: function (_data) {
                console.log("Connection [" + this._protocol + "://" + this._host + ":" + this._port + "] opened");
                this.trigger("open", _data.data);
            },

            _on_close: function (_data) {
                if (_data.wasClean) {
                    console.log("Closed clean");
                } else {
                    console.log("Connection closed by server"); // например, "убит" процесс сервера
                }
                console.log("Code: " + _data.code + " reason: " + _data.reason);
                this.trigger("closed", _data);
            },

            _on_message: function (_data) {
                debugger;
                console.log("DATA:\n" + _data.data);
                this.trigger("data", _data.data);
            },

            _on_error: function (_error) {
                console.log("ERR:\n" + _error.message);
                this.trigger("error", _error);
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

        return connector;
    })
})(window);