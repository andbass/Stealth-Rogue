// Adds a function that handles default values for parameters

var Sr = Sr || {};
var Rot = ROT;

Sr.defaultVal = function(val, defaultValue) {
    if (val === undefined) {
        return defaultValue;
    }

    return val;
}

Sr.defaults = function(obj, defaults) {
    for (var key in defaults) {
        obj[key] = Sr.defaultVal(obj[key], defaults[key]);
    }
}
