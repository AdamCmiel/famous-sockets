// load css
require('./styles');

// Load polyfills
require('famous-polyfills');

// import dependencies
var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var Transform = require('famous/core/Transform');
var ImageSurface = require('famous/surfaces/ImageSurface');
var Transitionable = require('famous/transitions/Transitionable');

var WeightedAverage = require('./WeightedAverage');
var angle = new WeightedAverage(0, 8);
var opacity = new WeightedAverage(1, 8);

var pr = new Transitionable(0);
var o = new Transitionable(1);

var _a, _o;

var socket = io.connect("http://tall-adam.local:8888");
socket.on('angle', function (_angle) {
    _a = 2 * _angle * Math.PI / 180;
    angle.pushValue(_a);
    pr.set(angle.get());
});
socket.on('opacity', function (_opacity) {
    _o = 1 - _opacity / 150;
    opacity.pushValue(_o);
    o.set(opacity.get());
});
socket.on('disconnect', function () {
    alert('disconnected');
});

// create the main context
var mainContext = Engine.createContext();

// your app here
var logo = new ImageSurface({
  size: [200, 200],
  content: 'images/famous_logo.png',
  classes: ['backfaceVisibility']
});

var initialTime = Date.now();
var centerSpinModifier = new Modifier({
  align: [0.5, 0.5],
  origin: [0.5, 0.5],
  transform: function() {
    return Transform.rotateY(pr.get());
  },
  opacity: function() {
    return o.get();
  }
});

mainContext.add(centerSpinModifier).add(logo);

