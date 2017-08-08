/**
 * Created by pham on 8/8/17.
 */
/**
 * Created by pham on 8/8/17.
 */
(function (_export) {

    var libs = [
        "js/basic",
        "js/client/connector"
    ];

    define([libs], function () {
        var basic = requirejs("js/basic");
        var connector = requirejs("js/client/connector");

        var dispatcher = basic.inherit({
            constructor: function dispatcher(_options) {
                var options = {

                };
                Object.extend(options, _options);
                basic.prototype.constructor.call(this, options);
                this.init();
            },

            init: function () {
                this._connector = null;
                this.start_connector();
            },

            start_connector: function () {
                this._connector = new connector();
                this._connector.on("data", this._on_data.bind(this));
            },

            _on_data: function (_data) {
                debugger;
            }
        });

        return dispatcher;
    })
})(window);