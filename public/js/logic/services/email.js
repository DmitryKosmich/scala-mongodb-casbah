
var EMAIL = (function(){

    'use strict';

    return {
        send: function(message, callback){
            message.user = CONFIG.EMAIL_USER;
            message.password = CONFIG.EMAIL_PASSWORD;
            $.post( "/email/send", {'message' : message})
                .done(function( data ) {
                    callback(null, data);
                }, "json")
                .fail(function( err ) {
                    callback(ERROR.create(ERROR_TYPE.EMAIL));
                }, "json");
        }
    }
})();
