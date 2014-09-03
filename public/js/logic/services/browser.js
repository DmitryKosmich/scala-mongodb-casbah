
var BROWSER = (function(){

    'use strict';

    var redirectErrorPage = function(){
        window.location.href = '/error/browser';
    };

    return {

        getVersion: function(){
            var ua= navigator.userAgent, tem,
                M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if(/trident/i.test(M[1])){
                tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
                return 'IE '+(tem[1] || '');
            }
            if(M[1]=== 'Chrome'){
                tem= ua.match(/\bOPR\/(\d+)/)
                if(tem!= null) return 'Opera '+tem[1];
            }
            M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
            if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
            return M.join(' ');
        },

        checkCorrectness: function(browserName){
            var browserParts = browserName.split(" ");
            var browser = {};
            browser.name = browserParts[0];
            browser.version = browserParts[1];

            if('MSIE'== browser.name){
                if(browser.version<9){
                    redirectErrorPage();
                }
            }
            //todo: and for others browsers
        }
    }
})();

(function(){
    BROWSER.checkCorrectness(BROWSER.getVersion());
})();