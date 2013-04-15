// ==UserScript==
// @name           Make UAH Banner timesheets bearable
// @description    Automatically focuses the "Hours" field
// @namespace      http://its.uah.edu/tag
// @author         Hunter Fuller (hf0002@uah.edu)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @homepage       http://its.uah.edu/tag
// @version        1
// @include        https://sierra.uah.edu:9021/PROD/bwpktetm.P_EnterTimeSheet?*
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
//
// @history        1 first test version
//
// ==/UserScript==


//And of course your code!!
document.getElementById("hours_id").focus();