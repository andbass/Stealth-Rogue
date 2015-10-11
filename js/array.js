// Adds some utility functions for dealing with arrays

var Sr = Sr || {};

Sr.Array = Sr.Array || {};

// Removes an element from an array
Sr.Array.remove = function(arr, value) {
    var index = arr.indexOf(value);
    if (index === -1) {
        return;
    }

    arr.splice(index, 1);
}
