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
	
	$(function () {
	  const rootEl = $('.snake-game');
	  new View(rootEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {const Board = __webpack_require__(3);
	const DOMNodeCollection = __webpack_require__(6);
	
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	const Snake = __webpack_require__(4);
	
	class Board {
	  constructor(size) {
	    this.size = size;
	    this.snake = new Snake(this);
	  }
	}
	
	module.exports = Board;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module) {const Coord = __webpack_require__(5);
	
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
	
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(2)(module)))

/***/ },
/* 5 */
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
/* 6 */
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