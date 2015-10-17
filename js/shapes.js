
var Sr = Sr || {};
var Rot = ROT;

Sr.Rect = function(opts) {
    this.width = opts.width;
    this.height = opts.height;

    if (opts.center) {
        this.center = opts.center;
    } else if (opts.topLeft) {
        this.center = opts.topLeft.add(this.dim().scale(1.0 / 2.0));
    }
};

Sr.Rect.prototype = {
    dim: function() {
        return vec2(this.width, this.height);
    },

    get topLeft() {
        return this.center.sub(this.dim().div(2.0));
    },

    get topRight() {
        return this.center.add(vec2(this.width, -this.height).div(2.0));
    },

    get botLeft() {
        return this.center.add(vec2(-this.width, this.height).div(2.0));
    },

    get botRight() {
        return this.center.add(this.dim().div(2.0));
    },
};
