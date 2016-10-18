const View = require('./snake-view');

$(function () {
  const rootEl = $('.snake-game');
  new View(rootEl);
});
