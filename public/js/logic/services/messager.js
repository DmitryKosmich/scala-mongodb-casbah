
var MESSAGER = (function(){
    'use strict';

    function findChat(params, callback){
        DB.chat.search(params, function(err, chats){
            ERROR.errorWrapper(err, chats, function(chats){
                if(chats){
                    callback(chats[0]);
                }else{
                    callback(null);
                }
            });
        });
    }

    function createChat(chat, callback) {
        DB.chat.add(chat, function(err, chat){
            if(err){
                ALERT.show("Adding chat", ALERT_TYPE.DANGER);
            }else{
                callback(chat);
            }
        });
    }

    return {

        createMessage: function(text, chatId){
            return {
                chatId: chatId,
                author: SESSION.get("currentUserId"),
                body: text,
                created: new Date().getTime()
            }
        },

        getChat: function(FQUserId, callback){

            findChat({from:  SESSION.get("currentUserId"), to: FQUserId}, function(chat){
                if(chat){
                    callback(chat);
                }else{
                    findChat({from: FQUserId , to: SESSION.get("currentUserId")},function(chat){
                        if(chat){
                            callback(chat);
                        }else{
                            createChat({from:  SESSION.get("currentUserId"), to: FQUserId}, callback);
                        }
                    });
                }
            });
        },

        send: function(text, chat, callback){
            var message = MESSAGER.createMessage(text, chat._id);
            DB.message.add(message, function(err, message){
                if(err){
                   ALERT.show("Adding message", ALERT_TYPE.DANGER);
                }else{
                    callback(message);
                }
            });
        }
    }
})();