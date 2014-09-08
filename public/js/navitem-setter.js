(function(){
    "use strict";

    var ITEM_ID_NUM = 3;

    function setNavItem(id){
        $( "#"+id ).find( '.active' ).removeClass( 'active' );
        $( "#"+id ).addClass( 'active' );
    }

    var arr = (document.URL).split("\/");
    switch (arr[ITEM_ID_NUM]){

        case "user": {
          setNavItem("users");
          break;
        }
        case "checkin": {
            setNavItem("checkins");
            break;
        }
        case "country": {
            setNavItem("countries");
            break;
        }
        case "album": {
            setNavItem("albums");
            break;
        }
        case "statistics": {
            setNavItem("statistics");
            break;
        }
    }
})();
