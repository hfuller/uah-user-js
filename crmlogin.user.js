// ==UserScript==
// @name           Make UAH ITS CRM login better
// @description    In Chrome you only have to hit return once. Also there is a loading indicator.
// @namespace      http://its.uah.edu/tag
// @author         Hunter Fuller (hf0002@uah.edu)
// @license        GNU GPL v3 (http://www.gnu.org/copyleft/gpl.html) 
// @homepage       http://its.uah.edu/tag
// @version        1
// @include        https://crm.uah.edu/Scripts/texcel/ServiceWise/Servicewise.dll
//
// @require        https://ajax.googleapis.com/ajax/libs/jquery/1.6.0/jquery.min.js
//
// @history        1 first test version
//
// ==/UserScript==


//And of course your code!!
document.getElementsByName("form1")[0].action = 'javascript:document.form1.Username.value = document.form0.Username.value;document.form1.action = js_AppName + "?Login"; document.form1.method = "post"; document.getElementsByTagName("img")[0].src = "http://i.imgur.com/r1ym7Op.gif"; setTimeout(function(){document.form1.submit();},1000);';
