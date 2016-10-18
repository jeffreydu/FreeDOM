const Snake = require('./snake');

class Board {
  constructor(size) {
    this.size = size;
    this.snake = new Snake(this);
  }
}

module.exports = Board;
