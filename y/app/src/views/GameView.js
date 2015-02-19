define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var Modifier      = require('famous/core/Modifier');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface  = require('famous/surfaces/ImageSurface');
    var GameSurface   = require('views/GameSurface');

    function GameView() {
        View.apply(this, arguments);
        this.gSurfaces = {};
        this.gModifiers = {};
        _createGameSurface.call(this);
        _createOtherSurfaces.call(this);
        _gameCrittersRed.call(this);
        _gameCrittersBlue.call(this);    
    }

    GameView.prototype = Object.create(View.prototype);
    GameView.prototype.constructor = GameView;

    GameView.DEFAULT_OPTIONS = {
        origin: [0.5, 0.5]
    };

    function _createGameSurface(){
        this.gameSurface = new Surface({
            size: [600, 600],
            properties: {
                backgroundColor: 'black',
                border: 'solid 1px white',

            }
        });

        this.gameModifier = new StateModifier({
             align: [0.5, 0.5],
             origin: [0.5, 0.5]
        });

        this.add(this.gameModifier).add(this.gameSurface);
    }

    function _createOtherSurfaces(){
        var firstsurface = new ImageSurface({
            size: [600, 600],
            content: 'content/images/pomo2.png'
        });

        var firstModifier = new Modifier({
            align: [0.5, 0.5],
            origin: [0.5, 0.5]
        });

        this.add(firstModifier).add(firstsurface);
        
    }

    function _gameCrittersBlue(){
        var surfaceArray = [[0,0],[300,0],[600,0]];
                       
        surfaceArray.forEach(function(align, i){
            var m = i + 1;
            this.gameCritterm = new Surface({
                size: [100, 100],
                properties: {
                    borderRadius: '100px',
                    border: 'solid 2px blue',
                    zIndex: '10'
                }
            });

            this.modifierm = new Modifier({
                origin: this.options.origin,
                transform: function(){
                    return Transform.translate(align[0], align[1], 0)
                }
            });
             
             
             this.gSurfaces['surface'+m] = this.gameCritterm;

             this.gModifiers['modifier'+m] = this.modifierm;

             //set listeners for each of the surface
            _setListeners.call(this, this.gameCritterm, 'modifier'+m,'blue');

            this.add(this.modifierm).add(this.gameCritterm);
        }.bind(this));

    }

    function _gameCrittersRed(){
        var surfaceArray2 = [[0,600],[300,600],[600,600]];

        this.RedSurface = {};
        this.RedModifier = {};
                        
        surfaceArray2.forEach(function(align, i){
            var m = i + 4;
            this.gameCritterm = new Surface({
                size: [100, 100],
                properties: {
                    borderRadius: '100px',
                    border: 'solid 2px red',
                    zIndex: '10'
                }
            });

            this.modifierm = new Modifier({
                origin: this.options.origin,
                transform: function(){
                    return Transform.translate(align[0], align[1], 0);
                }
            });

            this.gSurfaces['surface'+m] = this.gameCritterm;

            this.gModifiers['modifier'+m] = this.modifierm;

            //the modifier is used to represent the surface:
            //modifier1 will represent surface1.
            _setListeners.call(this, this.gameCritterm, 'modifier'+m,'red');

            this.add(this.modifierm).add(this.gameCritterm);
        }.bind(this));
    }

   //note the variable passed to the SurfaceName is the modifier
    function _setListeners(surface, surfaceName,color){
         
         surface.on('mousedown', function(){
             surface.setProperties({
                border: 'solid 2px '+color,
                boxShadow: '0 0 70px '+color+','+'inset 0 0 50px '+color
             });
              
            //this emits the modifier of the surface been clicked
            //it is represented by the surface name
             this._eventOutput.emit('surfaceClicked', surfaceName);            
         }.bind(this));

         surface.on('mouseup', function(){
             surface.setProperties({
                border: 'solid 2px '+color,
                backgroundColor: null,
                boxShadow: null
             });
         }.bind(this))
         surface.pipe(this._eventOutput);
    }

    GameView.prototype.getSurfaces = function(){
         return this.gSurfaces;
    }

    GameView.prototype.getModifiers = function(){
        return this.gModifiers;
    }
    
    module.exports = GameView;
});
