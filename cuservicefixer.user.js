// ==UserScript==
// @name        CUServiceFixer
// @author      Hunter Fuller <hf0002@uah.edu>
// @description Add support for the year 2021(?!) to Cisco Unity Connection reporting
// @version     1
// @updateURL   https://github.com/hfuller/uah-user-js/raw/master/cuservicefixer.user.js
// @downloadURL https://github.com/hfuller/uah-user-js/raw/master/cuservicefixer.user.js
// @namespace   https://github.com/hfuller/uah-user-js

// @grant       none
// @match       https://vbhunitypub.voip.uah.edu/cuservice/*

// @history     1 henlo
// ==/UserScript==

(function() {
    'use strict';

    console.log("CUServiceFixer " + GM.info.script.version);

    let stuff = document.getElementsByName("fromYear");
    let stuff2 = stuff[0].firstChild;
    stuff2.value = "2021"; stuff2.innerHTML = "2021";

    let things = document.getElementsByName("toYear");
    let things2 = things[0].firstChild;
    things2.value = "2021"; things2.innerHTML = "2021";

})();
