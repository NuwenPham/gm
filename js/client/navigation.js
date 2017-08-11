/**
 * Created by Cubla on 10.08.2017.
 */
/**
 * Created by pham on 8/8/17.
 */
(function (_export) {
    var name = "js/client/navigation";
    var libs = [
        "js/basic",

        "js/client/pages/main_menu",
        "js/client/pages/game_field"
    ];




    define(name, libs, function () {
        var basic = require("js/basic");

        var pages_map = {
            main_menu: require("js/client/pages/main_menu"),
            game_field: require("js/client/pages/game_field")
        };

        var navigation = basic.inherit({
            constructor: function navigation(_options) {
                var options = {

                };
                Object.extend(options, _options);
                basic.prototype.constructor.call(this, options);
                this._init();
            },

            _init: function () {
                document.body.style.width = "100%";
                document.body.style.height = "100%";
                document.body.style.margin = "0";

                this._history = [];
            },

            open: function(_id){
                var _page = new pages_map[_id]();
                var elem = _page.get_dom_elem();

                //debugger;
                document.body.appendChild(elem);
                window.location = "#" + _id;

                this._history.push(_id);

                if(this._last_child !== undefined){
                    document.body.removeChild(this._last_child);
                    this._last_child = undefined;
                }

                this._last_child = elem;
            },

            back: function(){
                this._history.pop();
                if(this._history.length != 0) this.open(this._history.pop());
            }
        });

        return navigation;
    })
})(window);