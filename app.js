chrome.app.runtime.onLaunched.addListener(function() {
  runApp();
});


chrome.app.runtime.onRestarted.addListener(function() {
  runApp();
});

function runApp() {
  chrome.app.window.create('main.html', {
  	id: "gMusic"
  });
}
