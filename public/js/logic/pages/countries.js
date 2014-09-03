(function(){

    'use strict';

    var allCountriesInfo = [];

    var conquerInfo = {
        name: 'My ownership',
        capital: '-',
        flagSrc: 'https://irs0.4sqi.net/img/user/30x30/blank_boy.png',
        population: 0,
        area: 0,
        checkinsCount: 0
    };

    var endIndicator = {
        length: 0,
        currentIndex: 0
    };

    var activeCC = '';

    window.onload = function() {
        INITIALIZER.wrapper(function(){
            setNavItem('countries');
            startShowPage();
        });
    };

    function startShowPage(){
        DB.checkin.getAll(null, function(err, checkins){
            if(err) {
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                var countriesData = [];
                for(var i = 0; i < checkins.length; i++){
                    countriesData.push(checkins[i].cc);
                }
                fillAllCountryInfo(removeRepetition(countriesData));
            }
        });
    }

    function fillAllCountryInfo(countries){
        endIndicator.length = countries.length;
        for(var i = 0; i < countries.length; i++){
            getCountryInfo( countries[i]);
        }
    }

    function getCountryInfo(country){
        DB.country.search({cc: country.value}, function(err, data){
            if(err) {
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                if(data[0]){
                    data[0].checkinsCount = country.count;
                    readData(data[0]);
                }else{
                    SYNCHRONIZER.add.country({cc: country.value}, function(err){
                        if(err){
                            ALERT.show(err, ALERT_TYPE.DANGER);
                        }else{
                            DB.country.search({cc: country.value}, function(err, data){
                                if(err){
                                    ALERT.show(err, ALERT_TYPE.DANGER);
                                }else{
                                    data[0].checkinsCount = country.count;
                                    readData(data[0]);
                                }
                            });
                        }
                    });
                }
            }
        });
    }

    function readData(data){
        allCountriesInfo.push(data);
        addResultInfo(data);
        endIndicator.currentIndex +=1;
        if(endIndicator.length == endIndicator.currentIndex){
            createTable();
        }
    }

    function createTable(){
        DB.user.search({FQUserId: SESSION.get("currentUserId")}, function(err, users){
            if(err) {
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                for(var i = 0; i < allCountriesInfo.length; i++){
                    showCountry(allCountriesInfo[i], '');
                    if(i == allCountriesInfo.length-1){
                        conquerInfo.flagSrc = users[0].avatarSrc;
                        conquerInfo.name = '<a href="/user?id=me">'+users[0].name+' '+users[0].surname+'</a>'
                        showCountry(conquerInfo, 'mainColor');
                        $("#loadingImage").fadeOut("slow");
                    }
                }
                showCities();
            }
        });
    }

    function showCountry(country, colorClass) {
        var cc = colorClass=="mainColor"?'':country.cc;
        var hasAlbum = colorClass=="mainColor"?'':'<a title="See albums" href="/albums?countryCode='+cc+'" class="glyphicon glyphicon-picture" >';
        var showCity = colorClass=="mainColor"?'': 'showCities';

        country.population = setFormat(country.population)=='0'?'':setFormat(country.population);
        country.area = setFormat(country.area)=='0'?'':setFormat(country.area);
        $( ".countries" ).append(
                '<tr class="row '+showCity+'" name="'+cc+'">' +
                '<td><img id="country_flag" src="'+country.flagSrc+'" /></td>' +
                '<td class="'+colorClass+'" >'+country.name+'</td>' +
                '<td class="'+colorClass+'">'+country.capital+'</td>' +
                '<td class="'+colorClass+' text-right">'+country.population+'</td>' +
                '<td class="'+colorClass+' text-right">'+country.area+'</td>' +
                '<td class="'+colorClass+' text-center">'+country.checkinsCount+'</td>' +
                '<td class="'+colorClass+' text-center">'+hasAlbum+'</a></td>' +
                '</tr>' );
    }

    function addResultInfo(country){
        conquerInfo.area+= +country.area;
        conquerInfo.population+= +country.population;
        conquerInfo.checkinsCount+= +country.checkinsCount;
    }

//TODO rewrite function
    function showCities(){
        $( ".row.showCities").click( function() {
            var thisTag = this;
            var cc = $(thisTag).attr('name');

            $( '.showCities' ).removeClass( "active" );
            $(".row.city").hide(100, function(){});

            if(activeCC!=cc){
                DB.checkin.search({cc:cc, FQUserId: SESSION.get("currentUserId")}, function(err, checkins){
                    if(err) {
                        //ALERT.show(err, ALERT_TYPE.DANGER); Error run, when it redirect on album page... why?
                    }else{
                        var cities = getCitiesFromCheckins(checkins);

                        $('.row.city').remove();
                        for(var i=0; i < cities.length; i++){
                            if(checkins[i]){
                                $( thisTag).after(
                                        '<tr class="row city">' +
                                        '<td></td>' +
                                        '<td>'+cities[i].value+'</td>' +
                                        '<td></td>' +
                                        '<td></td>' +
                                        '<td></td>' +
                                        '<td></td>' +
                                        '<td class="mainColor text-center"><a title="See albums" href="/albums?city='+cities[i].value+'" class="glyphicon glyphicon-picture"></a></td>' +
                                        '</tr>');

                                $(".row.city").hide();
                                $( ".row.city").addClass( "accordionBodyRow" );
                                if(i==cities.length-1){
                                    activeCC = cc;
                                    $( thisTag).addClass( "active" );
                                }
                            }
                        }
                        $(".row.city").show(100);
                    }
                });
            }else{
                activeCC = '';
            }
        });
    }

})();

