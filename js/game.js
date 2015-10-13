
var Sr = Sr || {};
var Rot = ROT;

Sr.Game = Sr.Game || {};

Sr.Game.init = function() {
    this.world = new Sr.World(Rot.Map.Uniform, {
        mapOptions: {
            roomWidth: [5, 15],
            roomHeight: [5, 15],
            roomDugPercentage: 0.75,
        },
    });

    this.player = new Sr.Player({
        name: "Player",
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

    this.update();

    $(window).resize(this.refresh.bind(this));
}

Sr.Game.update = function() {
    this.world.step(); 
    this.refresh();
}

Sr.Game.refresh = function() {
    Sr.Display.clear();
    this.world.draw(this.player, {
        useFOV: true,
    });
}
