
var CONFIG = (function(){

    'use strict';

    return {

        ACCESS_TOKEN: String(sessionStorage.ACCESS_TOKEN),
        CLIENT_ID: 'CN23WK1RKT1VL0VPZM2OTEGVKYMH0PYXJPOW02HOOJ2YYAXV',
        FACEBOOK_APP_ID: '608985209216820',
        REDIRECT_URL: document.URL,

        JOIN_COUNTRY_COLOR : '#cbc077',
        VISITED_COUNTRY_COLOR :  $( ".mainColor" ).css( "color" ),
        VISITED_COUNTRY_COLOR_BD : '#29c5e6',
        FRIEND_COLOR: '#BB4E51',
        BG_COLOR : $( ".backColor" ).css( "color" ),

        UPDATE_POINTS_INTERVAL: 450,
        UPDATE_TIME_INTERVAL: 5,

        EMAIL_USER: "checkiner@gmail.com",
        EMAIL_PASSWORD: "checkiner1234",

        CURR_WEB_ADDRESS: 'discover-conquer.rhcloud.com',
        COUNT_OF_ELEMS_ON_USER_PAGE_PANELS: 5,

        SUPERIORITY_STEP: 10
    }

})();
