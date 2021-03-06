/*global app, $on */
(function () {
  'use strict';

  function Alarm() {
    this.storage = new app.Store();
    this.model = new app.Model(this.storage);
    this.view = new app.View();
    this.controller = new app.Controller(this.model, this.view);
  }

  const alarm = new Alarm();
  function render() {
    alarm.controller.init();
  }

  $on(window, 'load', render);
})();
