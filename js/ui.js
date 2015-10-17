
var Sr = Sr || {};
var Rot = ROT;

Sr.UI = Sr.UI || {};

Sr.UI.init = function(opts) {
    opts = opts || {};
    Sr.defaults(opts, {
        trackedEnt: Sr.Game.player,
    });
    
    this.trackedEnt = opts.trackedEnt;

    this.$hud = $("#hud");
    this.$health = this.$hud.find("#health > p");
}

Sr.UI.refresh = function() {
    this.displayHealth();
    this.displayNearbyEnts();
}

Sr.UI.displayHealth = function() {
    this.$health.text(this.trackedEnt.health);
}

Sr.UI.displayNearbyEnts = function() {
    for (var grid of this.trackedEnt.visibleTiles) {
        for (var ent of grid.entities) {
            if (ent !== this.trackedEnt) {
                // Add ent to view 
            }
        }
    }
}

