/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const View = __webpack_require__(1);
	
	$j(function () {
	  const rootEl = $j('.game');
	  new View(rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const Board = __webpack_require__(2);
	const DOMNodeCollection = __webpack_require__(5);
	
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


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(3);
	
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Coord = __webpack_require__(4);
	
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


/***/ },
/* 4 */
/***/ function(module, exports) {

	class Coord {
	  constructor(x, y) {
	    this.x = x;
	    this.y = y;
	  }
	
	  equals(otherCoord) {
	    return (this.x === otherCoord.x) && (this.y === otherCoord.y);
	  }
	
	  plus(otherCoord) {
	    return new Coord(this.x + otherCoord.x, this.y + otherCoord.y);
	  }
	
	}
	
	module.exports = Coord;


/***/ },
/* 5 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(nodes) {
	    this.nodes = Array.from(nodes);
	  }
	
	  html (arg) {
	    if (arg){
	      this.nodes.forEach((el) => {
	        el.innerHTML = arg;
	      });
	    } else{
	      return this.nodes[0].innerHTML;
	    }
	  }
	
	  empty () {
	    this.nodes.forEach((el) => {
	      el.innerHTML = "";
	    });
	  }
	
	  append (arg) {
	    if (arg instanceof DOMNodeCollection) {
	      this.nodes.forEach((el) => {
	        arg.nodes.forEach((argEl) => {
	          el.innerHTML += argEl.outerHTML;
	        });
	      });
	    } else if (arg instanceof HTMLElement) {
	      this.nodes.forEach((el) => {
	        el.innerHTML += arg.outerHTML;
	      });
	    } else if (typeof arg === "string"){
	      this.nodes.forEach((el) => {
	        el.innerHTML += arg;
	      });
	    }
	  }
	
	  attr (attribute, value) {
	    if (value) {
	      this.nodes.forEach((el) => {
	        el.setAttribute(attribute, value);
	      });
	    } else {
	      return this.array[0].getAttribute(attribute);
	    }
	  }
	
	  addClass (newClass) {
	    this.nodes.forEach((el) => {
	      el.classList.add(newClass);
	    });
	  }
	
	  removeClass (removedClass) {
	    this.nodes.forEach((el) => {
	      el.classList.remove(removedClass);
	    });
	  }
	
	  children () {
	    const children = [];
	    this.nodes.forEach((el) => {
	      children.push(el.children);
	    });
	    return new DOMNodeCollection(children);
	  }
	
	  parent () {
	    const parents = [];
	    this.nodes.forEach((el) => {
	      parents.push(el.parentNode);
	    });
	    return new DOMNodeCollection(parents);
	  }
	
	  find (selector) {
	    let doms = [];
	    this.nodes.forEach((el) => {
	      const foundEls = el.querySelectorAll(selector);
	      doms = doms.concat(Array.from(foundEls));
	    });
	    return new DOMNodeCollection(doms);
	  }
	
	  remove () {
	    this.nodes.forEach((el) => {
	      el.parentNode.removeChild(el);
	    });
	  }
	
	  idx(index) {
	    return this.nodes[index];
	  }
	
	  on (occurence, callback) {
	    this.nodes.forEach((el) => {
	      el.addEventListener(occurence, callback);
	      const key = `FreeDOM-${occurence}`;
	      if (typeof el[key] === "undefined") {
	        el[key] = [];
	      }
	      el[key].push(callback);
	    });
	  }
	
	  off (occurence) {
	    this.nodes.forEach((el) => {
	      const key = `FreeDOM-${occurence}`;
	      if (el[key]) {
	        el[key].forEach(callback => {
	          el.removeEventListener(occurence, callback);
	        });
	      }
	      el[key] = [];
	    });
	  }
	
	}
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map