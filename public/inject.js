function require(script) {
    $.ajax({
        url: script,
        dataType: "script",
        async: false,           // <-- This is the key
        success: function () {
            // all good...
        },
        error: function () {
            throw new Error("Could not load script " + script);
        }
    });
}

window.addEventListener ("load", myMain, false);
function myMain (evt) {
    console.log(`XXX 11 main`);
    var jsInitChecktimer = setInterval (checkForJS_Finish, 1000);
    function checkForJS_Finish () {
        if (typeof $ === 'function') {
            $("<div data-attr='xxx-test-xxx' id='learn_crx_app'></div>").insertAfter( "footer" );
            clearInterval (jsInitChecktimer);
            console.log(`XXX chrome`, chrome);
            console.log(`XXX chrome.runtime`, chrome.runtime);
            console.log(`XXX chrome.runtime.getURL`, chrome.runtime.getURL);
            const jsUrl = chrome.runtime.getURL("index.js");
            console.log(`XXX START loading jsURL: ${jsUrl}`);
            require(jsUrl);
            console.log(`XXX DONE loading jsURL: ${jsUrl}`);
        }
    }
}
