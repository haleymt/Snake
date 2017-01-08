(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {}
  }

  var Snake = window.SnakeGame.Snake = function (level) {
    this.radius = level.radius;
    this.xDim = level.xDim / (level.radius * 2);
    this.yDim = level.yDim / (level.radius * 2);
    this.level = level;
    this.direction = "up";
    this.joints = [[Math.floor(this.xDim / 2), Math.floor(this.yDim / 2)]];
  };

  Snake.prototype.move = function () {
    var newHead = this.joints[this.joints.length - 1].slice();

    if (this.direction === "up") {
      newHead[1] -= 1
    } else if (this.direction === "down") {
      newHead[1] += 1
    } else if (this.direction === "right") {
      newHead[0] += 1
    } else {
      newHead[0] -= 1
    }

    if (newHead.toString() !== this.level.apple.position.toString()) {
      this.joints.shift();
    }

    if (this.isValidJoint(newHead)) {
      if (newHead.toString() === this.level.apple.position.toString()) {
        this.level.changeApplePosition();
      }
      this.joints.push(newHead);
    } else {
      this.level.lose();
    }
  };

  Snake.prototype.deepIncludes = function (array) {
    var includes = this.joints.every(function (joint) {
      return joint.toString() !== array.toString();
    });

    return !includes;
  };

  Snake.prototype.isValidJoint = function (position) {
    return (
      position[0] >= 0 && position[0] < this.xDim &&
      position[1] >= 0 && position[1] < this.yDim &&
      !this.deepIncludes(position)
    );
  };

  Snake.prototype.draw = function (ctx) {
    this.joints.forEach( function (joint) {
      ctx.beginPath();

      ctx.arc(
        (joint[0] * this.radius * 2) + this.radius,
        (joint[1] * this.radius * 2) + this.radius,
        this.radius,
        0,
        (2 * Math.PI),
        false
      );
      ctx.fillStyle = "#FFFFFF";
      ctx.fill();
    }.bind(this));
  };
})();
