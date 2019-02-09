// ==UserScript==
// @name        TDXKit
// @description Adds some opinionated improvements to TeamDynamix
// @version     2
// @updateURL   https://github.com/hfuller/uah-user-js/raw/master/tdxkit.user.js
// @downloadURL https://github.com/hfuller/uah-user-js/raw/master/tdxkit.user.js
// @namespace   https://github.com/hfuller/uah-user-js

// @grant       none
// @include     https://*.teamdynamix.com/TDNext/*
// ==/UserScript==

console.log("TDXKit loaded, adding indicator.");
let elTabs = document.getElementById("tabsList");
if ( elTabs !== null ) {
  let thing = document.createElement("a");
  thing.style.position = "absolute";
  thing.style.right = "16px";

  thing.innerHTML = "TDXKit " + GM.info.script.version;
  thing.title = "by Hunter Fuller (hf0002@uah.edu)"

  thing.href = "https://github.com/hfuller/uah-user-js";
  thing.target = "_blank";

  elTabs.appendChild(thing);
}

console.log("Adding prefix to window title");
document.title = "[TDX] " + document.title.replace("TeamDynamix ", "");

console.log("patching openWin");
window.eval(`
  console.log("Test");
	window.openWin = function(url, width, height, name, scrollbars){
		window.location = url;
	};
`);

console.log("fixing links");
for ( let a of document.getElementsByTagName('a') ) {
  if ( a.href.includes("openWin(") ) {
    try {
      let newHref = eval(
        a.href.split("(")[1].split(',')[0]
      );
      a.href = newHref;
    } catch(error) {
      console.log("Couldn't fixup " + a.innerHTML + " " + a.href);
    }
  }
}
