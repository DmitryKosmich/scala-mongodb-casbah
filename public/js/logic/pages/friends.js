(function(){
    'use strict';

    $(document).ready(function () {
        INITIALIZER.wrapper(function(){
            setNavItem('friends');
            startShowPage();
        });
    });

    function startShowPage(){
        var FQUserId = '';
        if(getURLParameter('id')!='null'){
            FQUserId = getURLParameter('id');
        }else{
            FQUserId = SESSION.get("currentUserId");
        }

        DB.user.search({FQUserId: FQUserId}, function(err, users){
            if(err) {
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                if(users[0]){
                    showFriends(users[0].friends, function(){
                        setTurnListener();
                        $("#loadingImage").fadeOut("slow");
                    });
                }
            }
        });
    }

    function showFriends(friends, callback){

        var addFriendTransaction = function(index, friends, callback){
            DB.user.search({FQUserId: friends[index]}, function(err, users){
                if(err) {
                    ALERT.show(err, ALERT_TYPE.DANGER);
                }else{
                    if(users[0]){
                        showFriend(users[0]);
                        if(index >= friends.length-1){
                            callback(null);
                        }else{
                            addFriendTransaction(++index, friends, callback);
                        }
                    }else{
                        console.error('no user');
                        callback(err);
                    }
                }
            });
        };
        var startIndex = 0;
        addFriendTransaction(startIndex, friends, function(){
            callback();
        });
    }

    function showFriend(friend) {
        var compare = '';
        if(friend.lastUpdate == '0'){
            compare = '<a title="Send invite" href="#" class="inviteTurner" onclick="sendInvite('+friend.FQUserId+')">Invite</a>';
        }else{
            compare = '<a title="Compare with me" href="/battle?id='+friend.FQUserId+'" class="glyphicon glyphicon-tasks"></a>';
        }
        $( ".friends" ).append(
                '<tr class="row">' +
                '<td><a href="/user?id='+friend.FQUserId+'"><img id="mini_avatar" src="'+friend.avatarSrc+'"></a></td>' +
                '<td>'+friend.name+'</td>' +
                '<td>'+friend.surname+'</td>' +
                '<td>'+friend.points+'</td>' +
                '<td>'+friend.homeCity+'</td>' +
                '<td class="text-center">'+compare+'</td>' +
                '</tr>'
        );
    }
})();