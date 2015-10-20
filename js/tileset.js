
var Sr = Sr || {};
var Rot = ROT;

Sr.tileset = {
    wall: function() {
        return {
            name: "Wall",
            walkable: false,

            glyph: Sr.glyphset.wall(),
        };
    },

    floor: function() {
        return {
            name: "Floor",
            walkable: true,

            glyph: Sr.glyphset.floor(),
        };
    }
}
