(function (window) {
  'use strict';

  const AM = 'am';
  const PM = 'pm';
  const ALARM_TYPE = 'alarm';
  const TIME_TYPE = 'time';

  function Store() {
    this.localStorage = {
      timeHour: 12,
      timeMinute: 0,
      timePeriod: AM,
      alarmHour: 12,
      alarmMinute: 0,
      alarmPeriod: AM,
      isAlarmAlert: false,
      isSetAlarm: false,
      isAlarmOn: false,
      isSnoozed: false // store this as 10 when it's zero it's off
    };
  };

  Store.prototype.getState = function() {
    const type = this.localStorage.isSetAlarm ? 'alarm' : 'time';

    const minuteValue = this.localStorage[`${type}Minute`];
    const minuteDisplay = minuteValue < 10 ? `0${minuteValue}` : minuteValue;

    return {
      time: `${this.localStorage[`${type}Hour`]}:${minuteDisplay}`,
      period: this.localStorage[`${type}Period`],
      isAlarmAlert: this.localStorage.isAlarmAlert,
      isSetAlarm: this.localStorage.isSetAlarm,
      isAlarmOn: this.localStorage.isAlarmOn
    };
  };

  Store.prototype.updateAlarmAlertStatus = function() {
    const _store = this.localStorage;

    if (
      _store.timeHour === _store.alarmHour &&
      _store.timeMinute === _store.alarmMinute &&
      _store.timePeriod === _store.alarmPeriod &&
      _store.isAlarmOn
    ) {
      _store.isAlarmAlert = true;
    }
  };

  Store.prototype.incrementTime = function(type) {
    const _store = this.localStorage;

    if (!type) {
      type = _store.isSetAlarm ? 'alarm' : 'time';
    }

    _store[`${type}Minute`]++;

    if (_store[`${type}Minute`] === 60) {
      _store[`${type}Minute`] = 0;
      _store[`${type}Hour`]++;
    }

    if (_store[`${type}Hour`] === 12 && _store[`${type}Minute`] === 0) {
      _store[`${type}Period`] = _store[`${type}Period`] === AM ? PM : AM;
    }

    if (_store[`${type}Hour`] === 13) {
      _store[`${type}Hour`] = 1;
    }

    this.updateAlarmAlertStatus();
  };

  Store.prototype.decrementTime = function(type) {
    const _store = this.localStorage;

    if (!type) {
      type = _store.isSetAlarm ? 'alarm' : 'time';
    }

    _store[`${type}Minute`]--;

    if (_store[`${type}Minute`] === -1) {
      _store[`${type}Minute`] = 59;
      _store[`${type}Hour`]--;
    }

    if (_store[`${type}Hour`] === 0 || (_store[`${type}Hour`] === 11 && _store[`${type}Minute`] === 59)) {
      _store[`${type}Period`] = _store[`${type}Period`] === AM ? PM : AM;
    }

    if (_store[`${type}Hour`] === 0) {
      _store[`${type}Hour`] = 12;
    }

    this.updateAlarmAlertStatus();
  };

  Store.prototype.setAlarm = function() {
    this.localStorage.isSetAlarm = !this.localStorage.isSetAlarm;
  };

  Store.prototype.toggleAlarm = function() {
    this.localStorage.isAlarmOn = !this.localStorage.isAlarmOn;

    if (!this.localStorage.isAlarmOn) {
      // we turning off alarm then reset alarm alert and snooze
      this.localStorage.isAlarmAlert = false;
      this.localStorage.isSnoozed = false;
    }
  };

  Store.prototype.setAlarmAlert = function(isAlert) {
    this.localStorage.isAlarmAlert = isAlert;
  };

  window.app = window.app || {};
  window.app.Store = Store;
})(window);
