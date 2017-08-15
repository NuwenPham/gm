/**
 * Created by Cubla on 10.08.2017.
 */
/**
 * Created by pham on 8/8/17.
 */
(function (_export) {
    var name = "js/client/views/field";
    var libs = [
        "js/basic",
        "js/client/views/loc"
    ];

    define(name, libs, function () {
        var basic = require("js/basic");
        var v_loc = require("js/client/views/loc");


        var field = basic.inherit({
            constructor: function dispatcher(_options) {
                var options = {
                    field_width: 300,
                    field_height: 300,
                    rows: 5,
                    cols: 5
                };
                Object.extend(options, _options);
                basic.prototype.constructor.call(this, options);

                this._init();
            },

            _init: function () {
                this._start_pixi();
                this.gen_field();
            },

            _start_pixi: function(){
                this._renderer = PIXI.autoDetectRenderer(this._opts.field_width, this._opts.field_height);
                this._renderer.view.style.background = "rgba(255,0,0,1)";
                //document.body.appendChild(this._renderer.view);

                this._stage = new PIXI.Container();
                this._stage.intercative = true;
            },

            gen_field: function () {
                var hor_count = 5;
                var vert_count = 5;

                var row = 0;
                while (row < vert_count) {
                    var col = 0;
                    while (col < hor_count) {

                        if (col == hor_count - 1 && row == vert_count - 1) {
                            col++;
                            continue;
                        }

                        this.add_loc(col, row);
                        col++;
                    }
                    row++;
                }
            },

            add_loc: function(_row, _col){
                var s_hor = this._opts.field_width / this._opts.cols;
                var s_vert = this._opts.field_height / this._opts.rows;
                var loc = new v_loc({
                    width: s_hor,
                    height: s_vert,
                    row_pos: _row,
                    col_pos: _col,
                    line_fill: 0xAAAAAA,
                    fill: 0x777777,
                    hover_fill: 0x778877
                });
                loc.to_draw();
                this._stage.addChild(loc.graphics());
                this._renderer.render(this._stage);
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