
var Sr = Sr || {};
var Rot = ROT;

Sr.Game = Sr.Game || {};

Sr.Game.init = function() {
    // Used for deltatime calculation in refresh method
    this.lastTime = 0;

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
        .flatten()
        .filter(function(grid) {
            return grid.tile.walkable;
        })
        .random()
        .pos;
 
    this.world.add(this.player, { isPlayer: true });
    this.player.observe();

    window.requestAnimationFrame(this.refresh.bind(this));
}

Sr.Game.update = function() {
    this.world.step(); 
}

Sr.Game.refresh = function(curTime) {
    this.deltaTime = curTime - this.lastTime;
    Sr.Display.clear();

    this.world.draw(this.player, {
        useFOV: true,
    });

    this.lastTime = curTime;

    window.requestAnimationFrame(this.refresh.bind(this));
}
