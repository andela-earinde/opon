define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function SceneView() {
        View.apply(this, arguments);
    }

    SceneView.prototype = Object.create(View.prototype);
    SceneView.prototype.constructor = SceneView;

    SceneView.DEFAULT_OPTIONS = {};

    
    module.exports = GameView;
});
