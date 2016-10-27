const Snake = require('./snake');

class Board {
  constructor(size) {
    this.size = size;
    this.snake = new Snake(this);
  }

  emptyGrid() {
    const grid = [];

    for (let i = 0; i < this.size; i++) {
      const row = [];
      for (let j = 0; j < this.size; j++) {
        row.push(Board.BLANK_SYMBOL);
      }
      grid.push(row);
    }
    return grid;
  }

  validPosition(pos) {
    return (pos.x >= 0 && pos.x <= this.size &&
            pos.y >= 0 && pos.y <= this.size);
  }

  render() {
    const grid = this.emptyGrid();

    this.snake.segments.forEach((segment) => {
      grid[segment.x][segment.y] = Snake.BODY;
    });
    
    grid.map( row => row.join("") ).join("\n");
  }
}

Board.BLANK_SYMBOL = ".";

module.exports = Board;
