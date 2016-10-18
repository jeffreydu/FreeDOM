const Board = require('./board');
const DOMNodeCollection = require('../../lib/dom_node_collection');

class View {
  constructor($el) {
    this.$el = $el;
    this.board = Board.new(15);
    // this.handleKeyDown = this.handleKeyDown.bind(this);

    $(window).on("keydown", this.handleKeyDown.bind(this));

  }

  handleKeyDown(e) {
    console.log('abc');
  }
}

module.export = View;
