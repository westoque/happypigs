var cocos = require('cocos2d'),
    geom  = require('geometry'),
    util  = require('util');

function speed() {
  var num = parseInt(Math.random() * 20);
  return 1;
}
function Bird(canvasSize, layer) {
  Bird.superclass.constructor.call(this);

  var sprite = new cocos.nodes.Sprite({
                 file: '/resources/pig.png',
                 rect: new geom.Rect(0, 0, 111, 121)
               });
  sprite.anchorPoint = new geom.Point(100, 100);
  this.addChild({child: sprite});
  this.contentSize = sprite.contentSize;

  this.dx = speed();
  this.dy = speed();
  this.layer = layer;
  this.canvasSize = canvasSize;
  // this.scheduleUpdate()
}

Bird.inherit(cocos.nodes.Node, {
  shoot: function(point) {
    if (Math.abs(point.x - this.position.x) < 10 &&
        Math.abs(point.y - this.position.y) < 10) {
      this.layer.removeChild(this);
    }
  },

  update: function (dt) {
    console.log('updating...');
    var pos = util.copy(this.position);

    pos.x += dt * this.dx;
    pos.y += dt * this.dy;

    if (pos.x < 0) {
      pos.x = 0;
      this.dx = speed();
    } else if (pos.x > this.canvasSize.width) {
      pos.x = this.canvasSize.width;
      this.dx = -speed();
    }
    if (pos.y < 0) {
      pos.y = 0;
      this.dy = speed();
    } else if (pos.y > this.canvasSize.height) {
      pos.y = this.canvasSize.height;
      this.dy = -speed();
    }

    this.position = pos;
  }
});
module.exports = Bird;
