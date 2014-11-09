'use strict';
var express = require('express');
var app = express();
app.use(express.static(__dirname + "/public/"));

var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(8888);

var socket;
io.on('connection', function (_socket) {
  console.log("connection");
  socket = _socket;
});

var five = require("johnny-five"),
  board, photoresistor;
var opacitySensor;

board = new five.Board();

board.on("ready", function() {

  // Create a new `photoresistor` hardware instance.
  photoresistor = new five.Sensor({
    pin: "A0",
    freq: 17
  });

  opacitySensor = new five.Sensor({
    pin: "A2",
    freq: 17
  });

  // Inject the `sensor` hardware into
  // the Repl instance's context;
  // allows direct command line access
  board.repl.inject({
    pot: photoresistor
  });

  board.repl.inject({
    pot: opacitySensor
  });

  // "data" get the current reading from the photoresistor
  photoresistor.on("data", function() {
    console.log('A', this.value);
    if(socket) socket.emit("angle", this.value);
  });

  opacitySensor.on("data", function() {
    console.log('o', this.value);
    if(socket) socket.emit("opacity", this.value);
  });
});

