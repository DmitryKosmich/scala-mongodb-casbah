
var MAP =  (function() {

    'use strict';

    var setTwoRegionsColor = function (obj1, obj2){
        var colorData = sample_data;
        var conflictCountries = [];

        var flag = {
            isBelongsToFirst: false,
            isBelongsToSecond: false
        };

        for (var cc in colorData){
            if(isExist(cc, obj1.regions)){
                flag.isBelongsToFirst = true;
            }
            if(isExist(cc, obj2.regions)){
                flag.isBelongsToSecond = true;
            }

            if(flag.isBelongsToFirst == true && flag.isBelongsToSecond == false){
                colorData[cc]=obj1.color;
            }else{
                if(flag.isBelongsToFirst == false && flag.isBelongsToSecond == true){
                    colorData[cc]=obj2.color;
                }else{
                    if(flag.isBelongsToFirst == true && flag.isBelongsToSecond == true){
                        conflictCountries.push(cc);
                    }
                }
            }
            flag.isBelongsToFirst = false;
            flag.isBelongsToSecond = false;
        }

        var transaction = function(index, counties, colorData, callback){
            getVinerColor(obj1, obj2, counties[index], function(color){
                colorData[counties[index]] = color;
                if(index >= counties.length-1){
                    callback(colorData);
                }else{
                    transaction(++index, counties, colorData, callback);
                }
            });
        };

        transaction(0, conflictCountries, colorData, function(colorData){
            jQuery('#vmap').vectorMap('set', 'colors', colorData);
        });
    };

    var getVinerColor = function(obj1, obj2, cc, callback){
        STATISTICS.getPointsOfCountry(obj1.FQUserId, cc, function(points1){
            STATISTICS.getPointsOfCountry(obj2.FQUserId, cc, function(points2){
                if(points1 > points2 && Math.abs(points1 - points2) > CONFIG.SUPERIORITY_STEP){
                    callback(obj1.color);
                }else{
                    if(points1 < points2 && Math.abs(points1 - points2) > CONFIG.SUPERIORITY_STEP){
                        callback(obj2.color);
                    }else{
                        callback(CONFIG.JOIN_COUNTRY_COLOR);
                    }
                }
            });
        });
    };

    return  {

        init : function(params) {
            jQuery('#vmap').vectorMap(
                {
                    map: 'world_en',
                    backgroundColor: null,
                    color: '#ffffff',
                    hoverOpacity: 0.7,
                    selectedColor: '#777',
                    enableZoom: true,
                    showTooltip: true,
                    values: sample_data,
                    scaleColors: ['#C8EEFF', '#006491'],
                    normalizeFunction: 'polynomial',
                    borderColor: null,
                    borderOpacity: 1.0,
                    borderWidth: 1,
                    hoverColor: '#fff',
                    selectedRegion: null,
                    onRegionClick: function (element, code, region) {
                        if(params.isRegionClick==true){
                            getCountryDialogInfo({ "code" : code});
                        }
                    }
                });
        },

        setColor: function setColor(color){
            var colorData = sample_data;
            for (var cc in colorData){
                colorData[cc]=color;
            }
            jQuery('#vmap').vectorMap('set', 'colors', colorData);
        },

        setRegionColor: function(regions, newColor){
            var colorData = sample_data;
            for (var cc in colorData){
                if(isExist(cc, regions)){
                    colorData[cc]=newColor;
                }
            }
            jQuery('#vmap').vectorMap('set', 'colors', colorData);
        },

        update: function update(userId, color){
            DB.checkin.getAll(userId, function(err, checkins){
                ERROR.errorWrapper(err, checkins, function(checkins){
                    if(checkins){
                        var regions = getRegions(checkins);
                        MAP.setColor(CONFIG.BG_COLOR);
                        if(color){
                            MAP.setRegionColor(regions, color);
                        }else{
                            MAP.setRegionColor(regions, CONFIG.VISITED_COUNTRY_COLOR);
                        }
                    }
                });
            });
        },

        updateCompetition: function(userId1, color1, userId2, color2){
            DB.checkin.getAll(userId1, function(err, checkins1){
                ERROR.errorWrapper(err, checkins1, function(checkins1){
                    var obj1 = {
                        FQUserId: userId1,
                        color: color1,
                        regions: []
                    };
                    if(checkins1){
                        obj1.regions = getRegions(checkins1);
                    }
                    DB.checkin.getAll(userId2, function(err, checkins2){
                        ERROR.errorWrapper(err, checkins2, function(checkins2){
                            var obj2 = {
                                FQUserId: userId2,
                                color: color2,
                                regions: []
                            };
                            if(checkins2){
                                obj2.regions = getRegions(checkins2);
                            }
                            setTwoRegionsColor(obj1, obj2);
                        });
                    });
                });
            });
        }

    }
})();


