/**
 * Created by Cubla on 20.08.2017.
 */
(function (_export) {
    var name = "js/client/ui/lay";
    var libs = [
        "js/basic"
    ];

    define(name, libs, function () {
        var basic = require("js/basic");

        var lay = basic.inherit({
            constructor: function lay(_options) {
                var options ={

                };
                Object.extend(options, _options);
                basic.prototype.constructor.call(this, options);
                this._init();
            },

            _init: function () {
                this._wrapper = document.createElement("div");
                this._wrapper.style.width = "100%";
                this._wrapper.style.height = "100%";
                this._wrapper.style.border = "1px solid #666";
                this._wrapper.style.boxSizing = "border-box";
            },

            css: function (_key, _value) {
                if(_value === undefined) {
                    if (_key.toString() == "[object Object]") {
                        for (var k in _key) {
                            if (_key.hasOwnProperty(k)) {
                                this._wrapper.style[k] = _key[k];
                            }
                        }
                    } else {
                        return this._wrapper.style[_key];
                    }
                }

                this._wrapper.style[_key] = _value;
            },
            
            attrs: function (_key, _value) {
                if(_value === undefined){
                    if (_key.toString() == "[object Object]") {
                        for (var k in _key) {
                            if (_key.hasOwnProperty(k)) {
                                this._wrapper.setAttribute(k, _key[k]);
                            }
                        }
                    } else {
                        return this._wrapper.getAttribute(_key);
                    }
                }
                this._wrapper.setAttribute(_key, _value);
            },

            append: function (_lay) {
                this._wrapper.appendChild(_lay.wrapper());
            },

            wrapper: function(){
                return this._wrapper;
            }
        });

        return lay;
    })
})(window);