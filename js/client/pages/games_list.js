/**
 * Created by pham on 8/8/17.
 */
(function (_export) {
    var name = "js/client/pages/game_field";
    var libs = [
        "js/basic",
        "js/client/views/field"
    ];

    define(name, libs, function () {
        var basic = require("js/basic");
        var v_field = require("js/client/views/field");


        var games_list = basic.inherit({
            constructor: function games_list(_options) {
                var options = {

                };
                Object.extend(options, _options);
                basic.prototype.constructor.call(this, options);
                this._init();
            },

            _init: function () {
                //this._create_god_mode();

                //TODO сделать список боев, кнопку создать бой, кнопу войти в бой

            },

            get_dom_elem: function(){
                return this._field._renderer.view;
            }

        });

        return games_list;
    })
})(window);