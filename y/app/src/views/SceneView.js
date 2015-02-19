define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var GameView      = require('views/GameView');
    var GameEngine    = require('views/GameEngine');
    var SettingsView  = require('views/SettingsView');
    var Easing        = require('famous/transitions/Easing');

    function SceneView() {
        View.apply(this, arguments);
        this.toggleSet = true;
        _createBackgroundSurface.call(this);
        _createSceneView.call(this);
        _setGameEngine.call(this);
        _createSettingsView.call(this);
        _handleEvents.call(this);
    }

    SceneView.prototype = Object.create(View.prototype);
    SceneView.prototype.constructor = SceneView;

    SceneView.DEFAULT_OPTIONS = {
        transition: {duration: 500, curve: Easing.inOutBack}
    };

    function _createSceneView(){
        this.gameView = new GameView();
        this.gameModifier = new StateModifier({
            align: [0.5, 0.5],
            origin: [0.5, 0.5],
            size: [600, 600],
            transform: Transform.translate(0, 0, -2)
        });

        this.add(this.gameModifier).add(this.gameView);
    }

    function _createSettingsView(){
        this.setView = new SettingsView();
        this.setModifier = new StateModifier({
             origin: [0, 0],
             align:  [0, 0],
             size: [300, undefined],
             transform: Transform.translate(0, 0, 1)
        });

        this.add(this.setModifier).add(this.setView)
    }

    function _createBackgroundSurface(){
        var surface = new Surface({
            size: [undefined, undefined],
            properties: {
                backgroundColor: 'black'
            }
        });
        var surfaceModifier = new StateModifier({
             transform: Transform.translate(0, 0, -4)
        });
        this.add(surfaceModifier).add(surface);
    }
    
    function _setGameEngine(){
        this.gameEngine = new GameEngine(this.gameView);
        this.add(this.gameEngine);
    }

    function _handleEvents(){
        this.setView.on('toggleSurface', function(){
             if(!this.toggleSurface){
                this.setModifier.setTransform(
                   Transform.translate(-250, 0, 1),
                   this.options.transition
                    );
             }
             else {
                 this.setModifier.setTransform( 
                    Transform.translate(0, 0, 1),
                    this.options.transition
                    );
             }
             this.toggleSurface = !this.toggleSurface;
        }.bind(this));
    }

    module.exports = SceneView;
});
