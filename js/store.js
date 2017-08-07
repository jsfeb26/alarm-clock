(function (window) {
  'use strict';

  function Store() {
    const localStorage = {
      timeHour: 12,
      timeMinute: 0,
      timeAfternoon: false,
      mode: 'NONE',
      larmOn: false,
      larmTimeHour: 12,
      larmTimeMinute: 0,
      alarmTimeAfternoon: false,
      snooze: false
    };
  }

  Store.prototype.incrementTime = function () {
    localStorage.timeMinute++;

    if (timeMinute === 60) {
      localStorage.timeMinute = 0;
      localStorage.timeHour++;
    }

    if (localStorage.timeHour === 13) {
      localStorage.timeHour = 1;
      localStorage.timeAfternoon = !localStorage.timeAfternoon;
    }
	};

	// /**
	//  * Will retrieve all data from the collection
	//  *
	//  * @param {function} callback The callback to fire upon retrieving data
	//  */
	// Store.prototype.findAll = function (callback) {
	// 	callback = callback || function () {};
	// 	callback.call(this, JSON.parse(localStorage[this._dbName]).todos);
	// };
  //
	// /**
	//  * Will save the given data to the DB. If no item exists it will create a new
	//  * item, otherwise it'll simply update an existing item's properties
	//  *
	//  * @param {object} updateData The data to save back into the DB
	//  * @param {function} callback The callback to fire after saving
	//  * @param {number} id An optional param to enter an ID of an item to update
	//  */
	// Store.prototype.save = function (updateData, callback, id) {
	// 	var data = JSON.parse(localStorage[this._dbName]);
	// 	var todos = data.todos;
  //
	// 	callback = callback || function () {};
  //
	// 	// If an ID was actually given, find the item and update each property
	// 	if (id) {
	// 		for (var i = 0; i < todos.length; i++) {
	// 			if (todos[i].id === id) {
	// 				for (var key in updateData) {
	// 					todos[i][key] = updateData[key];
	// 				}
	// 				break;
	// 			}
	// 		}
  //
	// 		localStorage[this._dbName] = JSON.stringify(data);
	// 		callback.call(this, todos);
	// 	} else {
	// 		// Generate an ID
	// 		updateData.id = new Date().getTime();
  //
	// 		todos.push(updateData);
	// 		localStorage[this._dbName] = JSON.stringify(data);
	// 		callback.call(this, [updateData]);
	// 	}
	// };
  //
	// /**
	//  * Will remove an item from the Store based on its ID
	//  *
	//  * @param {number} id The ID of the item you want to remove
	//  * @param {function} callback The callback to fire after saving
	//  */
	// Store.prototype.remove = function (id, callback) {
	// 	var data = JSON.parse(localStorage[this._dbName]);
	// 	var todos = data.todos;
  //
	// 	for (var i = 0; i < todos.length; i++) {
	// 		if (todos[i].id == id) {
	// 			todos.splice(i, 1);
	// 			break;
	// 		}
	// 	}
  //
	// 	localStorage[this._dbName] = JSON.stringify(data);
	// 	callback.call(this, todos);
	// };
  //
	// /**
	//  * Will drop all storage and start fresh
	//  *
	//  * @param {function} callback The callback to fire after dropping the data
	//  */
	// Store.prototype.drop = function (callback) {
	// 	var data = {todos: []};
	// 	localStorage[this._dbName] = JSON.stringify(data);
	// 	callback.call(this, data.todos);
	// };

  window.app = window.app || {};
  window.app.Store = Store;
})(window);
