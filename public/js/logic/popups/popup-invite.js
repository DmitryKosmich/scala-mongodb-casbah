var sendInvite = (function(){
    'use strict';

    return function(FQUserId){
        DB.user.search({FQUserId: SESSION.get("currentUserId")},function(err, users){
            if(err) {
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                if(users[0] && users[0].email != 'unknown'){
                    var user = users[0];
                    DB.user.search({FQUserId: FQUserId}, function(err, frineds){
                        if(err) {
                            ALERT.show(err, ALERT_TYPE.DANGER);
                        }else{
                            if(frineds[0]){
                                var message = generateMessage(user, frineds[0]);
                                openInviteDialog(message);
                            }
                        }
                    });
                }
            }
        });
    }
})();

function openInviteDialog(message){
    $('#sendInviteButton').attr('href', 'javascript:send('+JSON.stringify(message)+')');
    $('#inviteMessage').val(message.body);
    countryPopUpShow();
}

var send = (function(){
    'use strict';

    return function(message){
        countryPopUpHide();
        message.body = $('#inviteMessage').val()+" "+CONFIG.CURR_WEB_ADDRESS;
        $("#loadingImage").show();
        ALERT.show("Sending was started!", ALERT_TYPE.INFO);
        EMAIL.send(message, function(err, data){
            if(err){
                ALERT.show("Letter was not sent!", ALERT_TYPE.DANGER);
                $("#loadingImage").fadeOut("slow");
            }else{
                ALERT.show("Letter was sent!", ALERT_TYPE.SUCCESS);
                $("#loadingImage").fadeOut("slow");
            }
        });
    }
})();

function generateMessage(user, friend){
    return {
        from: user.email,
        to: friend.email,
        subject: "Invite",
        body: "Dear, "+friend.name+", your friend "+user.name+" "+user.surname+" invited " +
            "you to join to "+CONFIG.CURR_WEB_ADDRESS+".  With respect Checkiner."
    };
}

function setTurnListener(){
    $('.inviteTurner').click(function(){
        $(this).addClass('trivial_text');
    });
}