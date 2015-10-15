
var Sr = Sr || {};
var Rot = ROT;

// An Observer is an entity with visibility
// It uses ROT's FOV to figure out what tiles it can see
Sr.Observer = function(opts) {
	Sr.Entity.call(this, opts);
	Sr.defaults(opts, {
		range: 100,
	})

	this.range = opts.range;
    this.visibleTiles = new Set();
}

Sr.Observer.extend(Sr.Entity);

Sr.Observer.prototype.observe = function() {
    this.computeVisibility();
}

Sr.Observer.prototype.computeVisibility = function() {
	this.visibleTiles.clear();

	this.world.fov.compute(this.pos.x, this.pos.y, this.range, function(x, y, r, visibility) {
		this.visibleTiles.add(this.world.at(vec2(x, y)));
	}.bind(this));
}
