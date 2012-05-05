var cocos = require('cocos2d')
  , geom  = require('geometry')

function Pig() {
    Pig.superclass.constructor.call(this)

    var sprite = new cocos.nodes.Sprite({
                     file: '/resources/pig.png',
                     rect: new geom.Rect(0, 0, 111, 121)
                 })

    sprite.anchorPoint = new geom.Point(0, 0)
    this.addChild({child: sprite})
    this.contentSize = sprite.contentSize
}

Pig.inherit(cocos.nodes.Node)

module.exports = Pig

