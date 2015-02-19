define(function(require, exports, module) {
      "use strict";
    var View                    = require('famous/core/View');
    var Surface                 = require('famous/core/Surface');
    var Transform               = require('famous/core/Transform');
    var StateModifier           = require('famous/modifiers/StateModifier');
    var GenericSync             = require('famous/inputs/GenericSync');
    var MouseSync               = require('famous/inputs/MouseSync');
    var TouchSync               = require('famous/inputs/TouchSync');
    var GamePositions           = require('views/GamePositions');
    var Modifier                = require('famous/core/Modifier');
    var Transitionable          = require('famous/transitions/Transitionable');
    var SpringTransition        = require('famous/transitions/SpringTransition');
    var TransitionableTransform = require("famous/transitions/TransitionableTransform");

    GenericSync.register({'mouse':MouseSync, 'touch':TouchSync});
    Transitionable.registerMethod('spring', SpringTransition);

    function GameEngine(gameView) {
        View.apply(this, arguments);
        this.gameView = gameView;
        this.gamePos = new GamePositions();
        _setUpModifiers.call(this);
        _listenToClickedSurface.call(this);
        _handleSurfaceTouch.call(this);
        
    }

    GameEngine.prototype = Object.create(View.prototype);
    GameEngine.prototype.constructor = GameEngine;

    GameEngine.DEFAULT_OPTIONS = {
          transition : {
              method      : "spring",
              period      : 200,
              dampingRatio: .2,
              velocity    : 0
          }
    };

    function _setUpModifiers(){
        var i = 0;
        //this will hold the modifiers(name) and their respective position 
        this.gSurfacesPosition = {};
        //this will hold the modifier(name) and the refrence position.
        //This is to remember the position a surface is coming from
        this.gSurfacesRefPosition= {};
        //this will hold the surface modifiers(object)
        this.gModifiers = this.gameView.getModifiers();
        var initialPositions = [[0,0],[300,0],[600,0],
                         [0,600],[300,600],[600,600]];

        this.initialPositionsRef = [[0,0],[300,0],[600,0],
                         [0,600],[300,600],[600,600]];
        
        //this array holds the state of the game.
        //it is used to check if the state of the game as changed
        this.referenceState = [[0,0],[300,0],[600,0],
                         [0,600],[300,600],[600,600]];

        initialPositions.forEach(function(array, index){
            var m = index + 1;
            this.gSurfacesPosition['modifier'+m] = array;
            this.gSurfacesRefPosition['modifier'+m] = array;
        }.bind(this));
        
        this.initialPositionsRef.forEach(function(array, index){
            var m = index + 1;
            this.gSurfacesRefPosition['modifier'+m] = array;
        }.bind(this));

    }

    function _listenToClickedSurface(){
        //this two containers will hold information on the surface that have moved
           this.redModifierContainer = [];
           this.blueModifierContainer = [];
           this.gameView.on('surfaceClicked', function(modifier){
                 if(this.allowedToPlay(modifier)){
                    //this is responsible for storing information about a surfaces initial position
                    this.modIniPos = this.gSurfacesRefPosition[modifier];
                    //this position is responsible for handling the surface movement
                    this.modPos = this.gSurfacesPosition[modifier]; 
                    this.modObject = this.gModifiers[modifier];
                 }
           }.bind(this));
    }

    function _handleSurfaceTouch(){
          var sync = new GenericSync(['mouse','touch']);
         
          this.gameView.pipe(sync);

           sync.on('update', function(data){
                     var posx = data.delta[0];
                     var posy = data.delta[1];
                     this.position = data.position;
                    
                     this.modPos[0] += posx;
                     this.modPos[1] += posy;
                                          
                    this.modObject.transformFrom(Transform.translate(this.modPos[0], this.modPos[1], 0));
           }.bind(this));

           sync.on('end', function(data){
                 this.tranTransform = new TransitionableTransform(Transform.translate(this.modPos[0], this.modPos[1], 0));
                 this.allowedPos = this.checkPosition(this.modPos[0], this.modPos[1], data.position, this.modIniPos);
                 
                 //also set the modifiying position to the allowed position
                 this.modPos[0] = this.allowedPos[0];
                 this.modPos[1] = this.allowedPos[1];
                 this.modObject.transformFrom(this.tranTransform.setTranslate(
                                                                               this.allowedPos,
                                                                               this.options.transition));
                  //set the initial positions to the allowed positions
                  this.modIniPos[0] = this.allowedPos[0];
                  this.modIniPos[1] = this.allowedPos[1];

                  console.log(this.initialPositionsRef);
           }.bind(this))
    }

    GameEngine.prototype.allowedToPlay = function(modifier) {
          //reset the state 
          this.modIniPos = [0, 0];
          this.modPos = [0, 0];
          this.modObject = new Modifier();
          
          if(/(1|2|3)/.test(modifier)){
              //check if the blue surface has moved previously
               if(this.blueModifierContainer.length > 0){
                   //check if the red surface has moved
                    if(this.redModifierContainer.length > 0){
                         this.blueModifierContainer.splice(0);
                         return true;
                    }
                    return false;
                }
                else {
                  //check if the state of the system as changed
                         this.blueModifierContainer.push(modifier);
                         this.redModifierContainer.splice(0)
                         return true;
            
                }
          }

          if(/(4|5|6)/.test(modifier)){
              //check if the red surface has moved previously
               if(this.redModifierContainer.length > 0){
                   //check if the blue surface has moved
                    if(this.blueModifierContainer.length > 0){
                         this.blueModifierContainer.splice(0);
                         return true;
                    }
                    return false;
                }
                else {
                     this.redModifierContainer.push(modifier);
                     this.blueModifierContainer.splice(0);
                     return true;
                }
          }
    }

    GameEngine.prototype.checkPosition = function(px, py, ini, inp){  
        if((inp[0] === 0) && (inp[1] === 0)){
             return this.gamePos.checkPosition1(px, py, ini, this.gSurfacesRefPosition);
        }
        if((inp[0] === 300) && (inp[1] === 0)){
             return this.gamePos.checkPosition2(px, py, ini, this.gSurfacesRefPosition);
        }
        if((inp[0] === 600) && (inp[1] === 0)){
             return this.gamePos.checkPosition3(px, py, ini, this.gSurfacesRefPosition);
        }
        if((inp[0] === 0) && (inp[1] === 300)){
             return this.gamePos.checkPosition4(px, py, ini, this.gSurfacesRefPosition);
        }
        if((inp[0] === 300) && (inp[1] === 300)){
             return this.gamePos.checkPosition5(px, py, ini, this.gSurfacesRefPosition);
        }
        if((inp[0] === 600) && (inp[1] === 300)){
             return this.gamePos.checkPosition6(px, py, ini, this.gSurfacesRefPosition);
        }
        if((inp[0] === 0) && (inp[1] === 600)){
             return this.gamePos.checkPosition7(px, py, ini, this.gSurfacesRefPosition);
        }
        if((inp[0] === 300) && (inp[1] === 600)){
             return this.gamePos.checkPosition8(px, py, ini, this.gSurfacesRefPosition);
        }
        if((inp[0] === 600) && (inp[1] === 600)){
             return this.gamePos.checkPosition9(px, py, ini, this.gSurfacesRefPosition);
        } 
    }
    
    Array.prototype.checkState = function(array){
         for(var i = 0; i < this.length; i++) {
             if(this[i][0] === array[i][0] && this[i][1] === array[i][1]){
                   return true
             }
             else {
                return false;
             }
         }
    }

    module.exports = GameEngine;
});
