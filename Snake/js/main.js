const View = require('./snake-view');

$(function () {
  const rootEl = $('.game');
  new View(rootEl);
});
