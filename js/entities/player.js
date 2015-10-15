
var Sr = Sr || {};
var Rot = ROT;

Sr.Player = function(opt) {
    Sr.Observer.call(this, opt);
}

Sr.Player.extend(Sr.Observer);

Sr.Player.prototype.step = function() {
    var action = Sr.Input.curAction;
    if (action) {
        if (action.name === "move") {
            var newPos = this.pos.add(action.dir);
            this.moveTo(newPos);
        }
    }

	this.observe();
}
