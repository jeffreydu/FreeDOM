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
