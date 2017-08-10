/**
 * Created by Cubla on 07.08.2017.
 */
(function(_export){
    var libs = [
        "js/baseClass",
        "js/types/point",
        "js/client/test",
        "js/client/dispatcher"
    ];
    define(libs, function(){
        var v = Object.create(null);
        _export.v = v;

        var point = require("js/types/point");
        var test = require("js/client/test");
        v.point = point;


        var d = require("js/client/dispatcher");
        var dispatcher = new d();


        var handshake_handler = function (_data) {

            _export.server = Object.create(null);
            _export.server.server_id = _data.server_id;

            _export.test = new test();
        };

        dispatcher.on("new_connection", handshake_handler);
        _export.dispatcher = dispatcher;

    });
})(window);
