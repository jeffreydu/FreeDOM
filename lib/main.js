const DOMNodeCollection = require('./dom_node_collection');

let ready = false;
let queue = [];

function $l(selector) {
  if (selector instanceof Function) {
    if (!ready){
      queue.push(selector);
    }else {
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
}

Function.prototype.extend = function(...args) {
  let firstArg = args[0];
  args.slice(1).forEach((obj) => {
    for (let property in obj) {
      firstArg[property] = obj[property];
    }
  });
  return firstArg;
};

Function.prototype.ajax = function(options) {
  const defaults = {
    method: "GET",
    contentType : 'application/x-www-form-urlencoded; charset=UTF-8',
    dataType : 'json',
    data: {},
    success: ()=> {},
    error:()=> {},
    url: ""
  };

  options = $l.extend(defaults, options);
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

const toQueryString = (obj) => {
  let result = "";
  for(let prop in obj){
    if (obj.hasOwnProperty(prop)){
      result += prop + "=" + obj[prop] + "&";
    }
  }
  return result.substring(0, result.length - 1);
};

document.addEventListener("DOMContentLoaded", () => {
  ready = true;
  queue.forEach((func) => {
    func();
  });
});

window.$l = $l;
