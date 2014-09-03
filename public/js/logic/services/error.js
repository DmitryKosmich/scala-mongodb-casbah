
var ERROR_TYPE = {

    DATA_BASE: "DATA_BASE",
    EMAIL: "EMAIL",
    REST_COUNTRY_SERVICE: "REST_COUNTRY_SERVICE",
    FOURSQUARE: "FOURSQUARE",
    PICASA: "PICASA"
};

var ERROR = (function(){

    'use strict';

    return {

        errorWrapper: function(err, arr, callback){
            if(err){
                ALERT.show(err, ALERT_TYPE.DANGER);
                $("#loadingImage").fadeOut("slow");
            }else{
                if(arr[0]){
                    callback(arr);
                }else{
                    callback(null);
                }
            }
        },

        create: function(type, message){
            var mess = '';
            if(message){
                mess = ': '+message;
            }else{
                mess = '!';
            }
            switch (type){
                case ERROR_TYPE.DATA_BASE:{
                    return "Data base error"+mess;
                }
                case ERROR_TYPE.EMAIL:{
                    return "Email error"+mess;
                }
                case ERROR_TYPE.FOURSQUARE:{
                    return "Foursquare service error"+mess;
                }
                case ERROR_TYPE.REST_COUNTRY_SERVICE:{
                    return "Rest countries service error"+mess;
                }
                case ERROR_TYPE.PICASA:{
                    return "Picasa service error"+mess;
                }
            }
        }
    }
})();
