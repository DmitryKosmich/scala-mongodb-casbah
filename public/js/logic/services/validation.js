
var VALIDATION = (function(){

    'use strict';

    return {
        notEmpty: function(string){
            return string?true:false;
        },
        isLength: function(string, length){
            return string.length==length;
        },
        isNumber: function(string){
            return (typeof string == 'number' || string instanceof Number);
        },
        isString: function(string){
            return (typeof string == 'string' || string instanceof String);
        }
    }
})();