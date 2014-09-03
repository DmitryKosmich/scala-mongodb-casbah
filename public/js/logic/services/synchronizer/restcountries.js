'use strict';

var RESTCOUNTRIES = (function(){

    return {
        getCountryByCC: function(cc, callback){
            $.get("http://restcountries.eu/rest/v1/alpha/" + cc)
            .done(function( data ) {
                callback(null, data);
            }, "json")
                .fail(function( err ) {
                    callback(ERROR.create(ERROR_TYPE.REST_COUNTRY_SERVICE, 'loading of country information'));
            }, "json");
        }
    }
})();