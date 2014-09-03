
var ALERT_TYPE = {

    SUCCESS: "alert-success",
    INFO: "alert-info",
    WARNING: "alert-warning",
    DANGER: "alert-danger"

};

var ALERT = (function(){

    'use strict';

    var getIcon = function(type){
        if(type == ALERT_TYPE.SUCCESS)  {
            return '<h1 class="glyphicon glyphicon-ok alert_icon"></h1><br>'
        }
        if(type == ALERT_TYPE.INFO)  {
            return '<h1 class="glyphicon glyphicon-bullhorn alert_icon"></h1><br>'
        }
        if(type == ALERT_TYPE.WARNING)  {
            return '<h1 class="glyphicon glyphicon-warning-sign alert_icon"></h1><br>'
        }
        if(type == ALERT_TYPE.DANGER)  {
            return '<h1 class="glyphicon glyphicon-fire alert_icon"></h1><br>'
        }

    };
    var updateListeners = function(){
        $( ".alert" ).click(function() {
            removeAlert(this);
        });
    };

    var removeAlert = function(tag){
        $( tag ).hide("100", function(){
            $( tag ).remove();
        });
    };

    var generateId = function(){
        var date = new Date();
        return 'alert_'+date.getTime()+date.getMilliseconds();
    };

    var hideAlert = function(id){
        setTimeout(function(){
            removeAlert("#"+id);
        }, 5000);
    };

    return {

        show: function(message, type, time){
            time = time ? time : 0;
            setTimeout(function(){
                var id = generateId();
                $('#alerts').append('' +
                    '<li class="alert '+type+'" role="alert" id="'+id+'">' +
                    getIcon(type)+
                    message+
                    '</li>');
                updateListeners();
                hideAlert(id);
            }, time);
            }
    }
})();
