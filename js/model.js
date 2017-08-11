(function (window) {
  'use strict';

  function Model(store) {
    this.store = store;
  };

  Model.prototype.getState = function() {
    return this.store.getState();
  };

  Model.prototype.incrementTime = function(type) {
    return this.store.incrementTime(type);
  };

  Model.prototype.decrementTime = function(type) {
    return this.store.decrementTime(type);
  };

  Model.prototype.setAlarm = function() {
    return this.store.setAlarm();
  };

  Model.prototype.toggleAlarm = function() {
    return this.store.toggleAlarm();
  };

  Model.prototype.setAlarmAlert = function(isAlert) {
    return this.store.setAlarmAlert(isAlert);
  };

  window.app = window.app || {};
  window.app.Model = Model;
})(window);
