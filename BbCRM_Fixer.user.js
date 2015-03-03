// ==UserScript==
// @name        BbCRM Fixer
// @namespace   http://hf0002.uah.edu/
// @description Automatically logs you into the Blackboard CRM.
// @include     https://bbcrm.edusupportcenter.com/ics/service/login.asp
// @include     https://bbcrm.edusupportcenter.com/ics/tt/ticketDetail.asp?ticket*
// @include     https://bbcrm.edusupportcenter.com/ics/service/top.asp*
// @version     1
// @history     1 Initial release; autologin, frame-busting, and an easter egg courtesy of Bb
// @grant       none
// ==/UserScript==

console.log("Welcome to " + document.location.href);

if ( document.location.href.indexOf("login.asp") > -1 ) {
  var doLogin = false;
  if ( document.getElementById("msg").childNodes.length <= 1 ) {
    doLogin = true;
    console.log("There's no error.");
  } else { 
    console.log("There's an error being shown: "); 
    er = document.getElementsByClassName("error");
    console.log(er[0].innerHTML);
    if ( er.length > 0 && er[0].innerHTML.indexOf("you have been logged out") > -1 ) {
      //well, there's an error, but it's just an inactivity timeout
      doLogin = true;
      console.log("We do the login anyway.");
    }
  }

  if ( doLogin ) {
    //flashy stuff
    document.getElementById("msg").innerHTML = "You are using Hunter Fuller's BbCRM script.";
    
    setTimeout(function() {
      if ( document.getElementsByName("password")[0].value.length > 0 ) { //if a password has been filled
        //flashy stuff
        document.getElementById("signin").innerHTML = "Please wait. Signing you in.";
        document.getElementById("signin").disabled = false;
        
        document.getElementById("signin").click();
        
        //more flashy stuff and/or keep user from clobbering self
        document.getElementById("signin").disabled = true;
        document.getElementsByName("email")[0].disabled = true;
        document.getElementsByName("password")[0].disabled = true;
      }
    }, 1000); //give the password manager some time, then click submit
  }
} else if ( document.location.href.indexOf("ticketDetail.asp") > -1 ) {
  console.log("Am I stuck in a frame?");
  //frame bust!
  if (window.top.location.href.indexOf("ticketDetail.asp") <= -1 ) {
    console.log("Yes!");
    console.log("Is it because you just logged in?");
    if ( window.top.location.href.indexOf("loginSQL.asp") > -1 ) {
      console.log("Yes.");
      window.top.history.pushState({},"BbCRM",window.top.location.href);
      window.top.location = self.location;
    }
  }
} else if ( document.location.href.indexOf("top.asp") > -1 ) {
  //put cool ticket count widget
  x = document.getElementsByClassName("realtime")[0];
  x.innerHTML = '<iframe id="frmChatWidget" name="frmChatWidget" frameborder="0" scrolling="no" src="/ics/csrchat/Widget.aspx" width="50" height="30" style="overflow: hidden" allowtransparency="true"></iframe>';
  
  //add script notice
  y = x.parentElement.insertCell(0);
  y.innerHTML = "with&nbsp;hf0002's&nbsp;Script&nbsp;"
  y.style = "border-right:10px solid #303030; color:white;";
  
}