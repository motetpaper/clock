// app.js
// job    : controls clock app actions
// git    : https://github.com/motetpaper/clock
// lic    : MIT

if ('serviceWorker' in navigator) {

  navigator.serviceWorker.register('sw.js').then(
    (registration) => {
      console.log('[app.js] service worker reg OK.', registration);
    },
    (error) => {
      console.error(`[app.js] service worker reg failed: ${error}`);
    },
  );
} else {
  console.error('[app.js] service worker unsupported.');
}


// the double dot clock separators
const dotdot = document.querySelectorAll('span');
// the hh mm ss time slots
const hhmmss = document.querySelectorAll('tt');
// the clock panel
const panel = document.querySelector('center');

// checkboxes in the settings popover
const checks = document.querySelectorAll('input[type=checkbox]');

// preferences area
//
const prefs = {};
//prefs['prefs-dotdot-blink'] = localStorage['prefs-dotdot-blink'];
//prefs['prefs-standaside-mode'] = !!localStorage['prefs-standaside-mode'];
console.log(prefs);
checks.forEach((a)=>{

  console.log(a.id, localStorage[a.id])
  a.checked = isSettingEnabled(a.id);
  a.onchange = (evt)=>{
      localStorage[evt.target.id] = evt.target.checked;
      showDots(true);
      console.log(evt.target.id, evt.target.checked);
  }
});

// clock area
//

// tick, tock
setInterval(function() {
  const dt = new Date();
  const s = dt.toLocaleTimeString('en-GB');  // 00:00:00
  const [hh, mm, ss] = s.split(':');

  if(isSettingEnabled('prefs-dotdot-blink')) {
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

function isSettingEnabled(str) {
  return localStorage[str] === 'true';
}

// stand aside area
//
//

function hasBatteryObjects() {
  return !!navigator.getBattery;
}

// stand aside battery event listeners
document.querySelector('center').classList = '';
const fadeStyle = 'stand-aside-fade-in-text';
navigator.getBattery && navigator.getBattery().then((battery) => {
  battery.addEventListener('chargingchange', () => {

    const msg = battery.charging ? 'plugged in' : 'unplugged'
    console.log(msg);

    if(isSettingEnabled('prefs-standaside-mode')) {
      document.querySelector('center')
        .classList = battery.charging ? fadeStyle : '';
    }
  });
});
