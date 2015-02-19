define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function GamePositions() {
        View.apply(this, arguments);
    }

    GamePositions.prototype = Object.create(View.prototype);
    GamePositions.prototype.constructor = GamePositions;

    GamePositions.DEFAULT_OPTIONS = {};
    //note this default positions may vary, i just assumed
    //the box was 600 by 600(depending on the size of the device) to use as an identifier for
    //various points on the grid
    //ini means the surface position from the origin
    //inp is an object that holds all the positions of the surfaces
    
     //for surfaces at position [0,0]
     GamePositions.prototype.checkPosition1 = function(px, py, ini, inp){
          //check if close to position [300,0]
          if((Math.pow(px-300,2) + Math.pow(py,2)) <= Math.pow(150,2) && 
              [300, 0].comparePosition(inp)){
                return [300, 0];
           }
         //check if close to position [300,300]
          else if((Math.pow(px-300,2) + Math.pow(py-300,2)) <= Math.pow(150,2) &&
              _comparePosition(inp, [300,300])){
                return [300, 300];
          }
          //check if close to position [0, 300]
          else if((Math.pow(px,2) + Math.pow(py-300,2)) <= Math.pow(150,2) &&
               [0, 300].comparePosition(inp)){
                return [0, 300];
          }
          // return back to the initial position
          else{
               return [Math.abs(px-ini[0]), Math.abs(py-ini[1])];
          }
    }
     
     //for surfaces at position [300,0]
     GamePositions.prototype.checkPosition2 = function(px, py, ini, inp){
        //check if close to position [0,0]
          if((Math.pow(px,2) + Math.pow(py,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [0,0])){
                return [0, 0];
           }
           //check if close to the position [600,0]
          else if((Math.pow(px-600,2) + Math.pow(py,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [600,0])){
                return [600, 0];
          }
          //check if close to the position [300,300]
          else if((Math.pow(px-300,2) + Math.pow(py-300,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [300,300])){
                return [300, 300];
          }
          //return back to the initial position
          else{
               return [Math.abs(px-ini[0]), Math.abs(py-ini[1])];
          }
    }
   
    //for surfaces at position [600, 0]
    GamePositions.prototype.checkPosition3 = function(px, py, ini, inp){
        //check if close to postion [300,0]
          if((Math.pow(px-300,2) + Math.pow(py,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [300,0])){
                return [300, 0];
           }
           //check if close to position [300,300]
          else if((Math.pow(px-300,2) + Math.pow(py-300,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [300,300])){
                return [300, 300];
          }
          //check if close to postion [600,300]
          else if((Math.pow(px-600,2) + Math.pow(py-300,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [600,300])){
                return [600, 300];
          }
          //return back to initial position
          else{
               return [Math.abs(px-ini[0]), Math.abs(py-ini[1])];
          }
    }

    //for surfaces at position [0, 300]
    GamePositions.prototype.checkPosition4 = function(px, py, ini, inp){
        //check if close to postion [0,0]
          if((Math.pow(px,2) + Math.pow(py,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [0,0])){
                return [0, 0];
           }
           //check if close to position [300,300]
          else if((Math.pow(px-300,2) + Math.pow(py-300,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [300,300])){
                return [300, 300];
          }
          //check if close to postion [0,600]
          else if((Math.pow(px,2) + Math.pow(py-600,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [0,600])){
                return [0, 600];
          }
          //return back to initial position
          else{
               return [Math.abs(px-ini[0]), Math.abs(py-ini[1])];
          }
    }

    //for surfaces at position [300, 300]
    GamePositions.prototype.checkPosition5 = function(px, py, ini, inp){
        //check if close to postion [0,0]
          if((Math.pow(px,2) + Math.pow(py,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [0,0])){
                return [0, 0];
           }
          //check if close to position [300,0]
          else if((Math.pow(px-300,2) + Math.pow(py,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [300,0])){
                return [300, 0];
          } 
           //check if close to postion [600,0]
           else if((Math.pow(px-600,2) + Math.pow(py,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [600,0])){
                return [600, 0];
          } 
          //check if close to position [0,300]
          else if((Math.pow(px,2) + Math.pow(py-300,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [0,300])){
                return [0, 300];
          }
           //check if close to position [300,300]
          else if((Math.pow(px-300,2) + Math.pow(py-300,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [300,300])){
                return [300, 300];
          }
          //check if close to position [600,300]
          else if((Math.pow(px-600,2) + Math.pow(py-300,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [600,300])){
                return [600, 300];
          }
          //check if close to position [0,600]
          else if((Math.pow(px,2) + Math.pow(py-600,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [0,600])){
                return [0, 600];
          }
          //check if close to position [300,600]
          else if((Math.pow(px-300,2) + Math.pow(py-600,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [300,600])){
                return [300, 600];
          }
          //check if close to position [600,600]
          else if((Math.pow(px-600,2) + Math.pow(py-600,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [600,600])){
                return [600, 600];
          }
          //return back to initial position
          else{
               return [Math.abs(px-ini[0]), Math.abs(py-ini[1])];
          }
    }

     //for surfaces at position [600, 300]
    GamePositions.prototype.checkPosition6 = function(px, py, ini, inp){
          //check if close to postion [600,0]
          if((Math.pow(px-600,2) + Math.pow(py,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [600,0])){
                return [600, 0];
          } 
           //check if close to position [300,300]
          else if((Math.pow(px-300,2) + Math.pow(py-300,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [300,300])){
                return [300, 300];
          }
          //check if close to postion [600,600]
          else if((Math.pow(px-600,2) + Math.pow(py-600,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [600,600])){
                return [600, 600];
          }
          //return back to initial position
          else{
               return [Math.abs(px-ini[0]), Math.abs(py-ini[1])];
          }
    }

     //for surfaces at position [0, 600]
    GamePositions.prototype.checkPosition7 = function(px, py, ini, inp){
          //check if close to postion [0,300]
          if((Math.pow(px,2) + Math.pow(py-300,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [0,300])){
                return [0, 300];
          } 
           //check if close to position [300,300]
          else if((Math.pow(px-300,2) + Math.pow(py-300,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [300,300])){
                return [300, 300];
          }
          //check if close to postion [300,600]
          else if((Math.pow(px-300,2) + Math.pow(py-600,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [300,600])){
                return [300, 600];
          }
          //return back to initial position
          else{
               return [Math.abs(px-ini[0]), Math.abs(py-ini[1])];
          }
    }

     //for surfaces at position [300, 600]
    GamePositions.prototype.checkPosition8 = function(px, py, ini, inp){
          //check if close to postion [0,600]
          if((Math.pow(px,2) + Math.pow(py-600,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [0,600])){
                return [0, 600];
          } 
           //check if close to position [300,300]
          else if((Math.pow(px-300,2) + Math.pow(py-300,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [300,300])){
                return [300, 300];
          }
          //check if close to postion [600,600]
          else if((Math.pow(px-600,2) + Math.pow(py-600,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [600,600])){
                return [600, 600];
          }
          //return back to initial position
          else{
               return [Math.abs(px-ini[0]), Math.abs(py-ini[1])];
          }
    }

     //for surfaces at position [600, 600]
    GamePositions.prototype.checkPosition9 = function(px, py, ini, inp){
          //check if close to postion [600,300]
          if((Math.pow(px-600,2) + Math.pow(py-300,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [600,300])){
                return [600, 300];
          } 
           //check if close to position [300,300]
          else if((Math.pow(px-300,2) + Math.pow(py-300,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [300,300])){
                return [300, 300];
          }
          //check if close to postion [300,600]
          else if((Math.pow(px-300,2) + Math.pow(py-600,2)) <= Math.pow(150,2) &&
            _comparePosition(inp, [300,600])){
                return [300, 600];
          }
          //return back to initial position
          else{
               return [Math.abs(px-ini[0]), Math.abs(py-ini[1])];
          }
    }


  //function to check if the destination is occupied
    function _comparePosition(inp, position){
        for (pos in inp){
            if((inp[pos][0] === position[0]) && (inp[pos][1] === position[1])){
                return false;
            }
        }
        return true;
    }

    Array.prototype.comparePosition = function(array){
          for (pos in array){
             if((array[pos][0] === this[0]) && (array[pos][1] === this[1])){
                return false;
            }  
          }

          return true;
    };

    module.exports = GamePositions;
});
