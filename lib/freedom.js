/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);

	let ready = false;
	let queue = [];

	window.$l = (selector) => {
	  if (selector instanceof Function) {
	    if (!ready){
	      queue.push(selector);
	    } else {
	      selector();
	    }
	  }
	  else if (selector instanceof HTMLElement) {
	    return new DOMNodeCollection([selector]);
	  }
	  else {
	    let selected = document.querySelectorAll(selector);
	    let arraySelected = Array.from(selected);
	    return new DOMNodeCollection(arraySelected);
	  }
	};

	window.$l.extend = (...args) => {
	  let firstArg = args[0];
	  args.slice(1).forEach((object) => {
	    for (let property in object) {
	      firstArg[property] = object[property];
	    }
	  });
	  return firstArg;
	};

	window.$l.ajax = (options) => {
	  const defaults = {
	    method: "GET",
	    contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
	    dataType : 'json',
	    data: {},
	    success: ()=> {},
	    error:()=> {},
	    url: ""
	  };

	  options = window.$l.extend(defaults, options);
	  options.method = options.method.toUpperCase();
	  if (options.method === 'GET') {
	    options.url += "?" + toQueryString(options.data);
	  }

	  const xhr = new XMLHttpRequest();
	  xhr.open(options.method, options.url, true);
	  xhr.onload = (e) => {
	    if (xhr.status === 200){
	      return options.success(JSON.parse(xhr.response));
	    } else {
	      return options.error(JSON.parse(xhr.response));
	    }
	  };
	  xhr.send(JSON.stringify(defaults.data));

	};

	document.addEventListener("DOMContentLoaded", () => {
	  ready = true;
	  queue.forEach((func) => {
	    func();
	  });
	});

	const toQueryString = (object) => {
	  let result = "";
	  for(let property in object){
	    if (object.hasOwnProperty(property)){
	      result += property + "=" + object[property] + "&";
	    }
	  }
	  return result.slice(0, result.length - 1);
	};


/***/ },
/* 1 */
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