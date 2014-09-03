
function isExist(elem, arr){
    for(var e in arr){
        if(arr[e]==elem){
            return true;
        }
    }
    return false;
}

function getNowDate(){
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();

    if(dd<10) {
        dd='0'+dd
    }

    if(mm<10) {
        mm='0'+mm
    }
    return ''+yyyy+mm+dd;
}

function getURLParameter(name) {
    return decodeURI(
        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [, null])[1]
    );
}

function convertChekinsToCountryCodes(data){
    var ccs = [];
    for(var cc in data){
        ccs.push(data[cc].venue.location.cc.toLowerCase());
    }
    return ccs;
}

function setNavItem(id){
    $( "#"+id ).find( '.active' ).removeClass( 'active' );
    $( "#"+id ).addClass( 'active' );
}

function setFormat(number){
    number = parseInt(number);
    return number.formatMoney(0,'\'','.');
}

Number.prototype.formatMoney = function(decPlaces, thouSeparator, decSeparator) {
    var n = this,
        decPlaces = isNaN(decPlaces = Math.abs(decPlaces)) ? 2 : decPlaces,
        decSeparator = decSeparator == undefined ? "." : decSeparator,
        thouSeparator = thouSeparator == undefined ? "," : thouSeparator,
        sign = n < 0 ? "-" : "",
        i = parseInt(n = Math.abs(+n || 0).toFixed(decPlaces)) + "",
        j = (j = i.length) > 3 ? j % 3 : 0;
    return sign + (j ? i.substr(0, j) + thouSeparator : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thouSeparator) + (decPlaces ? decSeparator + Math.abs(n - i).toFixed(decPlaces).slice(2) : "");
};

function wwnaviGetLang(){
    return (navigator.userLanguage||navigator.browserLanguage||navigator.language||'en').substr(0,2);
}

function setLocalization(){
    $(function(){
        var opts = { language: wwnaviGetLang(), pathPrefix: "/js/localize", skipLanguage: ["en", "en-US"] };
        $("[data-localize]").localize("language", opts);
    })
}

function authPopUpShow(){
    $(".reveal-modal_auth_popup").show();
    $(".reveal-modal-bg_auth_popup").show();
}

function authPopUpHide(){
    $(".reveal-modal[name*='auth_popup']").hide();
    $(".reveal-modal-bg[name*='auth_popup']").hide();
}

function countryPopUpShow(){
    $(".reveal-modal_country_popup").show();
    $(".reveal-modal-bg_country_popup").show();
}

function countryPopUpHide(){
    $(".reveal-modal_country_popup").hide();
    $(".reveal-modal-bg_country_popup").hide();
}

function getLocalTimeBySeconds(seconds){
    var curdate = new Date(null);
    curdate.setTime(seconds*1000);
    return curdate.toLocaleString();
}

function removeRepetition(data){
    var countriesObj = {};
    var countriesArr = [];

    for(var i = 0; i < data.length; i++){
        if(countriesObj[data[i]] == undefined){
            countriesObj[data[i]] = 1;
        }else{
            countriesObj[data[i]]+=1;
        }
    }

    for(var cc in countriesObj){
        countriesArr.push({value: cc, count: countriesObj[cc]});
    }
    return countriesArr;
}

function removeRepetitionArr(data){
    var arrOfObjs = removeRepetition(data);
    var arr = [];
    for(var i = 0; i < arrOfObjs.length; i++){
        arr.push(arrOfObjs[i].value);
    }
    return arr;
}

function getRegions(checkins){

    var regions = [];
    for(var i = 0; i < checkins.length; i++){
        regions.push(checkins[i].cc);
    }
    var tempRegions = removeRepetition(regions);
    var result = [];
    for(var i = 0; i < tempRegions.length; i++){
        result.push(tempRegions[i].value);
    }
    return result;
}

function getCitiesFromCheckins(checkins){
    var cities = [];
    for(var i = 0; i < checkins.length; i++){
        if(checkins[i].city!='unknown'){
            cities.push(checkins[i].city);
        }
    }
    return removeRepetition(cities);
}
function addNewLines(string){
    var result = '';
    if(string){
        var strings = string.split('\n');
        result = strings.join('<br>');
    }
    return result;
}