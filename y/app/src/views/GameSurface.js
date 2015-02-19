define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function GameSurface() {
        View.apply(this, arguments);
        _createGameCritter.call(this);
    }

    GameSurface.prototype = Object.create(View.prototype);
    GameSurface.prototype.constructor = GameSurface;

    GameSurface.DEFAULT_OPTIONS = {
        size: [100, 100],
        properties: {
            borderRadius: '100px',
            border: 'solid 2px blue'
        }
    };

    function _createGameCritter(){
         this.surface = new Surface({
            size: this.options.size,
            properties: this.options.properties
         });

         this.add(this.surface);
    }
    
    module.exports = GameSurface;
});
