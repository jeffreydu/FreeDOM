const Board = require('./board');
const DOMNodeCollection = require('../../lib/dom_node_collection');

class View {
  constructor($el) {
    this.$el = $el;
    this.board = new Board(15);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.step = this.step.bind(this);

    this.generateGrid();
    this.intervalId = window.setInterval(
      this.step.bind(this),
      View.STEP_TIME
    );

    window.setInterval(this.step, 500);

    $j(window).on("keydown", this.handleKeyDown);

  }

  handleKeyDown(e) {

    if (View.KEYCODES[e.keyCode]) {
      this.board.snake.turn(View.KEYCODES[e.keyCode]);
    }
  }

  step() {
    if (this.board.snake.segments.length > 0) {
     this.board.snake.move();
     this.render();
    } else {
     alert("You lose!");
     window.clearInterval(this.intervalId);
    }
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
    this.updateClasses(this.board.snake.segments, 'snake');
  }

  updateClasses(coords, className) {
    this.$li.removeClass(className);
    coords.forEach( coord => {
      const flattened = coord.x * this.board.size + coord.y;
      
    });
  }
}

View.STEP_TIME = 100;

View.KEYCODES = {
  37: "W",
  38: "N",
  39: "E",
  40: "S"
};

module.exports = View;
