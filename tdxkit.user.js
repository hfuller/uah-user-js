// ==UserScript==
// @name        TDXKit
// @author      Hunter Fuller <hf0002@uah.edu>
// @description Adds some opinionated improvements to TeamDynamix
// @version     9
// @updateURL   https://github.com/hfuller/uah-user-js/raw/master/tdxkit.user.js
// @downloadURL https://github.com/hfuller/uah-user-js/raw/master/tdxkit.user.js
// @namespace   https://github.com/hfuller/uah-user-js

// @grant       none
// @include     https://*.teamdynamix.com/TDNext/*

// @history     9 Add Gonuts link to the requestor when we are looking at a ticket
// @history     8 Send us back to TicketDet after a successful Update
// @history     7 Remove all people from notifications when private box is checked
// @history     6 Don't patch openWin on edit windows so we can select services and customers.
// @history     5 Actually automatically add customer(s) to the Notify box this time
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

if ( ! document.location.href.includes("Edit?") ) {
    console.log("patching openWin");
    window.eval(`
        console.log("we are patching it");
        window.openWin = function(url, width, height, name, scrollbars){
            window.location = url;
        };
    `);
} else {
    console.log("Not patching openWin because we're on an edit window")
}

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
                let labelString = item.attributes['aria-label'].nodeValue;
                if ( labelString.includes("Requestor") || labelString.includes("Contact") ) {
                    console.log("that person gets included");
                } else {
                    console.log("removing that person");
                    toRemove.push(item);
                }
            }
            for ( let item of toRemove ) {
                item.click();
            }
        } else {
            console.log("They unchecked the box");
            for ( let item of document.getElementById("s2id_NotificationEmails").getElementsByTagName("a") ) {
                item.click();
            }
        }
    });
}

if ( document.location.href.includes("Update?") ) {
    if ( document.getElementsByClassName("alert-success").length > 0 ) {
        console.log("Ticket updated. Sending us back to the ticket.");
        document.location.href = document.location.href.replace("Update?", "TicketDet?");
    }
}

//UAH Specific stuff below this line.

//Add Gonuts link to the requestor section on tickets.
if ( document.location.href.includes("TicketDet?") ) {
    let els = document.getElementsByClassName("ellipsis");
    let description = "View in Gonuts";
    let uid = "";
    let link = "";
    if ( els.length >= 5 ) {
        uid = els[4].innerHTML.trim();
        link = "https://gonuts.uah.edu/?q=details:ldap:uid=" + uid + ",ou=People,dc=uah,dc=edu&ref=details&btnK=tdxkit";
    } else if ( els.length >= 1 ) {
        uid = els[0].children[0].innerHTML.replace(/@.*/, "");
        description = "Attempt to find in Gonuts";
        link = "https://gonuts.uah.edu/?q=" + uid + "&btnK=tdxkit";
    }

    let thing = document.createElement("a");

    thing.innerHTML = description;
    thing.href = link;
    thing.target = "_blank";
    thing.style.lineHeight = "28px";

    document.getElementsByClassName("media-body")[0].appendChild(thing);

}
