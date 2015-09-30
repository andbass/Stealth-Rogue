
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

    new Rot.Map.Cellular(100, 40).randomize(0.5).create(function(x, y, wall) {
        Sr.Display.draw(x, y, wall ? Sr.tileset.wall : Sr.tileset.floor);
    });

    Sr.Display.draw(50, 20, ent.glyph);
});
