
var CHART = (function(){
    "use strict";

    return {

        init_bar : function(data){
                var ctx = document.getElementById("bar_canvas").getContext("2d");
                window.myBar = new Chart(ctx).Bar(data, {
                    responsive : true
                });
        },

        init_doughnut : function(data){
            var ctx = document.getElementById("doughnut_canvas").getContext("2d");
            window.myDoughnut = new Chart(ctx).Doughnut(data, {
                responsive : true
            });
        }
    }
})();
