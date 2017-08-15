/**
 * Created by Cubla on 07.08.2017.
 */
(function(_export){
    var name = "js/client/views/loc";

    var libs = [
        "js/basic",
        "js/models/portal"
    ];
    define(name, libs, function(){
        var counter = 0;
        var basic = requirejs("js/basic");
        var portal = requirejs("js/models/portal");
        return basic.inherit({

            constructor: function location(_opt){
                var opts = Object.extend({
                    width: 20,
                    height: 20,
                    row_pos: 0,
                    col_pos: 0,
                    x: 0,
                    y: 0,
                    line_fill: 0xAAAAAA,
                    fill: 0x777777,
                    hover_fill: 0x778877
                }, _opt);

                this._id = counter++;

                basic.prototype.constructor.call(this, opts);
                this._init();
            },

            _init: function () {

            },

            to_draw: function () {
                var x = (this._opts.width) * this._opts.col_pos + 1;
                var y = (this._opts.height) * this._opts.row_pos + 1;
                this._rectangle = new PIXI.Graphics();
                this._rectangle.buttonMode = true;
                this._rectangle.interactive = true;
                this._rectangle.beginFill(this._opts.fill);
                this._rectangle.lineStyle(1, this._opts.line_fill, 1);
                this._rectangle.drawRect(x, y, this._opts.width - 2, this._opts.height - 2);
                this._rectangle.endFill();
            },

            graphics: function () {
                return this._rectangle;
            },

            id: function(){
                return this._id;
            }

        });
    });
})(window);