
var Sr = Sr || {};
var Rot = ROT;

// An FOVEntity is an entity with visibility
// It uses ROT's FOV to figure out what tiles it can see
Sr.FOVEntity = function(opts) {
	Sr.Entity.call(this, opts);
	Sr.defaults(opts, {
		range: 100,
	})

	this.range = opts.range;
}

Sr.FOVEntity.extend(Sr.Entity);

Sr.FOVEntity.prototype.computeFOV = function() {
	this.visibleTiles = [];

	this.world.fov.compute(this.pos.x, this.pos.y, this.range, function(x, y, r, visibility) {
		this.visibleTiles.push(this.world.at(vec2(x, y)));
	}.bind(this));
}
