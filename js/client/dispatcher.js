/**
 * Created by pham on 8/8/17.
 */
(function (_export) {
    var name = "js/client/dispatcher";
    var libs = [
        //"js/basic"
        //"js/client/connector"
    ];
    debugger;

    define(name, [libs], function () {
        var basic = require("js/basic");

        debugger;
        //var connector = requirejs("js/client/connector");


        var counter = 0;

        var dispatcher = basic.inherit({
            constructor: function dispatcher(_options) {
                var options = {

                };
                Object.extend(options, _options);
                basic.prototype.constructor.call(this, options);

                this._connector = null;

                this._subscribers = {};

                this.init();
            },

            init: function () {
                this.start_connector();
            },

            start_connector: function () {
                this._connector = new connector();
                this._connector.on("data", this._on_data.bind(this));
                this._connector.on("closed", this._on_closed.bind(this));
            },

            _on_data: function (_data) {
                debugger;
            },

            _on_closed: function(_data){
                console.log("socket closed")
            },

            add: function (_callback) {
                var data = new data({
                    callback: _callback
                });

                var id = counter++;
                this._subscribers[id] = data;
            },

            send: function(_id, _data){
                this._connector.send(_id, _data);
            }
        });

        var data = function data(_opts){
            var opts = {};
            Object.extend(opts, _opts);

            this.data = data.data;
            this.callback = data.callback;
        };

        //requirejs.module(name);
        return dispatcher;
    })
})(window);