/**
 * Created by Cubla on 07.08.2017.
 */
(function(_export){
    var libs = [
        "js/baseClass",
        "js/types/point"
    ];
    define(libs, function(){
        var v = Object.create(null);
        window.v = v;

        var point = requirejs("js/types/point");
        v.point = point;
    });
})(window);
