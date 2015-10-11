
var Sr = Sr || {};
var Rot = ROT;

Sr.Input = Sr.Input || {};

Sr.Input.createKeymap = function() {
    this.keymap = {};

    // Movement
    this.keymap[Rot.VK_NUMPAD8] = Sr.Action.move(vec2(0, -1));
    this.keymap[Rot.VK_NUMPAD2] = Sr.Action.move(vec2(0, 1));
    this.keymap[Rot.VK_NUMPAD4] = Sr.Action.move(vec2(-1, 0));
    this.keymap[Rot.VK_NUMPAD6] = Sr.Action.move(vec2(1, 0));

    this.keymap[Rot.VK_NUMPAD7] = Sr.Action.move(vec2(-1, -1));
    this.keymap[Rot.VK_NUMPAD1] = Sr.Action.move(vec2(-1, 1));
    this.keymap[Rot.VK_NUMPAD9] = Sr.Action.move(vec2(1, -1));
    this.keymap[Rot.VK_NUMPAD3] = Sr.Action.move(vec2(1, 1));
}
