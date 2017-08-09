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


        var dispatcher = require("js/client/dispatcher");
        _export.dispatcher = dispatcher;

    });
})(window);
