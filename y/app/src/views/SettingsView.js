define(function(require, exports, module) {
    var View               = require('famous/core/View');
    var Surface            = require('famous/core/Surface');
    var ImageSurface       = require('famous/surfaces/ImageSurface');
    var Transform          = require('famous/core/Transform');
    var StateModifier      = require('famous/modifiers/StateModifier');
    var HeaderFooterLayout = require('famous/views/HeaderFooterLayout');
    var ToggleView         = require('views/ToggleView');
    var SequentialLayout   = require('famous/views/SequentialLayout');
    var RenderNode         = require('famous/core/RenderNode');
    var FlexScrollView     = require('famous-flex/FlexScrollView');
    var ListLayout         = require('famous-flex/layouts/ListLayout');

    function SettingsView() {
        View.apply(this, arguments);
        _setLayout.call(this);
        _createHeader.call(this);
        _createBackgroundSurface.call(this);
        _createContent.call(this);
        _setOutputListeners.call(this);
    }

    SettingsView.prototype = Object.create(View.prototype);
    SettingsView.prototype.constructor = SettingsView;

    SettingsView.DEFAULT_OPTIONS = {};

    function _setLayout(){
         this.layout = new HeaderFooterLayout({
            headerSize: 50
         })

         this.layoutModifier = new StateModifier();

         this.add(this.layoutModifier).add(this.layout);
    }

    function _createHeader(){
         var backgroundSurface = new Surface({
            properties: {
                backgroundColor: 'black'
            }
         });

         this.hamburgerSurface = new ImageSurface({
            size: [50, 50],
            content: 'img/hamburger.png',
            properties: {
                cursor: 'pointer'
            }
         });

         var titleSurface = new Surface({
             size: [200, 50],
             content: "OPON by Eni",
             properties: {
                fontFamily: 'monotype corsiva, courier, helvetica',
                fontSize: "20px",
                color: 'white'
             }
         })

         var backgroundModifier = new StateModifier({
            transform: Transform.behind
         });

         this.hamburgerModifier = new StateModifier({
             origin: [1, 0.5],
             align: [1, 0.5]
         });

         var titleModifier = new StateModifier({
             origin: [0, 0.5],
             align: [0, 0.5]
         });

         this.layout.header.add(this.hamburgerModifier).add(this.hamburgerSurface);
         this.layout.header.add(backgroundModifier).add(backgroundSurface);
         this.layout.header.add(titleModifier).add(titleSurface); 
    }
    function _createBackgroundSurface(){
        var surface = new Surface({
            size: [undefined, undefined],
            properties: {
                backgroundColor: 'grey'
            }
        });

        var modifier = new StateModifier({
            transform: Transform.translate(0, 0, -2),
            opacity: 0.7
        });

        this.add(modifier).add(surface);
    }

    function _createContent(){

            var scrollView = new FlexScrollView({
                  layout: ListLayout,
                  layoutOptions: {
                     margins: [20, 0, 20, 0],
                     spacing: 1
                  },
                  dataSource: [
                       toggleNode()
                  ]
            });
          function toggleNode(){
            var renderNode = new RenderNode();

            var toggleView = new ToggleView();

            var toggleModifier = new StateModifier({
                size: [undefined, 50],
                transform: Transform.inFront
            });
            renderNode.add(toggleModifier).add(toggleView);

             return renderNode;
           }

        this.layout.content.add(scrollView);
    }

    function _setOutputListeners(){
         this.hamburgerSurface.on('click', function(){
            this._eventOutput.emit('toggleSurface');
         }.bind(this));
    }

    module.exports = SettingsView;
});