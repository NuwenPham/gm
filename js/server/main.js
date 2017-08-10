/**
 * Created by pham on 8/8/17.
 */
var _dispatcher = require("./dispatcher.js");


var dispatcher = new _dispatcher();


var client_enter_point = function (_data) {
    dispatcher.send(_data.connection_id, _data.server_id, {
        client_id: _data.data.client_id
    })
};

dispatcher.on("enter_point", client_enter_point);

