"use strict";

var Cylon = require("cylon");

// For http
Cylon.api('http');

// Or for Socket.io
Cylon.api('socketio');


Cylon.robot({
  connections: {
    joystick: { adaptor: "joystick" },
    bebop:  { adaptor: 'bebop' }
  },

  devices: {
    controller: { driver: "xbox-360" },
    drone:      { driver: "bebop", connection: "bebop" }
  },

  work: function(my) {

    var that = this,
        rightStick = { x: 0.0, y: 0.0 },
        leftStick = { x: 0.0, y: 0.0 };    

    my.drone.on("ready", function() {
      console.log("ready...");
    });

    my.drone.on("takingOff", function() {
      console.log("taking off...");
    });

    my.drone.on("landing", function() {
      console.log("landing...");
    });

    my.drone.on("landed", function() {
      console.log("landed.");
    });


    ["a", "b", "x", "y", "lb", "rb"].forEach(function(button) {
      console.log("Registered listener:", button);

      my.controller.on("lb:press", function() {
        console.log("Button Left Bumper pressed.");
        that.drone.stop();
      });

      my.controller.on("rb:press", function() {
        console.log("Button Right Bumper pressed.");
	that.drone.emergency();
      });

      my.controller.on("x:press", function() {
        console.log("Button X pressed.");
        that.drone.leftFlip();
      });

      my.controller.on("y:press", function() {
        console.log("Button Y pressed.");
        that.drone.frontFlip();
      });

      my.controller.on("b:press", function() {
        console.log("Button B pressed.");
        that.drone.rightFlip();
      });

      my.controller.on("a:press", function() {
        console.log("Button A pressed.");
        that.drone.backFlip();
      });
    });

    my.controller.on("left_x:move", function(pos) {
      console.log("Left Stick - X:", pos);
      leftStick.x = pos;
    });

    my.controller.on("left_y:move", function(pos) {
      console.log("Left Stick - Y:", pos);
      leftStick.y = pos;
    });

    my.controller.on("right_x:move", function(pos) {
      console.log("Right Stick - X:", pos);
      rightStick.x = pos;
    });

    my.controller.on("right_y:move", function(pos) {
      console.log("Right Stick - Y:", pos);
      rightStick.y = pos;
    });

    my.controller.on("lt:move", function(pos) {
      console.log("Left Trigger: ", pos);
      that.drone.land();
    });

    my.controller.on("rt:move", function(pos) {
      console.log("Right Trigger: ", pos);
      that.drone.takeOff();
    });

    setInterval(function() {
      var pair = leftStick;

      if (pair.y < 0) {
        that.drone.forward(validatePitch(pair.y));
        console.log("forward value:", validatePitch(pair.y));
      } else if (pair.y > 0) {
        that.drone.backward(validatePitch(pair.y));
        console.log("backward value:", validatePitch(pair.y));
      }

      if (pair.x > 0) {
        that.drone.right(validatePitch(pair.x));
        console.log("right value:", validatePitch(pair.y));
      } else if (pair.x < 0) {
        that.drone.left(validatePitch(pair.x));
        console.log("left value:", validatePitch(pair.y));
      }
    }, 0);

    setInterval(function() {
      var pair = rightStick;

      if (pair.y < 0) {
        that.drone.up(validatePitch(pair.y));
        console.log("up value:", validatePitch(pair.y));
      } else if (pair.y > 0) {
        that.drone.down(validatePitch(pair.y));
        console.log("down value:", validatePitch(pair.y));
      }

      if (pair.x > 0) {
        that.drone.clockwise(validatePitch(pair.x));
	console.log("clockwise value:", validatePitch(pair.y));
      } else if (pair.x < 0) {
        that.drone.counterClockwise(validatePitch(pair.x));
	console.log("counterclockwise value:", validatePitch(pair.y));
      }
    }, 0);

    setInterval(function() {
      that.drone.stop();
    }, 10);

  }
});

function validatePitch(data) {
  var value = Math.abs(data);
  if (value >= 0.1) {
    if (value <= 1.0) {
      return Math.round(value * 100);
    } else {
      return 100;
    }
  } else {
    return 0;
  }
}

Cylon.start();
