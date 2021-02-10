var timerupdate = window.setInterval(settimer, 1000);
function settimer() {
  timerdata = document.querySelector('#timerdata')
  let now = new Date();
  let then = new Date('15 March 2021');
  diff = (then - now) / 1000;
  days = Math.floor(diff / 86400);
  diff %= 86400;
  hours = Math.floor(diff / 3600);
  diff %= 3600;
  mins = Math.floor(diff / 60);
  diff = Math.floor(diff % 60);
  output = "";
  if (days != 0) {
    output += days + " D ";
  }
  if (hours != 0) {
    output += hours + " H ";
  }
  if (mins != 0) {
    output += mins + " M ";
  }
  if (diff != 0) {
    output += diff + " S ";
  }
  if (output != "") {
    timerdata.innerHTML = output + 'Left';
  }
}