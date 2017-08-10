/**
 * Created by Cubla on 07.08.2017.
 */
(function(_export){
    var libs = [
        "js/baseClass",
        "js/types/point",
        "js/client/dispatcher"
    ];
    define(libs, function(){
        var v = Object.create(null);
        _export.v = v;

        var point = require("js/types/point");
        v.point = point;


        var d = require("js/client/dispatcher");
        var dispatcher = new d();


        var handshake_handler = function (_data) {

            var id = dispatcher.add(function (_event) {
                debugger;
            });

            dispatcher.send(id, {
                server_id: _data.server_id,
                text: "hello world"
            });

            debugger;
        };

        dispatcher.on("new_connection", handshake_handler);
        _export.dispatcher = dispatcher;

    });
})(window);
