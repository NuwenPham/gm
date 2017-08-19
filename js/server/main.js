/**
 * Created by pham on 8/8/17.
 */
var _dispatcher = require("./dispatcher.js");
var _game = require("./game/game.js");
var _user = require("./game/user.js");


// requests
var game = require("./../requests/game").requests;
// дерево, по адресу которого вызывается метод
var methods_tree = {
    api: {
        game: game
    }
};

var dispatcher = new _dispatcher();
global.dispatcher = dispatcher;

var users = {};
global.users = users;

var games = {};
global.games = games;


var check_user = function (_connection_id) {
    return users[_connection_id] !== undefined;
};

var create_user = function(_connection_id) {
    users[_connection_id] = new _user({
        connection_id: _connection_id
    });
};






global.check_user = check_user;
global.create_user = create_user;


var client_enter_point = function (_data) {
    var connection_id = _data.connection_id;
    var data = _data.data;
    var event = data.data;
    var server_id = data.data.server_id;
    var client_id = data.client_id;

    !check_user(connection_id) && create_user(connection_id);

    var obj = methods_tree;
    while(event.command_addr.length != 0){
        var hop = event.command_addr.shift();
        obj = obj[hop];
    }

    obj({connection_id:connection_id, server_id:server_id, client_id:client_id, event:event});
};


dispatcher.on("enter_point", client_enter_point);
