(function(){
    'use strict';

    $(document).ready(function () {
        INITIALIZER.wrapper(function(){
            startShowPage();
        });
    });

    function startShowPage(){
        var params = {};
        params.FQUserId = SESSION.get("currentUserId");


        if(getURLParameter('countryCode')!='null'){
            params.cc = getURLParameter('countryCode');
            DB.country.search({cc: params.cc}, function(err, countries){
                ERROR.errorWrapper(err, countries, function(countries){
                    if(countries){
                        $('#locality_title').append(": "+countries[0].name);
                    }
                });
            });
        }
        if(getURLParameter('city')!='null'){
            params.city = getURLParameter('city');
            $('#locality_title').append(": "+params.city);
        }
        if(getURLParameter('id')!='null'){
            params.FQUserId = getURLParameter('id');
        }

        DB.album.search(params, function(err, albums){
            if(err) {
                ALERT.show(err, ALERT_TYPE.DANGER);
                $("#loadingImage").fadeOut("slow");
            }else{
                showAlbums(albums, params);
                $("#loadingImage").fadeOut("slow");
            }
        });
    }

    function showAlbums(albums, params){

        for(var i = 0; i < albums.length; i++){
            $("#albums").append(
                    '<div class="albumWrapper">' +
                    '<div class="album">'+
                    '<a href="/album?id='+albums[i]._id+'"><img  class="albumImage" src="'+albums[i].previewSrc+'"></a>'+
                    '</div>' +
                    '<div class="albumTitle">'+albums[i].name+'</div>'+
                    '</div>'
            );
        }
        if(params.FQUserId == SESSION.get('currentUserId')){
            if(params.cc || params.city){
                $("#albums").append(
                        '<div class="albumWrapper">' +
                        '<div class="album">'+
                        '<a href="#" onclick="openPopup()"><img  class="albumImage newAlbum" src="/images/add_album.png"></a>'+
                        '</div>' +
                        '</div>'
                );
            }
        }
    }
})();
