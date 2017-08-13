/**
 * Created by Cubla on 10.08.2017.
 */
/**
 * Created by pham on 8/8/17.
 */
(function (_export) {
    var name = "js/client/pages/game_field";
    var libs = [
        "js/basic"
    ];

    define(name, libs, function () {
        var basic = require("js/basic");


        var game_field = basic.inherit({
            constructor: function game_field(_options) {
                var options = {
                    field_width: 500,
                    field_height: 500
                };
                Object.extend(options, _options);
                basic.prototype.constructor.call(this, options);
                this._init();
            },

            _init: function () {
                this._create_god_mode();

            },

            _create_god_mode: function(){
                this._renderer = PIXI.autoDetectRenderer(this._opts.field_width, this._opts.field_height);
                this._renderer.view.style.background = "rgba(255,0,0,1)";
                //document.body.appendChild(this._renderer.view);

                this._stage = new PIXI.Container();
                this._stage.intercative = true;

                // работа с pixi.js
                this.create_locs();

                this._renderer.render(this._stage);

                //this.draw_grid();

                //var rectangle = new PIXI.Graphics();
                ////rectangle.beginFill(0x66CCFF);
                //rectangle.lineStyle(1, 0xFF3300, 1);
                //rectangle.drawRect(5, 5, 100, 100);
                ////rectangle.endFill();
                //
                //stage.addChild(rectangle);
                //this._renderer.render(stage);
            },

            draw_grid: function() {
                //var line = new PIXI.Graphics();
                //line.moveTo(0,);

                var x = 10;
                var y = 10;

                var vertLength = this._opts.field_width;
                var horLength = this._opts.field_height;

                var a = 0;
                while (a < y) {
                    var line = new PIXI.Graphics();
                    line.lineStyle(1, 0xFFFFFF, 1);
                    line.moveTo(0, a * (horLength/y));
                    line.lineTo(horLength, a * (horLength/y));
                    this._stage.addChild(line);
                    a++;
                }

                var b = 0;
                while (b < x) {
                    var line = new PIXI.Graphics();
                    line.lineStyle(1, 0xFFFFFF, 1);
                    line.moveTo(b * (vertLength/x), 0);
                    line.lineTo(b * (vertLength/x), vertLength);
                    this._stage.addChild(line);
                    b++;
                }

                this._renderer.render(this._stage);

            },

            create_locs: function() {
                var hor_count = 5;
                var vert_count = 5;

                // 2 - это границы сетки
                var loc_side_hor = (this._opts.field_width / hor_count) - 2;
                var loc_side_vert = (this._opts.field_height / vert_count) - 2;

                var a = 0;
                while (a < vert_count) {
                    var b = 0;
                    while (b < hor_count) {

                        if (b == hor_count - 1 && a == vert_count - 1) {
                            b++;
                            continue;
                        }

                        var rectangle = new PIXI.Graphics();
                        rectangle.buttonMode = true;
                        rectangle.interactive = true;
                        rectangle.beginFill(0x777777);
                        rectangle.lineStyle(1, 0xAAAAAA, 1);
                        rectangle.drawRect((loc_side_hor + 2) * b + 1, (loc_side_vert + 2) * a + 1, loc_side_hor, loc_side_vert);
                        rectangle.endFill();

                        //debugger;
                        rectangle.on("click", function (_a, _b) {
                            console.log(_a, _b);
                        }.bind(this, a, b));

                        rectangle.on("mouseover", function (_rect, _a, _b) {
                            //_rect.clear();
                            _rect.beginFill(0x778877);
                            _rect.drawRect((loc_side_hor + 2) * _b + 1, (loc_side_vert + 2) * _a + 1, loc_side_hor, loc_side_vert);
                            _rect.endFill();
                            this._renderer.render(this._stage);
                        }.bind(this, rectangle, a, b));

                        rectangle.on("mouseout", function (_rect, _a, _b) {
                            //debugger;
                            //_rect.clear();
                            _rect.beginFill(0x777777);
                            _rect.drawRect((loc_side_hor + 2) * _b + 1, (loc_side_vert + 2) * _a + 1, loc_side_hor, loc_side_vert);
                            _rect.endFill();
                            this._renderer.render(this._stage);
                        }.bind(this, rectangle, a, b));

                        this._stage.addChild(rectangle);

                        b++;
                    }
                    a++;
                }

                this._renderer.render(this._stage);

            },

            get_dom_elem: function(){
                return this._renderer.view;
            }

        });

        return game_field;
    })
})(window);