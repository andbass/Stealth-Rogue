
var Sr = Sr || {};
var Rot = ROT;

Sr.Action = Sr.Action || {};

Sr.Action.move = function(pos) {
    return {
        name: "move",
        dir: pos,
    };
}

Sr.Action.attack = function(ent) {
    return {
        name: "attack",
        target: ent,
    };
}
