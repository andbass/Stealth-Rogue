
var Sr = Sr || {};
var Rot = ROT;

Sr.Display = Sr.Display || {};

Sr.Display.init = function() {
	this.prepareUI();

    this.display = new Rot.Display({
        forceSquareRatio: true,
        fontSize: 20,
        fontFamily: $(document.body).css("font-family"),
    });

    this.resize();
    $(window).resize(this.resize.bind(this));

    this.$gameWindow.append(this.display.getContainer());
}

Sr.Display.prepareUI = function() {
   	this.$gameWindow = $("#game-window");
}

Sr.Display.resize = function() {
    var maxSizes = this.display.computeSize(
        this.$gameWindow.width() + 1,
        this.$gameWindow.height() + 1
    );

    this.width = maxSizes[0];
    this.height = maxSizes[1];

    this.display.setOptions({ width: this.width, height: this.height });
}

Sr.Display.clear = function() {
    this.display._context.clearRect(0, 0, this.$gameWindow.width(), this.$gameWindow.height());
}

Sr.Display.draw = function(pos, glyph) {
    var bg = glyph.bg;

    // If the background of a glyph is undefined, 
    // we get the background of the specified position and use that
    if (bg === undefined) {
        bg = this.display._data[pos.x + "," + pos.y][4];
    }

	this.display.draw(pos.x, pos.y, glyph.ch, glyph.fg, bg);
}

Sr.Display.glyph = function(ch, fg, bg) {
    return {
        ch: ch,
        fg: fg,
        bg: bg,
    };
}
