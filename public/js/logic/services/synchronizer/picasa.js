'use strict';

var PICASA = (function(){

    var getAlbumIdFromURL = function(url){
        var partsBySlash = url.split("/");
        var lastPart = partsBySlash[partsBySlash.length-1];
        var partsByQuestion = lastPart.split('?');
        return partsByQuestion[0];
    };

    return {
        getAlbumPreviewUrl: function(userId, albumId, callback){
            $.get( "https://picasaweb.google.com/data/feed/api/user/"+userId+"/albumid/"+albumId+"?fields=entry%2Fmedia%3Agroup%2Fmedia%3Acontent%5B%40url%5D&alt=json&imgmax=220")
                .done(function( data ) {
                    if(data.feed.entry){
                        callback(null, data.feed.entry[0].media$group.media$content[0].url);
                    }else{
                        callback(null, null);
                    }
                }, "json")
                .fail(function( err ) {
                    callback(ERROR.create(ERROR_TYPE.PICASA, 'loading of album preview'));
                }, "json");
        },

        getAlbums: function(userId, callback){
            $.get( "https://picasaweb.google.com/data/feed/api/user/"+userId+"?kind=album&access=public&alt=json")
                .done(function( data ) {
                    var albums = [];
                    for(var i = 0; i < data.feed.entry.length; i++){
                        var album = {};
                        album.id = getAlbumIdFromURL(data.feed.entry[i].id.$t);
                        album.name = data.feed.entry[i].title.$t;
                        albums.push(album);
                    }
                    callback(null, albums);
                }, "json")
                .fail(function( err ) {
                    callback(ERROR.create(ERROR_TYPE.PICASA, 'loading of album preview'));
                }, "json");
        }
    }
})();