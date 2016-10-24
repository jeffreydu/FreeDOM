const Board = require('./board');
const DOMNodeCollection = require('../../lib/dom_node_collection');

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board(15);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.step = this.step.bind(this);

    this.generateGrid();

    window.setInterval(this.step, 500);

    $(window).on("keydown", this.handleKeyDown);

  }

  handleKeyDown(e) {
    if (View.KEYCODES[e.keyCode]) {
      this.board.snake.turn(View.KEYCODES[e.keyCode]);
    }
  }

  step() {
    this.board.snake.move();
    this.render();
  }

  generateGrid() {
    let board = "";
    for (let i = 0; i < this.board.size; i++) {
      board += "<ul>";
      for (let j = 0; j < this.board.size; j++) {
        board += "<li></li>";
      }
      board += "</ul>";
    }

    this.$el.html(board);
    this.$li = this.$el.find("li");
  }

  render() {

  }
}

View.KEYCODES = {
  37: "W",
  38: "N",
  39: "E",
  40: "S"
};

module.exports = View;
