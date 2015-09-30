
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
        $(window).width() - Sr.Display.$hud.width(),
        $(window).height()
    );

    Sr.Display.display.setOptions({width: maxSizes[0], height: maxSizes[1]});
}

Sr.Display.draw = function(x, y, glyph) {
    var bg = glyph.bg;

    // If the background of a glyph is undefined, 
    // we get the background of the specified position and use that
    if (bg === undefined) {
        bg = Sr.Display.display._data[x + "," + y][4];
    }

	Sr.Display.display.draw(x, y, glyph.ch, glyph.fg, bg);
}
