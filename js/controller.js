(function (window) {
  'use strict';

  const SNOOZE_TIME_MINUTES = 1;

  function Controller(model, view) {
    const self = this;
    self.model = model;
    self.view = view;
    self.snoozeFunc = null;
    self.state = {
      time: null,
      period: null,
      isAlarmAlert: null,
      isSetAlarm: null,
      isAlarmOn: null
    };

    self.view.bind('incrementTime', function () {
      self.incrementTime();
    });

    self.view.bind('decrementTime', function () {
      self.decrementTime();
    });

    self.view.bind('setAlarm', function () {
      self.setAlarm();
    });

    self.view.bind('toggleAlarm', function () {
      self.toggleAlarm();
    });

    self.view.bind('snoozeAlarm', function () {
      self.snoozeAlarm();
    });
  };

  Controller.prototype.init = function () {
    const self = this;
    self.render();

    setInterval(() => {
      self.model.incrementTime('time'); // always increment time
      self.render();
    }, 60000);
  };

  Controller.prototype.render = function () {
    const self = this;

    const state = self.state;
    const newState = self.model.getState();

    // only re-render if state has changed
    if (newState.time !== state.time || newState.period !== state.period) {
      state.time = newState.time;
      state.time = newState.period;
      self.view.render('setTime', { time: newState.time, period: newState.period });
    }

    if (newState.isAlarmAlert !== state.isAlarmAlert) {
      state.isAlarmAlert = newState.isAlarmAlert;
      self.view.render('setIsAlarmAlert', { isAlarmAlert: newState.isAlarmAlert });
    }

    if (newState.isSetAlarm !== state.isSetAlarm) {
      state.isSetAlarm = newState.isSetAlarm;
      self.view.render('setIsSetAlarm', { isSetAlarm: newState.isSetAlarm });
    }

    if (newState.isAlarmOn !== state.isAlarmOn) {
      state.isAlarmOn = newState.isAlarmOn;
      self.view.render('setIsAlarmOn', { isAlarmOn: newState.isAlarmOn });
    }
  };

  Controller.prototype.incrementTime = function() {
    const self = this;

    self.model.incrementTime();
    self.render();
  };

  Controller.prototype.decrementTime = function() {
    const self = this;

    self.model.decrementTime();
    self.render();
  };

  Controller.prototype.setAlarm = function() {
    const self = this;

    self.model.setAlarm();
    self.render();
  };

  Controller.prototype.toggleAlarm = function() {
    const self = this;

    // if alarm is currently on (which means we're turing it off)
    // and snoozeFunc exists then we want to clear it out
    if (self.state.isAlarmOn && self.snoozeFunc) {
      clearTimeout(self.snoozeFunc);
    }

    self.model.toggleAlarm();
    self.render();
  };

  Controller.prototype.snoozeAlarm = function() {
    const self = this;

    // only snooze if alarm is alerting
    if (self.state.isAlarmAlert) {
      self.model.setAlarmAlert(false);
      self.render();

      self.snoozeFunc = setTimeout(() => {
        self.model.setAlarmAlert(true)
        self.render();
      }, SNOOZE_TIME_MINUTES * 60 * 1000);
    }
  };

  window.app = window.app || {};
  window.app.Controller = Controller;
})(window);
