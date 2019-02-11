// ==UserScript==
// @name        TDXKit
// @author      Hunter Fuller <hf0002@uah.edu>
// @description Adds some opinionated improvements to TeamDynamix
// @version     4
// @updateURL   https://github.com/hfuller/uah-user-js/raw/master/tdxkit.user.js
// @downloadURL https://github.com/hfuller/uah-user-js/raw/master/tdxkit.user.js
// @namespace   https://github.com/hfuller/uah-user-js

// @grant       none
// @include     https://*.teamdynamix.com/TDNext/*

// @history     4 (Try to) add the customer(s) to the Notify box when we uncheck the Private box
// @history     3 If TDX pops a window using a ToUrl deep link (post-login), close it and go there in-window instead
// @history     2 Replace all links that just run openWin() with direct links
// @history     1 Patch openWin to not actually open a window
// ==/UserScript==

console.log("TDXKit loaded.");
let elTabs = document.getElementById("tabsList");
if ( elTabs !== null ) {
  console.log("Adding indicator.");
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

if ( document.referrer.includes("ToUrl=") ) {
    console.log("This is a ToUrl window. Closing the window and moving its contents here.");
    let popup = window.open("", "_NewWindow"); //magic string TDX opens windows with
    //let dest = popup.location.href;
    popup.close();
    let thing = document.referrer.split("?ToUrl=");
    let dest = decodeURIComponent(thing[1]);
    window.location = dest;
}

let cbCommentsIsPrivate = document.getElementById("CommentsIsPrivate");
if ( cbCommentsIsPrivate !== null ) {
    console.log("Adding handler for private check box");
    cbCommentsIsPrivate.addEventListener('change', function(e) {
        if ( ! e.target.checked ) {
            console.log("They unchecked the box!!!");
            document.getElementsByClassName("js-select-all")[0].click();
            //now everyone is added, let's remove anyone that doesn't meet our criteria
            let list = document.getElementById("s2id_NotificationEmails").getElementsByTagName("a");
            //we actually have a list of the X buttons, which have no labels other than ARIA labels.
            //but they're what we need to click to remove the item.
            let toRemove = [];
            for ( let item of list ) {
                console.log(item.attributes['aria-label']);
                if ( item.attributes['aria-label'].toString().includes("Requestor") || item.attributes['aria-label'].toString().includes("Contact") ) {
                    console.log("that person gets included");
                } else {
                    console.log("removing that person");
                    toRemove.push(item);
                }
            }
            for ( let item of toRemove ) {
                item.click();
            }
        }
    });
}
