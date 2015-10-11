
var Sr = Sr || {};
var Rot = ROT;

Sr.Entity = function(opts) {
	opts = opts || {};

    this.pos = opts.pos || vec2(0);

    this.name = opts.name || "[NO NAME]";
    this.health = opts.health || 1.0;

	this.glyph = opts.glyph || Sr.tileset.default;
}

Sr.Entity.prototype.step = function() { }

Sr.Entity.prototype.moveTo = function(pos) {
    // TODO do this more efficently
    this.world.remove(this);
    this.pos = pos;

    this.world.add(this);
}

Sr.Entity.prototype.die = function() {
    this.health = 0;
}

