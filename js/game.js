
var Sr = Sr || {};
var Rot = ROT;

Sr.Game = Sr.Game || {};

Sr.Game.init = function() {
    this.world = new Sr.World(Rot.Map.Digger);

    this.player = new Sr.Player({
        name: "You",
        glyph: Sr.glyphset.player,
    });

    this.player.pos = this.world
        .slice()
        .filter(function(grid) {
            return grid.tile.walkable;
        })
        .random()
        .pos;
 
    this.world.add(this.player, { isPlayer: true });

    $(window).resize(this.refresh.bind(this));
    this.refresh();

    this.update();
}

Sr.Game.update = function() {
    this.world.step(); 
    this.refresh();
}

Sr.Game.refresh = function() {
    Sr.Display.clear();
    this.world.draw(this.player);
}
