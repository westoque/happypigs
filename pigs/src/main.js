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
    HappyLayer.superclass.constructor.call(this)

    // Get size of canvas
    var s = Director.sharedDirector.winSize

    // Add a label
    var label = new Label({ string:   'HappyLayer'
                          , fontName: 'Arial'
                          , fontSize: 26
                          })
    label.position = ccp(s.width / 2, s.height / 2)
    this.addChild(label)

    // Add Pig
    var pig = new Pig()
    pig.position = new geo.Point(160, s.height - 280)
    this.addChild(pig)
    this.pig = pig
}

// Inherit from cocos.nodes.Layer
HappyLayer.inherit(Layer)


/**
 * Entry point for the application
 */
function main () {
    // Initialise application

    // Get director singleton
    var director = Director.sharedDirector

    // Wait for the director to finish preloading our assets
    events.addListener(director, 'ready', function (director) {
        // Create a scene and layer
        var scene = new Scene()
          , layer = new HappyLayer()

        // Add our layer to the scene
        scene.addChild(layer)

        // Run the scene
        director.replaceScene(scene)
    })

    // Preload our assets
    director.runPreloadScene()
}


exports.main = main
