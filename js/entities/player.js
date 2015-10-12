
var Sr = Sr || {};
var Rot = ROT;

Sr.Player = function(opt) {
    Sr.FOVEntity.call(this, opt);
}

Sr.Player.extend(Sr.FOVEntity);

Sr.Player.prototype.step = function() {
	Sr.FOVEntity.prototype.step.call(this);

    var action = Sr.Input.curAction;
    if (!action) {
        return;
    }

    if (action.name === "move") {
        var newPos = this.pos.add(action.dir);
        this.moveTo(newPos);
    }
}
