// var paywall = require("./lib/paywall");
// setTimeout(() => paywall(12345678), 5000);

require("component-responsive-frame/child");

var $ = require("./lib/qsa");
var dot = require("./lib/dot");

var Router = require("./router");
var router = new Router();

var viewContainer = $.one(".view-container");
var navigation = $.one("#navigation");

var templates = {
  candidate: dot.compile(require("./_candidate.html")),
  candidateChooser: dot.compile(require("./_candidate-chooser.html")),
  question: dot.compile(require("./_question.html")),
  questionChooser: dot.compile(require("./_question-chooser.html")),
  about: require("./_about.html")
};

var lookup = {
  candidate: {},
  question: {}
};

window.candidateData.forEach(c => lookup.candidate[c.id] = c);
window.questionData.forEach(q => lookup.question[q.id] = q);

var setViewAttr = v => document.body.setAttribute("data-view", v);

router.onhit = function(e) {
  var containerBounds = navigation.getBoundingClientRect();
  if (containerBounds.top < 0) navigation.scrollIntoView();
};

router.onmiss = function(url) {
  console.log(`No matching route for ${url}, redirecting`);
  window.location.hash = "#/about";
};

router.add("/about", function() {
  setViewAttr("about");
  viewContainer.innerHTML = templates.about;
});

router.add(["/", "/candidates"], function() {
  setViewAttr("candidate-list");
  viewContainer.innerHTML = templates.candidateChooser({ candidates: window.candidateData });
});

router.add("/candidates/:id", function(e) {
  setViewAttr("candidate");
  var candidate = lookup.candidate[e.params.id];
  var detailed = window.questionData.filter(q => q.category == "standalone" || q.category == "short answer");
  var choice = window.questionData.filter(q => q.category == "Multiple choice");
  var bio = window.questionData.filter(q => q.category == "biography");
  viewContainer.innerHTML = templates.candidate({
    candidate,
    detailed,
    choice,
    bio,
    qLookup: lookup.question
  });
});

var onIssue = function(e) {
  var id = e.params.id || "affordable_housing";
  setViewAttr("question");
  var questions = window.questionData.filter(q => q.category == "standalone");
  var question = lookup.question[id];
  var candidates = window.candidateData;
  viewContainer.innerHTML = templates.question({ id, question, questions, candidates });
};

router.add("/issue/:id", onIssue);

router.add("/about", e => viewContainer.innerHTML = "This space intentionally left blank.");