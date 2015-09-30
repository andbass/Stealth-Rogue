
// Stealth Rogue namespace
var Sr = Sr || {};
var Rot = ROT;

Sr.init = function() {
    Sr.prepareUI();

    Sr.display = new Rot.Display({
        forceSquareRatio: true    
    });

    Sr.resize();

    $(window)
        .resize(Sr.resize)
        .keydown(Sr.keydown);

    Sr.$gameWindow.append(Sr.display.getContainer());
}

Sr.prepareUI = function() {
    Sr.$gameWindow = $("#game-window");
    Sr.$hud = $("#hud");
}

Sr.resize = function() {
    var maxSizes = Sr.display.computeSize(
        Sr.$gameWindow.width(), 
        $(window).height() - Sr.$hud.height() - 50
    );

    Sr.display.setOptions({width: maxSizes[0], height: maxSizes[1]});
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

    new Rot.Map.Arena(100, 100).create(function(x, y, level) {
        Sr.display.draw(x, y, level ? "#" : ".", "#fff", "#000"); 
    });
});
