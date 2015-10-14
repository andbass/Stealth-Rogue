
var Sr = Sr || {};
var Rot = ROT;

Sr.Action = Sr.Action || {};

Sr.Action.move = function(dir) {
    return {
        name: "move",
        dir: dir,
    };
}

Sr.Action.attack = function(dir) {
    return {
        name: "attack",
        dir: dir,
    };
}

Sr.Action.wait = function() {
    return {
        name: "wait",
    };
}
