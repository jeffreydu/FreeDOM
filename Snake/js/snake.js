const Coord = require('./coord');

class Snake {
  constructor(board) {
    this.direction = "N";
    this.board = board;
    const origin = new Coord(Math.floor(board.size/2), Math.floor(board.size/2));
    this.segments = [origin];
    this.growth = 0;
  }

  head() {
    return this.segments.slice(-1)[0];
  }

  move() {
    this.segments.push(this.head().plus(Snake.MOVES[this.direction]));
  }

  turn(dir) {
    if (Snake.OPPOSITES[this.direction] === dir) {
      return;
    } else {
      this.direction = dir;
    }
  }

}

Snake.MOVES = {
  "N": new Coord(-1, 0),
  "E": new Coord(0, 1),
  "S": new Coord(1, 0),
  "W": new Coord(0, -1)
};

Snake.OPPOSITES = {
  "N": "S",
  "S": "N",
  "E": "W",
  "W": "E"
};

module.export = Snake;
