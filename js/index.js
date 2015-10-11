
// Stealth Rogue namespace
var Sr = Sr || {};
var Rot = ROT;

$(document).ready(function() {
    if (!Rot.isSupported()) {
        alert("Go home");
    }

    Sr.Display.init();
    Sr.Game.init();
});
