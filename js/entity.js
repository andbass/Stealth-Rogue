
var Sr = Sr || {};
var Rot = ROT;

Sr.Entity = function(opts) {
	opts = opts || {};

    this.pos = opts.pos || vec2(0);
    this.name = opts.name || "[NO NAME]";

    this.health = opts.health || 1.0;
    this.speed = opts.speed || 1;

	this.glyph = opts.glyph || Sr.tileset.default;

    this.inventory = [];
}

// Called when the world steps
Sr.Entity.prototype.step = function() { }

// Called when an entity dies,
// when its health reaches zero and the world removes it
Sr.Entity.prototype.death = function() { }

// TODO do this more efficently
Sr.Entity.prototype.moveTo = function(pos) {
	if (!this.world.at(pos).tile.walkable) {
		return;
	}

	var curGrid = this.world.at(this.pos);
	Sr.Array.remove(curGrid.entities, this);

	this.pos = pos;
	this.world.at(this.pos)
		.entities
		.push(this);
}

Sr.Entity.prototype.die = function() {
    this.health = 0;
}
