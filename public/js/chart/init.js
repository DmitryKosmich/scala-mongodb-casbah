
(function(){

    "use strict";

    $(document).ready(function(){

        STATISTICS.getStatistics(function(err, statistics){
            if(err){
                throw err;
            }else{
                CHART.init_bar(getDataBar(statistics));
                CHART.init_doughnut(getDataDoughnut(statistics));
            }
        });

        function getDataBar(statistics){

            return {
                labels : ["Users","Countries","Checkins","Albums","Messages","Chats"],
                datasets : [
                    {
                        fillColor : "rgba(220,220,220,0.5)",
                        strokeColor : "rgba(220,220,220,0.8)",
                        highlightFill: "rgba(220,220,220,0.75)",
                        highlightStroke: "rgba(220,220,220,1)",
                        data : [
                            statistics.users.total,
                            statistics.countries.total,
                            statistics.checkins.total,
                            statistics.albums.total,
                            statistics.messages.total,
                            statistics.chats.total
                        ]
                    }
                ]
            };
        }

        function getDataDoughnut(statistics){

            return  [
                {
                    value: statistics.users.total,
                    color:"#F7464A",
                    highlight: "#FF5A5E",
                    label: statistics.users.name
                },
                {
                    value: statistics.countries.total,
                    color: "#46BFBD",
                    highlight: "#5AD3D1",
                    label: statistics.countries.name
                },
                {
                    value: statistics.checkins.total,
                    color: "#FDB45C",
                    highlight: "#FFC870",
                    label: statistics.checkins.name
                },
                {
                    value: statistics.albums.total,
                    color: "#949FB1",
                    highlight: "#A8B3C5",
                    label: statistics.albums.name
                },
                {
                    value: statistics.messages.total,
                    color: "#4D5360",
                    highlight: "#616774",
                    label: statistics.messages.name
                },
                {
                    value: statistics.chats.total,
                    color: "#812724",
                    highlight: "#610704",
                    label: statistics.chats.name
                }

            ];
        }
    })
})();
