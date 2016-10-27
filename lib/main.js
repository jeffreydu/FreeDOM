const DOMNodeCollection = require('./dom_node_collection');

let ready = false;
let queue = [];

window.$j = (selector) => {
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
  else if (selector === window) {
    return new DOMNodeCollection([window]);
  }
  else {
    let selected = document.querySelectorAll(selector);
    let arraySelected = Array.from(selected);
    return new DOMNodeCollection(arraySelected);
  }
};

window.$j.extend = (...args) => {
  let firstArg = args[0];
  args.slice(1).forEach((object) => {
    for (let property in object) {
      firstArg[property] = object[property];
    }
  });
  return firstArg;
};

window.$j.ajax = (options) => {
  const defaults = {
    method: "GET",
    contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
    dataType : 'json',
    data: {},
    success: ()=> {},
    error:()=> {},
    url: ""
  };

  options = window.$j.extend(defaults, options);
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
