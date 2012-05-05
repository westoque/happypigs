"use strict"  // Use strict JavaScript mode

// Pull in the modules we're going to use
var cocos  = require('cocos2d')   // Import the cocos2d module
  , nodes  = cocos.nodes          // Convenient access to 'nodes'
  , events = require('events')    // Import the events module
  , geo    = require('geometry')  // Import the geometry module
  , ccp    = geo.ccp              // Short hand to create points
  , Pig    = require('./pig')

// Convenient access to some constructors
var Layer    = nodes.Layer
  , Scene    = nodes.Scene
  , Sprite   = nodes.Sprite
  , Label    = nodes.Label
  , Director = cocos.Director

/**
 * @class Initial application layer
 * @extends cocos.nodes.Layer
 */
function HappyLayer () {
  // You must always call the super class constructor
  HappyLayer.superclass.constructor.call(this);

  var winSize = cocos.Director.sharedDirector.winSize;
  var maxHeight = winSize.height;
  var maxWidth  = winSize.width;

  // Get size of canvas
  var s = Director.sharedDirector.winSize;

  // Add Pig
  var self = this;
  var pig = new Pig();
  pig.position = new geo.Point(320, 320);
  this.addChild(pig);
  this.pig = pig;
  console.log(pig.contentSize);

  // Add Pig 1
  //var self = this;
  //var pig = new Pig();
  //pig.position = new geo.Point(10, 280);
  //this.addChild(pig);
  //this.pig = pig;

  // Add Pig 2
  //var self = this;
  //var pig = new Pig();
  //pig.position = new geo.Point(50, 280);
  //this.addChild(pig);
  //this.pig = pig;

  var origin;
  var cherryPopped = false;

  window.top.pig = pig;
  window.top.something = function(data) {
    if (!cherryPopped) {
      origin = data.coordinates;
      cherryPopped = true;
    }

    var coor = data.coordinates;
    var pos  = self.pig.position;

    var newX = (coor.x - origin.x) * -2;
    var newY = (coor.y - origin.y) * 2;

    console.log(newY);

    //if (((newX + pig.contentSize.width) > maxWidth) || newX < 0) {
      //pos.x = 640;
    //} else {
      pos.x += newX;
    //}

    //if (((newY + pig.contentSize.height) > maxHeight) || newY < 0) {
      //pos.y = 480;
    //} else {
      pos.y += newY;
    //}
  };
}

// Inherit from cocos.nodes.Layer
HappyLayer.inherit(Layer);


/**
 * Entry point for the application
 */
function main () {
    // Initialise application

    // Get director singleton
    var director = Director.sharedDirector;

    // Wait for the director to finish preloading our assets
    events.addListener(director, 'ready', function (director) {
      // Create a scene and layer
      var scene = new Scene(), layer = new HappyLayer();

      // Add our layer to the scene
      scene.addChild(layer);

      // Run the scene
      director.replaceScene(scene);
    });

    // Preload our assets
    director.runPreloadScene();
}


exports.main = main;
