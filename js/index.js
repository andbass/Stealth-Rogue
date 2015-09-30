
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

    new Rot.Map.Arena().create(function(x, y, level) {
        Sr.Display.draw(x, y, level ? Sr.tileset.wall : Sr.tileset.floor);
    });
});
