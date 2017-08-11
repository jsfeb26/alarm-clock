(function (window) {
  'use strict';

  // Get element(s) by CSS selector:
  window.qs = (selector, scope) => (scope || document).querySelector(selector);

  // addEventListener wrapper:
  window.$on = (target, type, callback, useCapture) => {
    target.addEventListener(type, callback, !!useCapture);
  };
})(window);
