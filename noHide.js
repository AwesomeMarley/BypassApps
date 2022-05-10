javascript: (function() {

  var style = document.createElement('style');
  style.innerHTML = `  
html, body {
  height: 100%;
  width: 100%;
  overflow: hidden;
}
w
:root{
  --Main-bg: #f7f7f7;
  --Main-border: #cfced0;
  --Main-txt-color: #5b5a5b;
}

.message-window{
  position: fixed;
  top:0px;
  left:0px;
}

.Base{
  position: fixed;
  top: 50px;
  left: 0px;
  width: 600px;
  height: 500px;
  z-index: 50000;
  background-color: var(--Main-bg);
  border: 2px solid var(--Main-border);
  border-radius: 20px;
}


.iframe{
  margin-bottom: -486px;
  border: none;
  width: 600px;
  height: 460px;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
}

.TopBtn{
  position: absolute;
  top: 2vh;
  left: 10px;
  z-index: 200000;
  height: 13px;
  width: 13px;
  border-radius: 50%;
  cursor: pointer;
}


.TitleTxt{
  margin-top: 35px;
  font-size: 20px;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  color: var(--Main-txt-color);
}

.flex-container {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-content: center;
    align-items: center;
}

.resize {
  position: fixed;
  bottom: 2px;
  left: 2px;
  z-index: 20000;
  height: 13px;
  width: 13px;
  border-radius: 50%;
  cursor: pointer;
  background-color: #14cd34; 
  border: 1px solid #26a23b;
display: none;
}


.notify {
  position: fixed;
  overflow: hidden;
  right: -200px;
  bottom: 10px;
  border: 2px solid;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  display: flex;
  padding: 20px;
  background-color: var(--Main-bg);
  max-width: 250px;
  max-height: 150px;
  cursor: pointer;
}

.notify-user {
  color: var(--Main-txt-color);
  font-weight: bold
font-family: monospace;
font-size: 18px;
  
}

.notify-msg {
  padding: 3px;
  color: var(--Main-txt-color);
font-family: -apple-system, BlinkMacSystemFont, sans-serif;
}
`;
  document.head.appendChild(style);



  var properHTML = `  
<section class="message-window">


<script type="module">
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";

  const firebaseConfig = {
    apiKey: "AIzaSyBa4dZafE7gyHwCXWvWqSVHJOEFbyzxBzc",
    authDomain: "replit-test-82294.firebaseapp.com",
    databaseURL: "https://replit-test-82294-default-rtdb.firebaseio.com",
    projectId: "replit-test-82294",
    storageBucket: "replit-test-82294.appspot.com",
    messagingSenderId: "518322767228",
    appId: "1:518322767228:web:22ccdf8b7d45a42e0710f9"
  };

  const app = initializeApp(firebaseConfig);
</script>

<body class="flex-container">

<div class="Base" id="base">
  <div class="iframe">
      <iframe src="https://simpleChat-dev.awesomemarley.repl.co" class="iframe"></iframe>
  </div>
        <b class="flex-container TitleTxt">Bypass Chat</b>
          <div class="TopBtn" style="background-color: #fe5f52; border: 1px solid #cf4135;" id="Red"></div>
          <div class="TopBtn" style="background-color: #febf05; border: 1px solid #cc991a; left: 35px;" id="Yellow"></div>
          <div class="TopBtn" style="background-color: #14cd34; border: 1px solid #26a23b; left: 60px;" id="Green"></div>
</div>
  <div class="resize"></div>
  <div class="notify" id="notify">
    <div class="notify-user" id="notify-user"></div>
    <div class="notify-msg" id="notify-msg"></div>
  </div>

</body>

</section>
      `;
  document.body.insertAdjacentHTML("beforeend", properHTML);

  var firebaseAppScript = document.createElement('script');
  firebaseAppScript.src = 'https://www.gstatic.com/firebasejs/5.3.0/firebase-app.js';
  firebaseAppScript.onload = loadDatabase;
  document.body.appendChild(firebaseAppScript);

  function loadDatabase() {
    var firebaseDatabaseScript = document.createElement('script');
    firebaseDatabaseScript.src = 'https://www.gstatic.com/firebasejs/5.3.0/firebase-database.js';
    firebaseDatabaseScript.onload = loadScripts;
    document.body.appendChild(firebaseDatabaseScript);
  }


  function loadScripts() {

    var script_jQuery = document.createElement('script');
    script_jQuery.src = 'https://code.jquery.com/jquery-latest.min.js';
    script_jQuery.onload = loadUI;
    document.body.appendChild(script_jQuery);

  }

  function loadUI() {
    var script_jQueryUI = document.createElement('script');
    script_jQueryUI.src = 'https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js';
    script_jQueryUI.onload = loadScript;
    document.body.appendChild(script_jQueryUI);
  }

  


  var minimize = false;
  var start = 0;
  var x = 0;
  var y = 0;


  function loadScript() {

$(document).ready(function() {
      $(".notify").hide();



      var config = {
        apiKey: "AIzaSyBa4dZafE7gyHwCXWvWqSVHJOEFbyzxBzc",
        authDomain: "replit-test-82294.firebaseapp.com",
        databaseURL: "https://replit-test-82294-default-rtdb.firebaseio.com",
        projectId: "replit-test-82294",
        storageBucket: "replit-test-82294.appspot.com",
        messagingSenderId: "518322767228",
        appId: "1:518322767228:web:22ccdf8b7d45a42e0710f9"
      };
      firebase.initializeApp(config);


      let messageData = firebase.database().ref("/Messages");

      messageData.limitToLast(1).on('child_added', function(message) {
        start++;
        if (start > 1) {
          if (minimize) {
            appendMessage(message.val().user, message.val().msg);
          }
        }
      });

      function appendMessage(user, msg) {
        document.getElementById("notify-user").innerHTML = user+":";
        document.getElementById("notify-msg").innerHTML = msg;
        $(".notify").fadeIn({queue: false, duration: 400});
        $(".notify").animate({
          right: "0px"
        }, 600);
        setTimeout(function() {
          $(".notify").fadeOut({queue: false, duration: 400});
          $(".notify").animate({
            right: "-200px"
          }, 600);
        }, 1400);
      }


      $("#Red").click(function() {
        if (confirm("This will eject BypassChat, are you sure you want to do this?")) {
          $(".message-window").remove();
        }
      });

      $("#Yellow").click(function() {
        var position = document.getElementById("base").getBoundingClientRect();
        x = position.left;
        y = position.top;
        /*.css({'position': 'relative'})*/
        $(".Base").fadeOut({ queue: false, duration: 500 }).animate({ top: '100vh', left: '0px', height: '0', width: '0' }, 400);
        $(".resize").fadeIn();
        console.log(x + ":" + y);
        minimize = true;
      });

      $(".resize, .notify").click(function() {
        console.log(x + ":" + y);
        /*.css({'position': 'fixed'})*/

        $(".Base").fadeIn({ queue: false, duration: 500 }).animate({ top: '50px', left: '0', height: '500', width: '600' }, 400);
        $(".resize").fadeOut();
        minimize = false;
      });

      $(".Base").draggable({
        cursor: "move"
      });

    });


  }


})()