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
                this.start_connector();
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