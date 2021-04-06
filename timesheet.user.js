// ==UserScript==
// @name           [UAH] Make SSB timesheets bearable
// @description    Automatically focuses the "Hours" field, and moves you to the next day on a timesheet
// @namespace      http://hf0002.uah.edu/
// @author         Hunter Fuller (hf0002@uah.edu)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html)
// @include        https://ssbprod.uah.edu:9021/PROD/bwpktetm.P_EnterTimeSheet?*
// @include        https://ssbprod.uah.edu:9021/PROD/bwpktetm.P_UpdateTimeSheet
// @include        https://ssbprod.uah.edu:9021/PROD/bwpktetm.P_TimeSheetButtonsDriver
// @include        https://ssbprod.uah.edu/PROD/bwpktetm.P_EnterTimeSheet?*
// @include        https://ssbprod.uah.edu/PROD/bwpktetm.P_UpdateTimeSheet
// @include        https://ssbprod.uah.edu/PROD/bwpktetm.P_TimeSheetButtonsDriver
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
//
// @version        12
// @history        12 Add includes for ssbprod URLs without port numbers
// @history        11 Replace sierra with ssbprod
// @history        10 Don't index arbitrary amounts into the links; Don't skip to the next earn code
// @history        9 cleanup
// @history        8 added reminder that the script is loaded
// @history        7 disable the hours field while we are doing magic
// @history        6 Scroll down to bottom of page
// @history        5 Fix bug where the field is not focused after Next is clicked
// @history        4 automatically click Next
// @history        3 handle the end of the month correctly
// @history        2 automatically moving to next day
// @history        1 first test version
//
// ==/UserScript==

//add a notice that you are using this script
document.getElementsByClassName("dataentrytable")[0].innerHTML += "<tr><td></td><td>Reminder: You are using Hunter Fuller's script to automate entry of hours.</td></tr>";

//don't think we're using this anymore but I'll leave it for now
if (typeof String.prototype.endsWith !== 'function') {
    console.log("Fixing up endsWith");
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

//scroll down all the way
window.scrollTo(0, document.body.scrollHeight);

//var form = document.getElementsByTagName("form")[1]
if ( window.location.pathname.endsWith("UpdateTimeSheet") ) { //the user just submitted a timesheet change

	//disable the hours field while we do stuff
	document.getElementById("hours_id").disabled = true;

	var currentDate = document.getElementsByName("DateSelected")[0].value; //current date, like 31-MAY-2013
    var currentEarnCode = document.getElementsByName("EarnCode")[0].value; //current earn code ID, like 180 is sick leave
    console.log("Current stuff is: " + currentEarnCode + " " + currentDate);

	var links = document.getElementsByTagName("A"); //find all the links

	for ( var i = 0; i < links.length; i++ ) {
        if ( (links[i].href.indexOf("DateSelected=" + currentDate) != -1) && (links[i].href.indexOf("EarnCode=" + currentEarnCode) != -1) ) { //if the current date and current earn code are both present in that link
            console.log("found today's link");
            console.log(links[i]);
			//we found the current day's link. if there is another one after it, then click it
			if ( links.length >= i+1 ) { //if there are links left on the page
				//well, there are more links, but we need to check if this one is at the end of the row. if it is, we will stop and click Next instead
				//alert(i);
				//if ( (i-10) % 7 == 0 ) { //if we're at a link number of multiple of 7 (the 7th or 14th or [...] link) - we subtract the first 10 links on the page
                if ( links[i+1].href.indexOf("EarnCode=" + currentEarnCode) == -1 ) { //if the next link has a different earn code (i.e., it's on the next row)
					//then we click Next
					var buttons = document.getElementsByName("ButtonSelected");
					var nextClicked = false;
					for ( var j = 0; j < buttons.length; j++ ) {
						if ( buttons[j].value == "Next" ) {
							buttons[j].click();
							nextClicked = true;
							break;
						}
					}
					if ( !nextClicked ) {
						//there was no Next button, so the user is finished filling out the sheet
						alert("You are done filling out this timesheet. Check it out to make sure it's okay, and then click Submit for Approval.");
					}
				} else {
					//otherwise we click the link after today's.
					console.log("About to click:");
                    console.log(links[i+1]);
                    window.location = links[i+1].href;
				}
			}
			break;
		}
	}
} else { //the user is ready to enter hours
	//focus the hours field, for real though
	document.getElementById("hours_id").focus();
}

