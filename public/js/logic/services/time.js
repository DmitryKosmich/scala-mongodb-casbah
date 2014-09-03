var TIME = (function(){

    return {
        getDdMmYyyyHhMm: function (milliseconds, selectorYear, selectorTime){
            if(!selectorYear){
                selectorYear = '/';
            }
            if(!selectorTime){
                selectorTime = ':';
            }
            var date = new Date(+milliseconds);
            return date.getDate()+selectorYear+date.getMonth()+selectorYear+date.getFullYear()+" "+date.getHours()+selectorTime+date.getMinutes();
        }
    }
})();