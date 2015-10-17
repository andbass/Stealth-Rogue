
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

    // Movement aliases
    this.keymap[Rot.VK_J] = this.keymap[ROT.VK_NUMPAD2];
    this.keymap[Rot.VK_K] = this.keymap[ROT.VK_NUMPAD8];
    this.keymap[Rot.VK_H] = this.keymap[ROT.VK_NUMPAD4];
    this.keymap[Rot.VK_L] = this.keymap[ROT.VK_NUMPAD6];

    this.keymap[Rot.VK_Y] = this.keymap[ROT.VK_NUMPAD7];
    this.keymap[Rot.VK_U] = this.keymap[ROT.VK_NUMPAD9];
    this.keymap[Rot.VK_B] = this.keymap[ROT.VK_NUMPAD1];
    this.keymap[Rot.VK_N] = this.keymap[ROT.VK_NUMPAD3];

}
