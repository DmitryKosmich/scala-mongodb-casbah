var fillCountryDialog = (function(){
    'use strict';

    return function(country){
        $( "#country_name" ).html('').append(country.name);
        $( "#country_capital" ).html('').append(country.capital);
        $( "#country_region" ).html('').append(country.region);
        $( "#country_subregion" ).html('').append(country.subregion);
        $( "#country_population" ).html('').append(setFormat(country.population)=='0'?'':setFormat(country.population));
        $( "#country_area" ).html('').append(setFormat(country.area)=='0'?'':setFormat(country.area));
        $( "#country_gini" ).html('').append(country.gini);
        $( "#country_flag_popup" ).attr( 'src', country.flagSrc);

        DB.checkin.search({cc: country.cc, FQUserId: SESSION.get('currentUserId')}, function(err, checkins){
            if(err) {
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                $( "#addCountry").html('');
                $( "#deleteCountry").html('');

                if(checkins[0] == null){
                    $( "#addCountry" ).html('').append( '<a href="#" title="Add country" class="glyphicon glyphicon-map-marker"  onclick="addCountry(\''+country.cc+ '\')" ></a>' );
                }else{
                    for(var i = 0; i < checkins.length; i++){
                        if(checkins[i].isFQ == false){
                            $( "#deleteCountry" ).html('').append( '<a href="#" title="Delete country" class="glyphicon glyphicon-trash" onclick="deleteCountry(\''+country.cc+'\')" ></a>' );
                            break;
                        }
                    }
                }
            }
        });
    }
})();

var  getCountryDialogInfo = (function(){
    'use strict';

    return function(country){
        DB.country.search({cc: country.code}, function(err, counties){
            if(err) {
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                if(counties[0]){
                    fillCountryDialog(counties[0]);
                    countryPopUpShow();
                }else{
                    SYNCHRONIZER.add.country({cc: country.code}, function(err, country){
                        if(err) {
                            ALERT.show(err, ALERT_TYPE.DANGER);
                        }else{
                            fillCountryDialog(country);
                            countryPopUpShow();
                        }
                    });
                }
            }
        });
    }
})();

var addCountry = (function(){
    'use strict';

    return function(cc){
        DB.checkin.search({cc: cc, isFQ: false, FQUserId: SESSION.get('currentUserId')}, function(err, checkins){
            if(err) {
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                if(checkins[0] == null){
                    DB.country.search({cc: cc},function(err, countries){
                        if(err) {
                            ALERT.show(err, ALERT_TYPE.DANGER);
                        }else{
                            if(countries[0]){
                                SYNCHRONIZER.add.checkin({cc: cc, isFQ: false}, function(err){
                                    if(err) {
                                        ALERT.show(err, ALERT_TYPE.DANGER);
                                    }else{
                                        MAP.update();
                                        ALERT.show("+ 10 points", ALERT_TYPE.SUCCESS);
                                    }
                                })
                            }else{
                                SYNCHRONIZER.add.country({cc: cc}, function(err){
                                    if(err) {
                                        ALERT.show(err, ALERT_TYPE.DANGER);
                                    }else{
                                        SYNCHRONIZER.add.checkin({cc: cc, isFQ: false}, function(err){
                                            if(err) {
                                                ALERT.show(err, ALERT_TYPE.DANGER);
                                            }else{
                                                MAP.update();
                                                ALERT.show("+ 10 points", ALERT_TYPE.SUCCESS);
                                            }
                                        });
                                    }
                                });
                            }
                        }
                    });
                }
            }
        });
        countryPopUpHide();
    }
})();

var deleteCountry = (function(){
    'use strict';

    return function(code){
        DB.checkin.search({cc: code, isFQ: false, FQUserId: SESSION.get('currentUserId')}, function(err, checkins){
            if(err) {
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                if(checkins[0]){
                    DB.checkin.delete(checkins[0]._id, function(err){
                        if(err) {
                            ALERT.show(JSON.parse(err), ALERT_TYPE.DANGER);
                        }else{
                            MAP.update();
                            ALERT.show("- 10 points", ALERT_TYPE.INFO);
                        }
                    });
                }
            }
        });
        countryPopUpHide();
    }
})();

function closeCountryDialog(){
    countryPopUpHide();
    //map.update();
}