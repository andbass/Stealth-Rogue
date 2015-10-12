
var Sr = Sr || {};
var Rot = ROT;

Sr.World = function(Generator, opts) {
    opts = opts || {};

    this.width = opts.width || 100;
    this.height = opts.height || 100;

    this.mapGenerator = new Generator(this.width, this.height, opts.mapOptions);
    if (opts.mapInit) {
        opts.mapInit(map);
    }

    this.generate();

    this.mobs = [];
}

// Generates the internal world map from a ROT esque map
Sr.World.prototype.generate = function() {
    this.clear();

    this.mapGenerator.create(function(x, y, level) {
        var tile = Sr.tileset.floor;

        if (level) {
            // TODO fix ugly hack to randomize wall colors
            tile = $.extend(true, {}, Sr.tileset.wall);

            var fg = Rot.Color.fromString(tile.glyph.fg);
            fg = Rot.Color.add(fg, [0, 0, Rot.RNG.getUniform() * 200].map(Math.floor));

            tile.glyph.fg = Rot.Color.toHex(fg);
        }

        this.map[y][x] = {
            entities: [],
            tile: tile,
        };
    }.bind(this));
}

Sr.World.prototype.clear = function(tile) {
    tile = tile || Sr.tileset.floor;

    this.map = [];

    for (var y = 0; y < this.height; y++) {
        var row = [];

        for (var x = 0; x < this.width; x++) {
            row.push(tile);
        }

        this.map.push(row);
    }
}

Sr.World.prototype.at = function(pos) {
    pos = pos.map(Math.floor);

    var row = this.map[pos.y]
    if (row) {
        return row[pos.x];
    }
}

// Returns a slice of the map and flattends out the 2d array
Sr.World.prototype.slice = function(rect) {
    rect = Sr.defaultVal(rect, new Sr.Rect({
        topLeft: vec2(0),
        width: this.width, 
        height: this.height,
    }));

    rect = this.constrain(rect);
    var topLeft = rect.topLeft();

    var flattenedMap = [];
    for (var y = topLeft.y; y < topLeft.y + rect.height; y++) {
        for (var x = topLeft.x; x < topLeft.x + rect.width; x++) {
            var pos = vec2(x, y);

            var grid = Object.create(this.at(vec2(x, y)));
            grid.pos = pos;

            flattenedMap.push(grid);
        }
    }

    return flattenedMap;
}

Sr.World.prototype.constrain = function(rect) {
    var topLeft = this.constrainPoint(rect.topLeft());
    var botRight = this.constrainPoint(rect.botRight());

    return new Sr.Rect({
        topLeft: topLeft,
        width: botRight.x - topLeft.x,
        height: botRight.y - topLeft.y
    });
}

Sr.World.prototype.constrainPoint = function(point) {
    return vec2(
        Sr.Math.clamp(point.x, 0, this.width - 1),
        Sr.Math.clamp(point.y, 0, this.height - 1)
    );
}

Sr.World.prototype.stepEnt = function(ent) {
    for (var i = 0; i < ent.speed; i++) {
        ent.step();

        if (ent.health === 0) {
            this.remove(ent);
            break;
        }
    }
}

Sr.World.prototype.step = function() {
    if (this.player) {
        this.stepEnt(this.player);
    }

    this.mobs.forEach(this.stepEnt.bind(this));
}

Sr.World.prototype.add = function(ent, opts) {
    opts = opts || {};
    Sr.defaults(opts, {
        isPlayer: false,
    });

    ent.world = this;
    ent.pos = this.constrainPoint(ent.pos);

    if (opts.isPlayer) {
        this.remove(this.player);
        this.player = ent;
    } else {
        this.mobs.push(ent);
    }

    var grid = this.at(ent.pos);
    grid.entities.push(ent);
}

Sr.World.prototype.remove = function(ent) {
    if (!ent) {
        return;
    }

    if (ent in this.mobs) {
        Sr.Array.remove(this.mobs, ent);
    } else if (ent === this.player) {
        this.player = null;
    } else {
        return;
    }

    var grid = this.at(ent.pos);
    Sr.Array.remove(grid.entities, ent);
}

Sr.World.prototype.draw = function(cam) {
    var drawRect = new Sr.Rect({
        center: cam.pos,
        width: Sr.Display.width,
        height: Sr.Display.height,
    });

    var topLeft = drawRect.topLeft();
    var botRight = drawRect.botRight();

    for (var y = topLeft.y; y < topLeft.y + drawRect.height; y++) {
        for (var x = topLeft.x; x < topLeft.x + drawRect.width; x++) {
            var pos = vec2(x, y);
            var screenPos = pos.sub(topLeft);

            var grid = this.at(pos);

            if (grid) {
                Sr.Display.draw(screenPos, grid.tile.glyph);

                grid.entities.forEach(function(ent) {
                    Sr.Display.draw(screenPos, ent.glyph);
                });
            }
        }
    }
}

