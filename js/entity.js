
var Sr = Sr || {};
var Rot = ROT;

Sr.Entity = function(opts) {
	opts = opts || {};

	this.glyph = opts.glyph || {
		ch: "▩",
		fg: "#0FF",
		bg: "#000",
	};
}