/**
 * Created by Cubla on 10.08.2017.
 */
/**
 * Created by pham on 8/8/17.
 */
(function (_export) {
    var name = "js/client/field";
    var libs = [
        "js/basic"
    ];

    define(name, libs, function () {
        var basic = require("js/basic");


        var field = basic.inherit({
            constructor: function dispatcher(_options) {
                var options = {

                };
                Object.extend(options, _options);
                basic.prototype.constructor.call(this, options);

                this._connector = null;

                this._subscribers = {};

                this._init();
            },

            _init: function () {
                this.__create_god_mode();
            },

            __create_god_mode: function(){
                var renderer = PIXI.autoDetectRenderer(256, 256);
                document.body.appendChild(renderer.view);

                var stage = new PIXI.Container();
                renderer.render(stage);


                var rectangle = new Graphics();
                rectangle.beginFill(0x66CCFF);
                rectangle.lineStyle(4, 0xFF3300, 1);
                rectangle.drawRect(x, y, width, height);
                rectangle.endFill();

                stage.addChild(rectangle);
            }

        });

        var _data = function _data(_opts){
            var opts = {};
            Object.extend(opts, _opts);

            this.data = opts.data;
            this.callback = opts.callback;
        };

        return field;
    })
})(window);