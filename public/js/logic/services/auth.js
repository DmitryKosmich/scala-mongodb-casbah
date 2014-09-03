
var AUTH = (function(){

    'use strict';

    var doAuthRedirect = function () {
        var url = 'https://foursquare.com/oauth2/authenticate?' +
            'client_id=' + CONFIG.CLIENT_ID+
            '&response_type=token' +
            '&redirect_uri='+CONFIG.REDIRECT_URL;

        window.location.href = url;
    };

    return {

        setToken: function () {
            if(CONFIG.ACCESS_TOKEN == 'undefined'){
                if ($.bbq.getState('access_token')) {
                    SESSION.set('ACCESS_TOKEN', $.bbq.getState('access_token'));
                    CONFIG.ACCESS_TOKEN=$.bbq.getState('access_token');
                    $.bbq.pushState({}, 2);
                }else{
                    if ($.bbq.getState('error')) {
                        ALERT.show('ERROR: getting access token', ALERT_TYPE.DANGER);
                    }else {
                        /*setTimeout(function(){
                            if(CONFIG.ACCESS_TOKEN == 'undefined'){
                                authPopUpShow();
                            }
                        }, 3000);*/
                        doAuthRedirect();
                    }
                }
            }
        }
    }
})();
