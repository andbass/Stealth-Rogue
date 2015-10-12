
var Sr = Sr || {};
var Rot = ROT;

Sr.Player = function(opt) {
    Sr.Entity.call(this, opt);
}

Sr.Player.extend(Sr.Entity);

Sr.Player.prototype.step = function() {
    var action = Sr.Input.curAction;
    if (!action) {
        return;
    }

    if (action.name === "move") {
        var newPos = this.pos.add(action.dir);
        this.moveTo(newPos);
    }
}
