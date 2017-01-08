(function () {
  if (typeof SnakeGame === "undefined") {
    window.SnakeGame = {}
  }

  var Apple = window.SnakeGame.Apple = function (level) {
    this.radius = level.radius;
    this.level = level;
    this.img = "img/apple.png";
    this.resetPosition();
  }

  Apple.prototype.resetPosition = function () {
    var position = this.randomApplePosition();

    while (this.level.snake.deepIncludes(position)) {
      position = this.randomApplePosition();
    }
    console.log(position);

    this.position = position;
  };

  Apple.prototype.randomApplePosition = function () {
    var length = this.level.xDim / (this.radius * 2);
    var height = this.level.yDim / (this.radius * 2);

    var x = Math.floor(Math.random() * (length - 1));
    var y = Math.floor(Math.random() * (height - 1));

    return [x, y];
  };

  Apple.prototype.draw = function () {
    var img = new Image();
    x = (this.position[0] * this.radius * 2);
    y = (this.position[1] * this.radius * 2);
    img.src = this.img;
    ctx.drawImage(img, x, y, this.radius * 2, this.radius * 2);

    // ctx.beginPath();
    //
    // ctx.arc(
    //   (this.position[0] * this.radius * 2) + this.radius,
    //   (this.position[1] * this.radius * 2) + this.radius,
    //   this.radius,
    //   0,
    //   (2 * Math.PI),
    //   false
    // );
    // ctx.fillStyle = "#FF0000";
    // ctx.fill();
  }
})();
