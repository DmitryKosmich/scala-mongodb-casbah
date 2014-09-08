
var PAGER = (function(){
    'use strict';

    var TOTAL = 0;

    $(document).ready(function(){
      init();
    });

    function init(){
        var arr = (document.URL).split("\/");
        $("#pagination").html(
            '<div class="text-center" id="pagination" style="padding-bottom: 20px;"> '+
            '<a href="javascript:PAGER.prev()"> &#8592; Prev</a> '+
            '<input type="text" value="'+parseInt(arr[arr.length-2])+'" class="text-center" readonly> '+
            '<a href="javascript:PAGER.next()"> Next &#8594;</a>   '+
            '</div>'
        )
    }

    return  {

        init: function(total){
            TOTAL = total;
        },

        next: function(){
            var arr =  (document.URL).split("\/");
            var currPage = parseInt(arr[arr.length-2]);
            var nextPage = ++currPage;
            arr[arr.length-2] = nextPage;
            window.location.href = arr.join("\/");
        },

        prev: function(){
            var arr =  (document.URL).split("\/");
            var currPage = parseInt(arr[arr.length-2]);
            var prevPage = --currPage;
            arr[arr.length-2] = prevPage < 1 ? 1 : prevPage;
            window.location.href = arr.join("\/");
        }
    }
})();