
var Sr = Sr || {};
var Rot = ROT;

Sr.Math = Sr.Math || {};

Sr.Math.Vec2 = function(x, y) {
    y = Sr.defaultVal(y, x);

    this.x = x;
    this.y = y;
}

Sr.Math.Vec2.prototype = {
    add: function(vec) {
        return vec2(this.x + vec.x, this.y + vec.y);
    },

    sub: function(vec) {
        return this.add(vec.neg());
    },

    map: function(fn) {
        return vec2(fn(this.x), fn(this.y));
    },

    neg: function() {
        return this.map(function(val) {
            return -val;
        });
    },

    scale: function(scalar) {
        return this.map(function(val) {
            return val * scalar;
        });
    },

    div: function(scalar) {
        return this.scale(1.0 / scalar);
    },
    
    dot: function(vec) {
        return this.x * vec.x + this.y * vec.y;
    },

    length: function() {
        return Math.sqrt(this.dot(this));
    },

    normalize: function() {
        return this.scale(1.0 / this.length());
    },

    toString: function() {
        return "<" + this.x + ", " + this.y + ">";
    },
}

window.vec2 = function(x, y) {
    return new Sr.Math.Vec2(x, y);
}
