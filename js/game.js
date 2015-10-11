
var Sr = Sr || {};
var Rot = ROT;

Sr.Game = Sr.Game || {};

Sr.Game.init = function() {
    this.world = new Sr.World(Rot.Map.Digger);

    this.player = new Sr.Entity({
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
}

Sr.Game.refresh = function() {
    this.world.draw(this.player);
}
