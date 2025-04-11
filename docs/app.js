// app.js
// job    : controls clock app actions
// git    : https://github.com/motetpaper/clock
// lic    : MIT

// the double dot clock separators
const dotdot = document.querySelectorAll('span');
// the hh mm ss time slots
const hhmmss = document.querySelectorAll('tt');
// the clock panel
const panel = document.querySelector('center');

// checkboxes in the settings popover
const checks = document.querySelectorAll('input[type=checkbox]');

// preferences
const prefs = {};
prefs.blink = !!localStorage['prefs-dotdot-blink'];

checks.forEach((a)=>{
  a.checked = !!localStorage[a.id];
  a.onchange = (evt)=>{
      localStorage[evt.target.id] = !!evt.target.checked;
      prefs.blink = !!evt.target.checked;
      showDots(true);
      console.log('prefs-dotdot-blink: ', !!evt.target.checked);
  }
});

// tick, tock
setInterval(function() {
  const dt = new Date();
  const s = dt.toLocaleTimeString('en-GB');  // 00:00:00
  const [hh, mm, ss] = s.split(':');

  if(prefs.blink) {
   (+ss % 2) ? showDots(true) : showDots(false);
  }


  updateClock([hh,mm,ss]);
}, 500);

// updates the clock time, given hh-mm-ss array
function updateClock(arr) {
  panel.style.opacity = 1;
  arr.forEach((a,i)=>hhmmss[i].innerText=arr[i]);
}

// shows clock separators, if given true;
// otherwise, hides them
function showDots(show) {
  dotdot.forEach((a)=>a.style.opacity=show+0);
}
