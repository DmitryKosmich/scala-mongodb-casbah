(function(){
    'use strict';


    $(document).ready(function () {
        INITIALIZER.wrapper(function(){
            setNavItem('messages');
            showChats(function(){
                $("#loadingImage").fadeOut("slow");
            });
        });
    });

     function showChats(callback){
         DB.chat.getAll(SESSION.get('currentUserId'), function(err, chats){
             ERROR.errorWrapper(err, chats, function(chats){
                 if(chats){
                     showChat(0, chats, callback);
                 }else{
                     ALERT.show("You have not messages!", ALERT_TYPE.INFO);
                     $("#loadingImage").fadeOut("slow");
                 }
             });
         });
     }

    function showChat(index, chats, callback){
        if(chats[index]){
            getFriend(chats[index], function(friend){
                getMessage(chats[index]._id, function(message){
                    if(message){
                        if(friend){
                            $('.list').append(createLiElem(message, friend));
                            checkEnd(index, chats, callback);
                        }else{
                            checkEnd(index, chats, callback);
                        }
                    }else{
                        checkEnd(index, chats, callback);
                    }
                });
            });
        }else{
            checkEnd(index, chats, callback);
        }
    }

    function createLiElem(message, friend){
        return ''+
        '<li class="elem">' +
        '<a href="/chat?id='+friend.FQUserId+'">' +
        '<div class="chat_friend">'+friend.name+' '+friend.surname+'</div><hr>' +
        '<div>'+message.body+'</div>' +
        '<div class="trivial_text">'+TIME.getDdMmYyyyHhMm(message.created, ".")+'</div>' +
        '</a>' +
        '</li>';
    }

    function checkEnd(index, chats, callback){
        if(index >= chats.length-1){
            callback();
        }else{
            showChat(++index, chats, callback);
        }
    }

    function getFriend(chat, callback) {
        DB.user.search({FQUserId: chat.from==SESSION.get('currentUserId')?chat.to:chat.from }, function(err, users){
            ERROR.errorWrapper(err, users, function(users){
                if(users){
                    callback(users[0]);
                }else{
                    callback(null);
                }
            });
        });
    }

    function getMessage(id, callback){
        DB.message.search({chatId: id}, 1, function(err, messages){
            ERROR.errorWrapper(err, messages, function(messages){
                if(messages){
                    callback(messages[0]);
                }else{

                    callback(null);
                }
            });
        });
    }
})();