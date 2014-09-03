
var DB = (function(){

    'use strict';

    var country = (function(){
        return {
            get: function(id, callback){
                $.post( "/country/get", {'id' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "getting country"));
                    }, "json");
            },

            add: function(country, callback){
                $.post( "/country/add", {'country' : country})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "adding country"));
                    }, "json");
            },

            delete: function(id, callback){
                $.post( "/country/delete", {'id' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "deleting country"));
                    }, "json");
            },

            getAll: function(callback){
                $.post( "/country/all", {})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "getting all countries"));
                    }, "json");
            },

            search: function(params, callback){
                $.post( "/country/search", {'params' : params})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "searching country"));
                    }, "json");
            },

            getMany: function(arr, callback){
                $.post( "/country/many", {'ccs' : arr})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "getting many country"));
                    }, "json");
            },

            update: function(id, country, callback){
                $.post( "/country/update", {'id' : id, 'country': country})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "updating country"));
                    }, "json");
            }
        }
    })();

    var chat = (function(){

        return {
            get: function(id, callback){
                $.post( "/chat/get", {'id' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "getting chat"));
                    }, "json");
            },

            add: function(chat, callback){
                $.post( "/chat/add", {'chat' : chat})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "adding chat"));
                    }, "json");
            },

            delete: function(id, callback){
                $.post( "/chat/delete", {'id' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "deleting chat"));
                    }, "json");
            },

            getAll: function(id, callback){
                if(id==null){
                    id = SESSION.get("currentUserId");
                }
                $.post( "/chat/all", {'FQUserId' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "getting all chats"));
                    }, "json");
            },

            search: function(params, callback){
                $.post( "/chat/search", {'params' : params})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "searching chat"));
                    }, "json");
            },

            update: function(id, chat, callback){
                $.post( "/chat/update", {'id' : id, 'chat': chat})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "updating chat"));
                    }, "json");
            }
        }
    })();


    var message = (function(){

        return {
            get: function(id, callback){
                $.post( "/message/get", {'id' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "getting message"));
                    }, "json");
            },

            add: function(message, callback){
                $.post( "/message/add", {'message' : message})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "adding message"));
                    }, "json");
            },

            delete: function(id, callback){
                $.post( "/message/delete", {'id' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "deleting message"));
                    }, "json");
            },

            getAll: function(id, callback){
                if(id==null){
                    id = SESSION.get("currentUserId");
                }
                $.post( "/message/all", {'FQUserId' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "getting all messages"));
                    }, "json");
            },

            getMany: function(messages, callback){
                $.post( "/message/many", {'messages' : messages})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "getting many messages"));
                    }, "json");
            },

            search: function(params, limit, callback){
                $.post( "/message/search", {'params' : params, 'limit': limit})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "searching message"));
                    }, "json");
            },

            update: function(id, message, callback){
                $.post( "/message/update", {'id' : id, 'message': message})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "updating message"));
                    }, "json");
            }
        }
    })();

    var checkin = (function(){
        return {
            get: function(id, callback){
                $.post( "/checkin/get", {'id' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "getting checkin"));
                    }, "json");
            },

            add: function(checkin, callback){
                $.post( "/checkin/add", {'checkin' : checkin})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "adding checkin"));
                    }, "json");
            },

            delete: function(id, callback){
                $.post( "/checkin/delete", {'id' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "deleting checkin"));
                    }, "json");
            },

            getAll: function(id, callback){
                if(id==null){
                    id = SESSION.get("currentUserId");
                }
                $.post( "/checkin/all", {'FQUserId' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "getting all checkins"));
                    }, "json");
            },

            search: function(params, callback){
                $.post( "/checkin/search", {'params' : params})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "searching checkins"));
                    }, "json");
            },

            update: function(id, checkin, callback){
                $.post( "/checkin/update", {'id' : id, 'checkin': checkin})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "updating checkin"));
                    }, "json");
            }
        }
    })();

    var user = (function(){
        return {
            get: function(id, callback){
                $.post( "/user/get", {'id' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "getting user"));
                    }, "json");
            },

            add: function(user, callback){
                $.post( "/user/add", {'user' : user})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "adding user"));
                    }, "json");
            },

            delete: function(id, callback){
                $.post( "/user/delete", {'id' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "deleting user"));
                    }, "json");
            },

            getAll: function(callback){
                $.post( "/user/all", {})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "getting all users"));
                    }, "json");
            },

            search: function(params, callback){
                $.post( "/user/search", {'params' : params})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "searching user"));
                    }, "json");
            },

            update: function(id, user, callback){
                $.post( "/user/update", {'id' : id, 'user': user})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "updating user"));
                    }, "json");
            }
        }
    })();

    var album = (function(){
        return {
            get: function(id, callback){
                $.post( "/album/get", {'id' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "getting album"));
                    }, "json");
            },

            add: function(album, callback){
                $.post( "/album/add", {'album' : album})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "adding album"));
                    }, "json");
            },

            delete: function(id, callback){
                $.post( "/album/delete", {'id' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "deleting album"));
                    }, "json");
            },

            getAll: function(id, callback){
                if(id==null){
                    id = SESSION.get("currentUserId");
                }
                $.post( "/album/all", {'FQUserId' : id})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "getting  all albums"));
                    }, "json");
            },

            search: function(params, callback){
                $.post( "/album/search", {'params' : params})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "searching album"));
                    }, "json");
            },

            update: function(id, album, callback){
                $.post( "/album/update", {'id' : id, 'album': album})
                    .done(function( data ) {
                        callback(null, data);
                    }, "json")
                    .fail(function( err ) {
                        callback(ERROR.create(ERROR_TYPE.DATA_BASE, "updating album"));
                    }, "json");
            }
        }
    })();

    return {
        country: country,
        checkin: checkin,
        user: user,
        album: album,
        chat: chat,
        message: message
    }
})();