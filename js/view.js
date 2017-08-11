(function (window) {
	'use strict';

  function View() {
    this.$alarm = qs('.alarm-body');
    this.$timeDisplay = qs('.time-display');
    this.$time = qs('.time');
    this.$period = qs('.period');
    this.$incrementTime = qs('.increment-time');
    this.$decrementTime = qs('.decrement-time');
    this.$setAlarm = qs('.set-alarm');
    this.$toggleAlarm = qs('.alarm-toggle input[type=checkbox]');
    this.$snooze = qs('.snooze');
  }

  View.prototype.render = function (viewCmd, parameter) {
    var self = this;

    var viewCommands = {
      setTime: function() {
        const { time, period } = parameter;

        self.$time.innerHTML = time;
        self.$period.innerHTML = period;
      },
      setIsAlarmAlert: () => {
        if (parameter.isAlarmAlert) {
          self.$alarm.classList.add('alarm-alert');
        } else {
          self.$alarm.classList.remove('alarm-alert');
        }
      },
      setIsSetAlarm: () => {
        if (parameter.isSetAlarm) {
          self.$timeDisplay.classList.add('setting-alarm');
        } else {
          self.$timeDisplay.classList.remove('setting-alarm');
        }
      },
      setIsAlarmOn: () => {
        self.$toggleAlarm.checked = parameter.isAlarmOn;
      }
    };

    viewCommands[viewCmd]();
  };

  View.prototype.bind = function (event, handler) {
    const self = this;

    if (event === 'incrementTime') {
      $on(self.$incrementTime, 'click', function () {
        handler();
      });
    } else if (event === 'decrementTime') {
      $on(self.$decrementTime, 'click', function () {
        handler();
      });
    } else if (event === 'setAlarm') {
      $on(self.$setAlarm, 'click', function () {
        handler();
      });
    } else if (event === 'toggleAlarm') {
      $on(self.$toggleAlarm, 'change', function () {
        handler();
      });
    } else if (event === 'snoozeAlarm') {
      $on(self.$snooze, 'click', function () {
        handler();
      });
    }
  };

  window.app = window.app || {};
  window.app.View = View;
}(window));
