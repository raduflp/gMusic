/**
 * Created by Radu on 3/1/14.
 */
var isMiniModeOn = false;
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
}