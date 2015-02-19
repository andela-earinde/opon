/* globals define */
define(function(require, exports, module) {
    'use strict';
    // import dependencies
    var Engine = require('famous/core/Engine');
    var SceneView = require('views/SceneView');

    var mainContext = Engine.createContext();

    var sceneView = new SceneView();
   
    mainContext.add(sceneView);
});
