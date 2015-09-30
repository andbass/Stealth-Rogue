
var Sr = Sr || {};
var Rot = ROT;

Sr.Display = {};

Sr.Display.init = function() {
	Sr.Display.prepareUI();

    Sr.Display.display = new Rot.Display({
        forceSquareRatio: true    
    });

    Sr.Display.resize();

    $(window)
        .resize(Sr.Display.resize)
        .keydown(Sr.Display.keydown);

    Sr.Display.$gameWindow.append(Sr.Display.display.getContainer());
}

Sr.Display.prepareUI = function() {
   	Sr.Display.$gameWindow = $("#game-window");
    Sr.Display.$hud = $("#hud");
}

Sr.Display.resize = function() {
    var maxSizes = Sr.Display.display.computeSize(
        Sr.Display.$gameWindow.width(), 
        $(window).height() - Sr.Display.$hud.height()
    );

    Sr.Display.display.setOptions({width: maxSizes[0], height: maxSizes[1]});
}

Sr.Display.draw = function(x, y, glpyh) {
	Sr.Display.display.draw(x, y, glpyh.ch, glpyh.fg, glpyh.bg);
}