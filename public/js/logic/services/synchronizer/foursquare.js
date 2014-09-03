'use strict';

var FOURSQUARE =  (function() {

    return  {

        getCheckins: function (id, callback) {
            $.get("https://api.foursquare.com/v2/users/" + id + "/checkins?limit=250&oauth_token=" + CONFIG.ACCESS_TOKEN + "&v=" + getNowDate())
                .done(function( data ) {
                    callback(null, data);
                }, "json")
                .fail(function( err ) {
                    callback(ERROR.create(ERROR_TYPE.FOURSQUARE, 'loading of checkins'));
                }, "json");
        },

        getCheckinsWithParams: function (id, limit, offset, callback) {
            $.get("https://api.foursquare.com/v2/users/" + id + "/checkins?limit="+limit+"&offset="+offset+"&oauth_token=" + CONFIG.ACCESS_TOKEN + "&v=" + getNowDate())
                .done(function( data ) {
                    callback(null, data);
                }, "json")
                .fail(function( err ) {
                    callback(ERROR.create(ERROR_TYPE.FOURSQUARE, 'loading of checkins'));
                }, "json");
        },

        getFriends: function (id, callback) {
            $.get("https://api.foursquare.com/v2/users/" + id + "/friends?oauth_token=" + CONFIG.ACCESS_TOKEN + "&v=" + getNowDate())
                .done(function( data ) {
                    callback(null, data.response.friends.items);
                }, "json")
                .fail(function( err ) {
                    callback(ERROR.create(ERROR_TYPE.FOURSQUARE, 'loading of friends'));
                }, "json");
        },

        getUser: function (id, callback) {
            $.get("https://api.foursquare.com/v2/users/" + id + "?oauth_token=" + CONFIG.ACCESS_TOKEN + "&v=" + getNowDate())
                .done(function( data ) {
                    callback(null, data.response.user);
                }, "json")
                .fail(function( err ) {
                    callback(ERROR.create(ERROR_TYPE.FOURSQUARE, 'loading of user information'));
                }, "json");
        },

        setCheckinCount: function (id, callback){
            FOURSQUARE.getCheckins(id, function(err, data){
                if(err){
                    ALERT.show(err, ALERT_TYPE.DANGER);
                    callback(err);
                }else{
                    callback(null, data.response.checkins.count);
                }
            });
        },

        getAllCheckins : function(id, callback){
            var CHECKIN_LIMIT = 250;
            var CHECKIN_OFFSET = 250;
            SESSION.set('CHECKINS', '');
            this.setCheckinCount(id, function(count){
                for(var i = 0; i <= count/CHECKIN_OFFSET; i++){
                    FOURSQUARE.getCheckinsWithParams(id, CHECKIN_LIMIT, CHECKIN_OFFSET*i, function(err, data){
                        if(err){
                            ALERT.show(err, ALERT_TYPE.DANGER);
                            callback(err);
                        }else{
                            if('' === SESSION.get('CHECKINS')) {
                                SESSION.set("CHECKINS", JSON.stringify(data.response.checkins.items));
                            }else{
                                var temp = SESSION.get('CHECKINS');
                                var checkins = JSON.parse(temp);
                                checkins.concat(data.response.checkins.items);
                                SESSION.set("CHECKINS", JSON.stringify(checkins));
                            }
                            var result = JSON.parse(SESSION.get('CHECKINS'));
                            SESSION.remove('CHECKINS');
                            callback(null, result);
                        }
                    });
                }
            });
        },

        getVisitedCountries: function (id, callback){
            FOURSQUARE.getAllCheckins('self', function(err, data){
                if(err){
                    ALERT.show(JSON.parse(err), ALERT_TYPE.WARNING);
                    callback(err);
                }else{
                    callback(null, convertChekinsToCountryCodes(data));
                }
            });
        },

        getCitiesByCC: function(countryCode, callback){
            FOURSQUARE.getAllCheckins('self', function(err, data){
                if(err){
                    ALERT.show(err, ALERT_TYPE.DANGER);
                    callback(err);
                }else{
                    var cities = {};
                    for(var i = 0; i<data.length; i++){
                        if(countryCode==data[i].venue.location.cc.toLowerCase()){
                            cities[data[i].venue.location.city]++;
                        }
                    }
                    var returnCities=[];
                    for(var city in cities){
                        returnCities.push(city);
                    }
                    callback(null, returnCities);
                }
            });
        }
    }
})();