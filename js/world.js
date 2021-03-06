
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

    this.fov = new Rot.FOV.PreciseShadowcasting(this.fovCallback.bind(this));
    this.generate();

    this.mobs = [];
    this.turnCount = 0;
}

// Generates the internal world map from a ROT esque map
Sr.World.prototype.generate = function() {
    this.clear();

    this.mapGenerator.create(function(x, y, level) {
        var tile = Sr.tileset.floor();

        if (level) {
            // TODO add custom color class to make this cleaner
            tile = Sr.tileset.wall();

            var fg = Rot.Color.fromString(tile.glyph.fg);

            var blueness = Rot.RNG.getUniform();
            fg = Rot.Color.add(fg, [blueness * -120, blueness * -60, blueness * 60].map(Math.floor));

            tile.glyph.fg = Rot.Color.toHex(fg);
        }

        this.map[y][x] = {
            entities: [],
            tile: tile,
        };
    }.bind(this));
}

Sr.World.prototype.clear = function(tile) {
    tile = tile || Sr.tileset.floor();

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
Sr.World.prototype.flatten = function(rect) {
    rect = Sr.defaultVal(rect, new Sr.Rect({
        topLeft: vec2(0),
        width: this.width,
        height: this.height,
    }));

    rect = this.constrain(rect);
    var topLeft = rect.topLeft;

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
    var topLeft = this.constrainPoint(rect.topLeft);
    var botRight = this.constrainPoint(rect.botRight);

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
            ent.death();
            this.remove(ent);

            break;
        }
    }
}

Sr.World.prototype.step = function() {
    if (this.player) {
        this.stepEnt(this.player);
    }

    for (var mob of this.mobs) {
        this.stepEnt.bind(this);
    }

    this.turnCount++;
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

Sr.World.prototype.fovCallback = function(x, y) {
    var grid = this.at(vec2(x, y));

    if (grid) {
        return grid.tile.walkable;
    }

    return false;
}

Sr.World.prototype.draw = function(cam, opts) {
    opts = opts || {};
    Sr.defaults(opts, {
        useFOV: true,
    });

    var drawRect = new Sr.Rect({
        center: cam.pos,
        width: Sr.Display.width,
        height: Sr.Display.height,
    });

    var topLeft = drawRect.topLeft;
    var botRight = drawRect.botRight;

    for (var y = topLeft.y; y < topLeft.y + drawRect.height; y++) {
        for (var x = topLeft.x; x < topLeft.x + drawRect.width; x++) {
            var pos = vec2(x, y);
            var screenPos = pos.sub(topLeft);

            var grid = this.at(pos);

            if (grid) {
                if (opts.useFOV && !cam.visibleTiles.has(grid)) {
                    continue;
                }

                Sr.Display.draw(screenPos, grid.tile.glyph);

                for (var ent of grid.entities) {
                    Sr.Display.draw(screenPos, ent.glyph);
                }
            }
        }
    }
}
