const View = require('./snake-view');

$j(function () {
  const rootEl = $j('.game');
  new View(rootEl);
});
