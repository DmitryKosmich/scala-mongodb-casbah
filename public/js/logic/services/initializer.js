
var INITIALIZER = (function(){

    return {

        wrapper: function(callback){
            setLocalization();
            AUTH.setToken();
            if(SESSION.get('ACCESS_TOKEN')!= null){
                INITIALIZER.userInit(function(){
                    callback();
                });
            }
        },

        userInit: function(callback){
            if(SESSION.get('currentUserId')!= null){
                INITIALIZER.updateAll(callback);
            }else{
                FOURSQUARE.getUser('self', function(err, user){
                    if(err){
                        ALERT.show(err, ALERT_TYPE.DANGER);
                    }else{
                        SESSION.set("currentUserId", user.id);
                        INITIALIZER.synchUpdate(callback);
                    }
                });
            }
        },
        updateAll: function(callback){
            DB.user.search({FQUserId: SESSION.get('currentUserId')}, function(err, users){
                if(err){
                    ALERT.show(err, ALERT_TYPE.DANGER);
                }else{
                    if(users[0]){
                        if(((new Date().getTime() / 1000) - users[0].lastUpdate)>CONFIG.UPDATE_POINTS_INTERVAL){
                            INITIALIZER.synchUpdate(callback);
                        }else{
                            callback();
                            $("#loadingImage").fadeOut("slow");
                        }
                    }else{
                        SYNCHRONIZER.update.user('self', function(err){
                            if(err){
                                ALERT.show(err, ALERT_TYPE.DANGER);
                            }else{
                                INITIALIZER.synchUpdate(callback);
                            }
                        });
                    }
                }
            });
        },

        synchUpdate: function(callback){
            SYNCHRONIZER.update.all(function(err, data){
                if(err){
                    ALERT.show("Update is completed with error!", ALERT_TYPE.DANGER);
                }else{
                    $("#loadingImage").fadeOut("slow");
                    ALERT.show("Update is completed!", ALERT_TYPE.SUCCESS);
                    callback();
                }
            });
        }
    }
})();
