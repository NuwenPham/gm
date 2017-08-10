/**
 * Created by pham on 8/8/17.
 */
var _dispatcher = require("./dispatcher.js");
var _game = require("./game/game.js");
var _user = require("./game/user.js");


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



var game = {
    create_game: function (_data) {
        var _new_game = new _game();
        var game_id = _new_game.get_id();
        games[game_id] = _new_game;

        dispatcher.send(_data.connection_id, _data.server_id, {
            client_id: _data.client_id,
            command: ["response_create_game"],
            game_id: game_id
        });
    },
    games_list: function (_data) {
        var arr = [];
        for (var key in games) {
            games.hasOwnProperty(key) && arr.push(key);
        }
        dispatcher.send(_data.connection_id, _data.server_id, {
            client_id: _data.client_id,
            command: ["response_game_list"],
            games: arr
        });
    },
    users_list: function (_data) {
        var game = games[_data.event.game_id];
        var game_users = game.users();
        var arr = [];
        for (var key in game_users) {
            game_users.hasOwnProperty(key) && arr.push(key);
        }
        dispatcher.send(_data.connection_id, _data.server_id, {
            client_id: _data.client_id,
            command: ["response_users_list"],
            users: arr
        });
    },
    join_game: function (_data) {
        var game_id = _data.event.game_id;
        var game = games[game_id];
        var is_added = game.add_user(_data.connection_id);

        dispatcher.send(_data.connection_id, _data.server_id, {
            client_id: _data.client_id,
            command: ["response_join_game"],
            is_joined: is_added
        });
    },
    leave_game: function (_data) {
        var game_id = _data.event.game_id;
        var game = games[game_id];
        var is_leaved = game.delete_user(_data.connection_id);

        dispatcher.send(_data.connection_id, _data.server_id, {
            client_id: _data.client_id,
            command: ["response_leave_game"],
            is_leaved: is_leaved
        });
    }
};


// дерево, по адресу которого вызывается метод
var methods_tree = {
    api: {
        game: {
            create_game: game.create_game,
            games_list: game.games_list,
            leave_game: game.leave_game,
            users_list: game.users_list,
            join_game: game.join_game
        }
    }
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

    // echo...
    /* dispatcher.send(connection_id, server_id, {
        client_id: client_id
    })
    */
};


dispatcher.on("enter_point", client_enter_point);
