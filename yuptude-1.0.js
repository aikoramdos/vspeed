
var s = 1.0;
var p = false;
var videos;
var v;
var inputval;
var ytw = document.createElement("div");
ytw.innerHTML = '<style id="yptd-style">\
#yptd {  z-index: 9999999999;  position: fixed;  bottom: 0;  left: 6px;  font: 16px Helvetica, Arial, sans-serif;  -webkit-text-size-adjust: 100%;  -ms-text-size-adjust: 100%;  opacity: 0.3;}#yptd * {  margin: 0;}#yptd:focus {  opacity: 0.7;}#yptd a {  border-radius: 5px;  -moz-border-radius: 5px;  -webkit-border-radius: 5px;  float: left;  margin: 0 0.5em 0 0;  padding: 0.25em 1.0em;  font-weight: bold;  color: #fff;  background-color: #00f;}#yptd a em {  font-size: 0.90em;it}#yptd a:hover,#yptd a:focus,#yptd a:active {  outline: 0;  color: #00f;  background-color: #fff;  text-decoration: none;}#yptd span {  border-radius: 3px;  -moz-border-radius: 3px;  -webkit-border-radius: 3px;  -moz-box-sizing: border-box;  -webkit-box-sizing: border-box;  box-sizing: border-box;  float: left;  display: block;  margin: 0.5em;  padding: 0em 0.5em;  width: 2.5em;  border-bottom: 2px solid rgba(0, 0, 0, 0.25);  text-decoration: none;  color: #000;  background-color: #FFF;  cursor: pointer;  text-align: center;}#yptd span em {  font-size: 0.75em;  vertical-align: middle;}#yptd span:hover,#yptd span:focus,#yptd span:active {  color: #33f;}#yptd-bar {  border-radius: 3px 3px 0 0;  -moz-border-radius: 3px 3px 0 0;  -webkit-border-radius: 3px 3px 0 0;  height: 2.25em;  background-color: #33f;}#yptd-bar:after {  content: "";  display: block;  clear: both;}#yptd-controls {  float: right;  height: 2.25em;  border-left: 2px solid rgba(0, 0, 0, 0.33);}#yptd-box {  -moz-box-sizing: border-box;  -webkit-box-sizing: border-box;  box-sizing: border-box;  display: block;  float: left;  width: 4.0em;  min-width: 4.0em;  padding: 0 0.5em;  height: 100%;  background-color: rgba(0, 0, 0, 0.15);}#yptd-in {  width: 100%;  height: 100%;  border: 0;  text-align: center;  vertical-align: middle;  font: 14px Helvetica, Arial, sans-serif;  font-family: Helvetica, Arial, sans-serif;  font-size: 14px;  color: #FFF;  background-color: transparent;}#yptd-bottom {  padding: 0.75em;  font-size: 0.75em;  vertical-align: middle;  background-color: rgba(0, 0, 0, 0.8);}#yptd-bottom:after {  content: "";  display: block;  clear: both;}#yptd-pit {  position: relative;  float: right;  padding: 0.25em 0;}#yptd-pit label {  margin-right: 0.5em;  color: #FFF;}#yptd-pit em {  display: none;}#yptd-pit input {  float: right;}#yptd-pit:hover em,#yptd-pit:focus em,#yptd-pit:active em {  display: block;  position: absolute;  top: -2.5em;  left: 0;  padding: 0.5em;  white-space: pre;  font-size: 0.8em;  background-color: #33f;}\
            </style>\
        <div id="yptd"><div id="yptd-bar"><span id="yptd-off"><em>Off</em></span><div id="yptd-controls"><span id="yptd-dwn">-</span><div id="yptd-box"><input id="yptd-in" type="text" value="1.0"></div><span id="yptd-up">+</span></div></div><div id="yptd-bottom"><a href="https://aikopc.net/c/vspeed.html"><em>vspeed</em></a><div id="yptd-pit"><label for="yptd-pin"> Shift Pitch <em>(FirefoxとSafariでのみ動作)</em></label><input type="checkbox" name="yptd-pin" id="yptd-pin" value="1"></div></div></div>\
';
document.body.appendChild(ytw);

var ytw = dg("yptd");
var yts = dg("yptd-style");
var yti_in = dg("yptd-in");
var yti_off = dg("yptd-off");
var yti_pit = dg("yptd-pin");
var yti_up = dg("yptd-up");
var yti_dwn = dg("yptd-dwn");


function dg(ID) {
    return document.getElementById(ID);
}


yti_in.addEventListener("input", yte_in);
function yte_in() {
    s = dg("yptd-in").value;
}


yti_off.addEventListener("click", yte_off);
function yte_off() {
    yti_in.removeEventListener("input", yte_in);
    yti_off.removeEventListener("click", yte_off);
    yti_pit.removeEventListener("click", yte_pit);
    yti_up.removeEventListener("click", yte_up);
    yti_dwn.removeEventListener("click", yte_dwn);

    ytw.parentNode.removeChild(ytw);
    yts.parentNode.removeChild(yts);

    clearInterval(interval);
    
    s = 1;
    apply(1);
}


yti_pit.addEventListener("click", yte_pit);
function yte_pit() {
    p = dg("yptd-pin").checked;
}


yti_up.addEventListener("click", yte_up);
function yte_up() {
    inputval = document.getElementById("yptd-in").value;
    inputval = inputval ? parseFloat(inputval) : 1;
    inputval = inputval + 0.1;

    s = dg("yptd-in").value = inputval.toFixed(1);
}


yti_dwn.addEventListener("click", yte_dwn);
function yte_dwn() {
    inputval = dg("yptd-in").value;
    inputval = inputval ? parseFloat(inputval) : 1;
    inputval = (inputval >= 0.2 ? inputval - 0.1 : inputval);

    s = dg("yptd-in").value = inputval.toFixed(1);
}



var interval = setInterval(function() { apply() }, 100);

function apply(ns) {
    videos = document.querySelectorAll("video");
    for(var i = 0; i < videos.length; i++) {
        v = videos[i];
        if(v && v.readyState >= 2) {
            v.playbackRate = (ns || (s || 1));
            v.mozPreservesPitch = v.webkitPreservesPitch = v.preservePitch = !p;
        }
    }
}
