// ==UserScript==
// @name        [ITS] ANGEL fixes
// @namespace   http://its.uah.edu/
// @description Fix some minor ANGEL annoyances.
// @include     https://angel.uah.edu/Section/Assessment/*
// @include		https://angel.uah.edu/default.asp*
// @include		https://angel.uah.edu/home.asp*
// @version		2
// @history 	2 added reminder
// @history		1 initial version
// ==/UserScript==

//add reminder that the script is loaded
var elements = document.getElementsByTagName("font");
elements[0].innerHTML = "<strong>Reminder:</strong> You are using Hunter Fuller's ANGEL script.";

/*
///// Make the Assessment timer not cover-up part of the exam material /////
//kinda unnecessary just because making it less tall fixes the problem
var el = document.getElementById("CountdownTicker");
//position:relative; float:right;
el.style.cssFloat = "right";
el.style.position = "relative";
*/
///// Disable the 'legend' on the Assessment timer /////
var el2 = document.getElementsByTagName("legend")[0];
el2.style.display = "none";
