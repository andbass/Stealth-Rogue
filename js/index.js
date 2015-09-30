
// Stealth Rogue namespace
var Sr = Sr || {};
var Rot = ROT;

Sr.init = function() {
    Sr.Display.init();
}

Sr.update = function(camera, world) {
    
}

Sr.keydown = function(event) {
     
}

$(document).ready(function() {
    if (!Rot.isSupported()) {
        alert("Go home");
    }

    Sr.init();

    var ent = new Sr.Entity();
    Sr.Display.draw(50, 20, Sr.tileset.wall);
});
