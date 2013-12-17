/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

"use strict";

var prefs = require('sdk/simple-prefs');
var micropilot = require('./micropilot');

const STUDY_ID = 'snoozetabs';
const UPLOAD_URL = 'https://snoozetabs.paas.allizom.org/data/' + STUDY_ID;

var study = micropilot.Micropilot(STUDY_ID);

var registerListener = debounce(function () {
  study.record({
    id: 'registration_attempted',
    ts: Date.now(),
  });
  study.ezupload({
    url: UPLOAD_URL //, simulate: true
  });
}, 1000);


exports.main = function () {
  study.start();

  // Your code here…

  prefs.on('register2', registerListener);
  registerListener();
  
};

exports.onUnload = function () {
  prefs.removeListener('register2', registerListener);
  
    // Your code here…
  
  study.ezupload({
    url: UPLOAD_URL //, simulate: true
  });

};