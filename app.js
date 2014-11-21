chrome.app.runtime.onLaunched.addListener(function() {
  runApp();
});


chrome.app.runtime.onRestarted.addListener(function() {
  runApp();
});

function runApp() {
  chrome.app.window.create('index.html', {
  	id: "gMusic",
    frame: 'none',
    outerBounds: {
      minWidth: 325,
      minHeight: 135
    },
  });
}
