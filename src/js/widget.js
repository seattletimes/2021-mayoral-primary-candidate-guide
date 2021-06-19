// require("./lib/social");
// require("./lib/ads");
// var track = require("./lib/tracking");

require("component-responsive-frame/child");

var $ = require("./lib/qsa");
var details = $.one(".details");

var onClick = function() {
  var name = this.getAttribute("data-name");
  var id = this.getAttribute("data-id");
  var mug = this.querySelector(".mugshot").src;
  var summary = this.getAttribute("data-summary");
  var video = this.getAttribute("data-video") ? `
  <div class="video-container">
    <iframe src="//players.brightcove.net/1509317113/V1eCvUwO2g_default/index.html?videoId=${this.getAttribute("data-video")}" allowfullscreen webkitallowfullscreen mozallowfullscreen></iframe>
  </div>
  ` : `<img src="${mug}" class="mug">`;
  details.innerHTML = `
    ${video}
    <h2>${name}</h2>
    <p class="summary">
      ${summary}
    <p class="outgoing">
    <a target="_blank" href="https://projects.seattletimes.com/2017/mayoral-primary-guide/#/candidates/${id}">Read more in our full primary guide &raquo;</a>
  `
};

$(".mug-container").forEach(el => el.addEventListener("click", onClick));