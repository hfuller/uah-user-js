// ==UserScript==
// @name         HealthCheck Fixer
// @namespace    https://github.com/hfuller/uah-user-js
// @version      1
// @description  Don't ask me for my phone number
// @author       Hunter Fuller <hf0002@uah.edu>
// @updateURL    https://github.com/hfuller/uah-user-js/raw/master/HealthCheck_Fixer.user.js
// @downloadURL  https://github.com/hfuller/uah-user-js/raw/master/HealthCheck_Fixer.user.js

// @include      https://healthcheck.staysafetogether.org/40?*
// @grant        none

// @history      2 Check whether the page is displayed and skip it only then
// @history      1 When asked for my phone number, just click next.

// ==/UserScript==

(function() {
    'use strict';

    window.setInterval(function() {
        if ( document.getElementById("tfa_1-L").innerHTML.includes("What is your phone number") && document.getElementById("wfPgIndex-1").classList.contains("wfCurrentPage") ) {
            //page 1 contains the text and we are on page 1
            document.getElementById("wfPageNextId1").click();
        }
    }, 1000);
})();
