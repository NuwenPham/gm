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

                };
                Object.extend(options, _options);
                basic.prototype.constructor.call(this, options);
                this._init();
            },

            _init: function () {
                this.create_menu();

                var item = document.createElement("input");
                item.setAttribute("type", "button");
                item.setAttribute("value", "BACK");

                this._menu.appendChild(item);

                item.addEventListener("click", function () {
                    nav.back();
                }.bind(this));

            },

            create_menu_item: function(){

            },

            create_menu: function(){
                this._menu = document.createElement("div");
                this._menu.setAttribute("class", "menu");
                this._menu.style.width = "100%";
                this._menu.style.height = "100%";
                this._menu.style.color = "red";
                this._menu.style.background = "green";
            },

            get_dom_elem: function(){
                return this._menu;
            }

        });

        return game_field;
    })
})(window);