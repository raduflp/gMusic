
// frame style
var platform = navigator.platform;
var winWidth = 940, winWidthCompact = 325,
    winHeight = 500, winHeightCompact = 135,
    prevLeft = 0, prevTop = 0;

if (/mac/i.test(platform))
    $("body").addClass("os-mac");
else if (/linux/i.test(platform)) {
    $("body").addClass("os-lnx");
} else {
    $("body").addClass("os-win");
}


chrome.app.window.current().resizeTo(winWidth, winHeight);



// frame control buttons

var isMiniModeOn = false;
var playMusicWV = document.querySelector('webview');

$('#window-expand').hide();
$('#window-restore').hide();

$('#window-expand').click(function(e) {
    expandWindow();
    isMiniModeOn = false;
    chrome.app.window.current().resizeTo(winWidth, winHeight);
    chrome.app.window.current().moveTo(prevLeft, prevTop);
});

$('#window-compact').click(function(e) {
    if (isMaximized()) {
        isMiniModeOn = true;
        restoreWindow();
        minifyWindow();
    } else {
        minifyWindow();
    }
});

$('#window-minimize').click(function(e) { chrome.app.window.current().minimize(); });
$('#window-close').click(function(e) { window.close(); });


$('#window-maximize').click(function(e) {
    $('#window-maximize').hide();
    $('#window-restore').show();
    if (isMiniModeOn) {
        expandWindow();
    }
    chrome.app.window.current().maximize();
});

$('#window-restore').click(function(e) {
    restoreWindow();
    //chrome.app.window.current().resizeTo(winWidth, winHeight);
});


function minifyWindow() {
    $('#window-compact').hide();
    $('#window-expand').show();
    if (chrome.app.window.current().isMaximized()) {
      restoreWindow();
    }
    playMusicWV.insertCSS({file: "/css/gMusic_min.css", runAt: "document_start"});
    isMiniModeOn = true;
    chrome.app.window.current().resizeTo(winWidthCompact, winHeightCompact);

    prevLeft = chrome.app.window.current().outerBounds.left;
    prevTop = chrome.app.window.current().outerBounds.top;
    chrome.app.window.current().moveTo(window.screen.availWidth,window.screen.availHeight);
}


function expandWindow() {
    $('#window-expand').hide();
    $('#window-compact').show();
    playMusicWV.insertCSS({file: "/css/gMusic_max.css", runAt: "document_start"});
};

function restoreWindow() {
    chrome.app.window.current().restore();
    $('#window-restore').hide();
    $('#window-maximize').show();
}

window.onresize = function(){
    if (isMiniModeOn && chrome.app.window.current().outerBounds.width > 375 && chrome.app.window.current().outerBounds.height > 175 && !isMaximized()) {
        expandWindow();
        chrome.app.window.current().resizeTo(winWidth, winHeight);
        isMiniModeOn = false;
    }
};

chrome.app.window.current().onRestored.addListener(function() {
    console.log("window restored");
    // case when demaximize a previous mini mode
    // isMinimized check required to avoid the case in which restored is fired when minimizing from maximized state, clear as mud right?
    if (isMiniModeOn && !isMaximized() && !isMinimized()) {
        minifyWindow();
    }
});

chrome.app.window.current().onMaximized.addListener(function() {
  console.log("window maximized");
  if (isMiniModeOn){
      expandWindow();
  }
});


function isMaximized() {
    return chrome.app.window.current().isMaximized();
}

function isMinimized() {
    return chrome.app.window.current().isMinimized();
}




/*

$('#OSStyle').change(function(e) {
    $("body").removeClass("os-lnx os-mac os-win");
    if ($(this).val() == "mac")
        $("body").addClass("os-mac");
    else if ($(this).val() == "lnx") {
        $("body").addClass("os-lnx");
    } else {
        $("body").addClass("os-win");
    }

});*/

