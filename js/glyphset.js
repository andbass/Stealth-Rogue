
var Sr = Sr || {};
var Rot = ROT;

Sr.glyphset = {
    default: function() {
        return {
            ch: "?",
            fg: "#fff",
            bg: "#f00",
        };
    },

	wall: function() {
        return {
    		ch: "\u3013",   // two bars
            fg: "#ddd",
            bg: "#224",
        };
	},

	floor: function() {
        return {
    		ch: "\u00b7", // dot
    		fg: "#bbb",
    		bg: "#151515",
        };
	},

	player: function() {
        return {
    		ch: "@",
    		fg: "#0ff",
        };
	},

    grunt: function() {
        return {
            ch: "G",
            fg: "#60fa57",
        };
    },
}
