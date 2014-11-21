/**
 * Created by Radu on 3/1/14.
 */
 

// frame style
var platform = navigator.platform;
var winWidth = 940, winWidthCompact = 325,
    winHeight = 500, winHeightCompact = 135;

if (/mac/i.test(platform))
    $(".frame").addClass("os-mac");
else if (/linux/i.test(platform)) {
    $(".frame").addClass("os-lnx");
} else {
    $(".frame").addClass("os-win");
}


chrome.app.window.current().resizeTo(winWidth, winHeight);

// frame control buttons

var isMiniModeOn = false;
var playMusicWV = document.querySelector('webview');

$('#window-expand').hide();

$('#window-expand').click(function(e) { 
    expandWindow();
    isMiniModeOn = false;
    chrome.app.window.current().resizeTo(winWidth, winHeight);
});

$('#window-compact').click(function(e) { 
    if (isMaximized()) {
        isMiniModeOn = true;
        restoreWindow();
    } else {
        minifyWindow();
    }
});

$('#window-minimize').click(function(e) { chrome.app.window.current().minimize(); });
$('#window-close').click(function(e) { window.close(); });

$('#window-restore').hide();

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
}


function expandWindow() {
    $('#window-expand').hide();
    $('#window-compact').show();
    playMusicWV.insertCSS({file: "/css/gMusic_max.css", runAt: "document_start"});

};



function restoreWindow() {
    $('#window-restore').hide();
    $('#window-maximize').show();
    chrome.app.window.current().restore();
}

window.onresize = function(){
    if (isMiniModeOn && chrome.app.window.current().outerBounds.width > 375 && !isMaximized()) {
        expandWindow();
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


function isMaximized() {
    return chrome.app.window.current().isMaximized();
}

function isMinimized() {
    return chrome.app.window.current().isMinimized();
}
 
/*
var win_w_min = 325;
var win_h_min = 135;
var win_w_max = 940;
var win_h_max = 500;

window.onresize = doLayout;

window.onload = function() {
    var webview = document.querySelector('webview');

    chrome.app.window.current().resizeTo(win_w_max, win_h_max);
    doLayout();

    document.querySelector('#b_min').onclick = function() {
        webview.insertCSS({file: "/css/gMusic_min.css", runAt: "document_start"});
        isMiniModeOn = true;
        chrome.app.window.current().resizeTo(win_w_min, win_h_min);
        document.getElementById("container").className = "min";

        document.getElementById("switch").className = "test";

        //console.log('gMusic MIN');
    };

    document.querySelector('#b_max').onclick = function() {
        webview.insertCSS({file: "/css/gMusic_max.css", runAt: "document_start"});
        isMiniModeOn = false;
        chrome.app.window.current().resizeTo(win_w_max, win_h_max);
        document.getElementById("container").className = "max";

        //console.log('gMusic MAX');
    };

    chrome.app.window.current().onMaximized.addListener(function(){
        if (isMiniModeOn){
            webview.insertCSS({file: "/css/gMusic_max.css", runAt: "document_start"});
            chrome.app.window.current().resizeTo(win_w_max, win_h_max);
            isMiniModeOn = false;
            document.getElementById("container").className = "max";

            //console.log('Maximized from Mini Mode');

        }
    });

    webview.addEventListener('contentload', function() {
        webview.insertCSS({file: "/css/gMusic_max.css", runAt: "document_end"});
    });
}

function doLayout() {

    var webview = document.querySelector('webview');
    if (isMiniModeOn){
        webview.style.width = '' + win_w_min +'px';
        webview.style.height = '' + win_h_min + 'px';
    }else{
        webview.style.width = (document.documentElement.clientWidth) + 'px';
        webview.style.height = document.documentElement.clientHeight + 'px';
    }

    //console.log('webview resized to '+webview.style.width+' x '+webview.style.height);
}*/