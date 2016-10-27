const Coord = require('./coord');

class Snake {
  constructor(board) {
    this.direction = "N";
    this.board = board;
    const origin = new Coord(Math.floor(board.size / 2), Math.floor(board.size / 2));
    this.segments = [origin];
    this.growth = 0;
    this.turning = false;
  }

  head() {
    return this.segments.slice(-1)[0];
  }

  move() {
    this.segments.push(this.head().plus(Snake.MOVES[this.direction]));
    this.turning = false;

    // if (this.eatApple()) {
    //   this.board.apple.replace();
    // }

    // if not growing, remove tail segment
    if (this.growTurns > 0) {
      this.growTurns -= 1;
    } else {
      this.segments.shift();
    }

    if (!this.isValid()) {
      this.segments = [];
    }
  }

  turn(dir) {
    if (Snake.OPPOSITES[this.direction] === dir) {
      return;
    } else {
      this.direction = dir;
    }
  }

  isOccupying(array) {
    let result = false;
    this.segments.forEach( segment => {
      if (segment.x === array[0] && segment.y === array[1]) {
        result = true;
        return result;
      }
    });
    return result;
  }

  isValid() {
  const head = this.head();

  if (!this.board.validPosition(this.head())) {
    return false;
  }

  for (let i = 0; i < this.segments.length - 1; i++) {
    if (this.segments[i].equals(head)) {
      return false; //snake eating itself
    }
  }

  return true;
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

Snake.BODY = "X";

module.exports = Snake;
