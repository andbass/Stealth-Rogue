
var Sr = Sr || {};
var Rot = ROT;

Sr.Input = Sr.Input || {};

Sr.Input.init = function() {
    this.createKeymap();

    $(window).keydown(this.keydown.bind(this));
}

Sr.Input.keydown = function(event) {
    this.curAction = this.keymap[event.keyCode];

    Sr.Game.update();
}
