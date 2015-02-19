define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var Modifier = require('famous/core/Modifier');
    var Transitionable = require('famous/transitions/Transitionable');
    var Easing = require('famous/transitions/Easing');

    function ToggleView() {
        View.apply(this, arguments); 
        this.state = new Transitionable(0);
        this.isToggled = false;
        _createToggleSurfaces.call(this);
        _handleToggleEvent.call(this);
    }

    ToggleView.prototype = Object.create(View.prototype);
    ToggleView.prototype.constructor = ToggleView;

    ToggleView.DEFAULT_OPTIONS = {
        height: 40,
        width: 100,
        transition: {duration: 700, curve: Easing.outBounce}
    };

    function _createToggleSurfaces(){
        var background = new Surface({
            size: [undefined, 50],
            properties: {
                backgroundColor: 'black',
                border: "1px solid grey",
                borderRadius: '10px',
                boxShadow: '0 0 30px black'
            }
        });

        var textSurface = new Surface({
            size: [100, 50],
            content: "Rotate view",
            properties: {
                textAlign: 'center',
                color: 'white',
                fontSize: "20px",
                fontFamily: 'monotype corsiva, courier, helvetica'
            }
        });

        var blueBackground = new Surface({
            size: [this.options.width, this.options.height],
            properties: {
                backgroundColor: 'blue',
                border: "1px solid gray",
                borderRadius: this.options.height+"px"
            }
        });

        var redBackground = new Surface({
            size: [this.options.width, this.options.height],
            properties: {
                backgroundColor: 'red',
                border: "1px solid gray",
                borderRadius: this.options.height+"px"
            }
        });

        this.toggleSurface = new Surface({
             size: [this.options.height, this.options.height],
             content: "OFF",
             properties: {
                 backgroundColor: "white",
                 textAlign: "center",
                 border: "1px solid gray",
                 borderRadius: this.options.height+"px",
                 zIndex: 1,
                 lineHeight: this.options.height+"px",
                 cursor: 'pointer'
             }
        });

        var blueModifier = new Modifier({
            align: [1, 0.5],
            origin: [1, 0.5],
           // toggle between 0 and 1
           opacity: function() {
               return this.state.get();
           }.bind(this)
        });

        var redModifier = new Modifier({
            align: [1, 0.5],
            origin: [1, 0.5],
           // toggle between 1 and 0
            opacity: function() {
               return 1 - this.state.get();
            }.bind(this)
        });

        var toggleModifier = new Modifier({
            align: [0.8, 0.5],
            origin: [1, 0.5],
           // toggle between 0 and right x-position
            transform: function() {
               var xPos = this.state.get() * (this.options.width - this.options.height);
               return Transform.translate(xPos, 0, 0);
            }.bind(this)
        });

        var textModifier = new Modifier({
             align: [0, 1],
             origin: [0, 0.5]
        })

        this.add(blueModifier).add(blueBackground);
        this.add(redModifier).add(redBackground);
        this.add(toggleModifier).add(this.toggleSurface);
        this.add(textModifier).add(textSurface);
        this.add(background);
    }

    function _handleToggleEvent(){
        this.toggleSurface.on('click', this.toggleState.bind(this));
    }

    ToggleView.prototype.toggleState = function(){

          if(this.state.isActive()) this.state.halt();

          if(this.isToggled){
               this.state.set(0, this.options.transition);
               this.toggleSurface.setContent("OFF");
          }
          else{
               this.state.set(1, this.options.transition);
               this.toggleSurface.setContent("ON");
          }

          this.isToggled = !this.isToggled;
    };


    module.exports = ToggleView;
});
