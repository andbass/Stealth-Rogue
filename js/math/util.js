
var Sr = Sr || {};
var Rot = ROT;

Sr.Math = Sr.Math || {};

Sr.Math.clamp = function(x, min, max) {
    return Math.min(Math.max(x, min), max);
}
