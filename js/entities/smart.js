
var Sr = Sr || {};
var Rot = ROT;

Sr.SmartEnt = function(opts) {
    Sr.Entity.call(this, opts);
    Sr.defaults(opts, {

    });
}

Sr.SmartEnt.extend(Sr.Entity);
