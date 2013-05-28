// ==UserScript==
// @name           Make UAH Banner timesheets bearable
// @description    Automatically focuses the "Hours" field
// @namespace      http://its.uah.edu/tag
// @author         Hunter Fuller (hf0002@uah.edu)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @homepage       http://its.uah.edu/tag
// @version        1
// @include        https://sierra.uah.edu:9021/PROD/bwpktetm.P_EnterTimeSheet?*
// @include        https://sierra.uah.edu:9021/PROD/bwpktetm.P_UpdateTimeSheet
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
//
// @history        1 first test version
// @history        2 testing automatically moving to next day
//
// ==/UserScript==

if (typeof String.prototype.endsWith !== 'function') {
    String.prototype.endsWith = function(suffix) {
        return this.indexOf(suffix, this.length - suffix.length) !== -1;
    };
}

document.getElementById("hours_id").focus();
//alert(window.location.search);
var form = document.getElementsByTagName("form")[1]
//if ( document.location.search == "" ) {
if ( window.location.pathname.endsWith("UpdateTimeSheet") ) {
	var current = document.getElementsByName("DateSelected")[0].value;
	var target = "" + (parseInt(current.substring(0,2)) + 1) + current.substring(2);
	var links = document.getElementsByClassName("fieldsmalltext");
	for ( var i = 0; i < links.length; i++ ) {
		if ( links[i].href.endsWith(target) ) {
			window.location = links[i].href;
			break;
		}
	}
}
