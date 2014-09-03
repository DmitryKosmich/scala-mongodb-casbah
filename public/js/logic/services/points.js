
var POINT_COST = {

    FQ_COUNTRY: 100,
    COUNTRY: 10,
    FQ_CITY: 50,
    FRIEND: 20,
    ALBUM: 40
};

var POINTS = (function(){

    'use strict';

    var calculateCountriesPoints = function(checkins){
        var points = 0;
        var FQCountries = [];
        var Countries = [];
        for(var i = 0; i< checkins.length; i++){
            if(checkins[i].isFQ == true){
                FQCountries.push(checkins[i].cc);
            }else{
                Countries.push(checkins[i].cc);
            }
        }
        FQCountries = removeRepetitionArr(FQCountries);
        points += FQCountries.length * POINT_COST.FQ_COUNTRY;
        points += Countries.length * POINT_COST.COUNTRY;
        return points;
    };

    var calculateFriendsPoints = function(points, id, callback){
        STATISTICS.getFriendsCount(id, function(count){
            points += count * POINT_COST.FRIEND;
            calculateAlbumsPoints(points, id, callback);
        });
    };

    var calculateAlbumsPoints = function(points, id, callback){
        STATISTICS.getAlbumsCount(id, function(count){
            points += count * POINT_COST.ALBUM;
            callback(points);
        });
    };

    var getCheckinsOfCountry  = function(country, checkins){
        var actualCheckins = [];
        for(var i = 0; i < checkins.length; i++){
            if(checkins[i].cc == country){
                actualCheckins.push(checkins[i]);
            }
        }
        return actualCheckins;
    };

    var countCountryPoints =  function(checkins){
        var points = 0;
        for(var j = 0; j < checkins.length; j++){
            var existFQCountry = false;
            if(checkins[j].isFQ == true){
                existFQCountry = true;
                points += POINT_COST.FQ_CITY;
            }else{
                points += POINT_COST.COUNTRY;
            }
        }
        return  existFQCountry == true ? points += POINT_COST.FQ_COUNTRY : points;
    };

    return {

        calculate: function(FQUserId, callback){
            var points = 0;
            DB.checkin.getAll(FQUserId, function(err, checkins){
                ERROR.errorWrapper(err, checkins, function(checkins){
                    if(checkins){
                        var cities = getCitiesFromCheckins(checkins);
                        points += cities.length * POINT_COST.FQ_CITY;
                        points += calculateCountriesPoints(checkins);
                        calculateFriendsPoints(points, FQUserId, callback);
                    }else{
                        calculateFriendsPoints(points, FQUserId, callback);
                    }
                });
            });
        },

        getCountryPoints: function(FQUserId, country, callback){
            var points = 0;
            DB.checkin.getAll(FQUserId, function(err, checkins){
                ERROR.errorWrapper(err, checkins, function(checkins){
                    if(checkins){
                        var actualCheckins = getCheckinsOfCountry(country, checkins);
                        points = countCountryPoints(actualCheckins);
                        callback(points);
                    }else{
                        callback(points);
                    }
                });
            });
        }
    }
})();
