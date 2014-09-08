
var STATISTICS = (function(){
    "use strict";

    return {

        getStatistics: function(callback){

            $.get( "/statistics/get", function(){})
                .done(function(data) {
                    callback(null, data);
                })
                .fail(function(data) {
                    callback(data);
                });
        }
    }

})();