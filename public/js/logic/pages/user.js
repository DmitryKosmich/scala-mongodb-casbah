(function(){
    'use strict';

    $(document).ready(function () {
        INITIALIZER.wrapper(function(){
            prepare(function(user){
                $('#albums_head').attr('href', '/albums?id='+user.FQUserId);
                $('#friends_head').attr('href', '/friends?id='+user.FQUserId);
                fillUser(user);
                fillCountries(user);
                fillFriends(user);
                fillAlbums(user);
                $("#loadingImage").fadeOut("slow");
            });
        });
    });

    function prepare(callback){
        var id = '';
        if(getURLParameter('id') == "me" || getURLParameter('id') == SESSION.get("currentUserId")){
            setNavItem('user');
            id = SESSION.get("currentUserId");
            SYNCHRONIZER.update.points(id, function(){
                getUser(id, callback);
            });
        }else{
            id = getURLParameter('id');
            getUser(id, callback);
        }
    }

    function getUser(id, callback){
        DB.user.search({FQUserId: id}, function(err, users){
            if(err){
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                if(users){
                    callback(users[0]);
                }
            }
        });
    }
    //'<a title="Send invite" href="#" class="inviteTurner" onclick="sendInvite('+friend.FQUserId+')">Invite</a>'
    function fillCompare(user){
        var tag = $("#compare");
        if(user.FQUserId == SESSION.get("currentUserId")){
            tag.remove();
            var messageTag = $('#send_message');
            messageTag.html('Me');
            messageTag.attr('data-localize', 'me');
            messageTag.attr('href', '/');
        }else{
            $('#send_message').attr('href', '/chat?id='+user.FQUserId);
            DB.user.search({FQUserId: user.FQUserId}, function(err, users){
                if(users){
                    if(users[0].lastUpdate == '0'){
                        tag.html('').append('Invite');
                        tag.attr('href', 'javascript:sendInvite("'+user.FQUserId+'")');
                    }else{
                        tag.attr('href', '/battle?id='+user.FQUserId);
                    }
                }
            });
        }
    }

    function fillUser(user){
        fillCompare(user);
        setLastVisit(user);

        $("#user_avatar").attr('src', user.avatarSrc);
        $('.user_name').append(user.name+" "+user.surname);
        $("#email").val(user.email);
        $("#home").val(user.homeCity);

        POINTS.calculate(user.FQUserId, function(count){
            $('#user_points').val(count);
        });
        STATISTICS.getCountriesCount(user.FQUserId, function(count){
            $('#countries_count').val(count);
        });
        STATISTICS.getArea(user.FQUserId, function(area){
            $('#area').val(setFormat(area));
        });
        STATISTICS.getPopulation(user.FQUserId, function(population){
            $('#population').val(setFormat(population));
        });
        STATISTICS.getCitiesCount(user.FQUserId, function(count){
            $('#cities_count').val(setFormat(count));
        });
        STATISTICS.getFriendsCount(user.FQUserId, function(count){
            $('#frinds_count').val(setFormat(count));
        });
        STATISTICS.getAlbumsCount(user.FQUserId, function(count){
            $('#albums_count').val(setFormat(count));
        });
    }

    function setLastVisit(user){
        if(((new Date().getTime() / 1000) - user.lastUpdate) < CONFIG.UPDATE_POINTS_INTERVAL){
            $('#last_visit_phrase').html('');
            $('#last_visit').append("Online");
        }else{
            if(user.lastUpdate!="0"){
                $('#last_visit').append(TIME.getDdMmYyyyHhMm(user.lastUpdate*1000, "."));
            }else{
                $('#last_visit_phrase').remove();
            }
        }
    }

    function fillAlbums(user){
        DB.album.getAll(user.FQUserId, function(err, albums){
            if(err){
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                if(albums[0]){
                    var listSize = 5;
                    if(albums.length<5){
                        listSize = albums.length;
                    }
                    for(var i = 0; i < listSize; i++){
                        $("#albums_body").append(
                                '<li><a href="/album?id='+albums[i]._id+'">'+albums[i].name+'</a></li>'
                        );
                    }
                }
            }
        });
    }

    function fillFriends(user){
        var startIndex = 0;
        getFriendNames(startIndex, user.friends, [], function(result){
            var listSize = 5;
            if(result.length<5){
                listSize = result.length;
            }
            for(var i = 0; i < listSize; i++ ){
                $("#friends_body").append('<li><a href="/user?id='+result[i].FQUserId+'">'+result[i].name+' '+result[i].surname+'</a></li>');
            }
        });
    }

    function getFriendNames(index, friends, result, callback){
        DB.user.search({FQUserId: friends[index]}, function(err, users){
            if(err){
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                if(users[0]){
                    result.push(users[0]);
                    if(index >= friends.length-1){
                        callback(result);
                    }else{
                        getFriendNames(++index, friends, result, callback);
                    }
                }else{
                    callback([]);
                }
            }
        });
    }

    function fillCountries(user){
        DB.checkin.getAll(user.FQUserId, function(err, checkins){
            if(err){
                ALERT.show(err, ALERT_TYPE.DANGER);
            }else{
                if(checkins[0]){
                    var counties = [];
                    for(var i = 0; i < checkins.length; i++){
                        counties.push(checkins[i].cc);
                    }
                    counties = removeRepetition(counties);
                    var startIndex = 0;
                    getCountryNames(startIndex,  counties, [], function(countreNames){
                        var listSize = 5;
                        if(countreNames.length<5){
                            listSize = countreNames.length;
                        }
                        for(var i = 0; i< listSize; i++){
                            $("#countries_body").append('<li>'+countreNames[i]+'</li>');
                        }
                    });
                }
            }
        });
    }

    function getCountryNames(index,  countries, result,  callback){
        DB.country.search({cc: countries[index].value}, function(err, DBcountries){
            if(err){
                ALERT.show(err, ALERT_TYPE.DANGER);
                callback([]);
            }else{
                if(DBcountries[0]){
                    result.push(DBcountries[0].name);
                    if(index >= countries.length-1){
                        callback(result);
                    }else{
                        getCountryNames(++index,  countries, result,  callback);
                    }
                }else{
                    callback([]);
                }
            }
        });
    }
})();