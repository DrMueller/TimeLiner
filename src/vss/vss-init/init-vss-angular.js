function initialize(explicitNotifyLoaded, usePlatformStyles, usePlatformScripts, afterSdkReadyCallback) {
    appendScript('../../lib/VSS.SDK.min.js').onload = function () {
        VSS.init({
            explicitNotifyLoaded: explicitNotifyLoaded || false,
            usePlatformStyles: usePlatformStyles || false,
            usePlatformScripts: usePlatformScripts || false
        });

        VSS.ready(function () {
            appendScript('../../angular-app/runtime-es5.js');
            appendScript('../../angular-app/runtime-es2015.js');
            appendScript('../../angular-app/polyfills-es5.js');
            appendScript('../../angular-app/polyfills-es2015.js');
            appendScript('../../angular-app/styles.js');
            appendScript('../../angular-app/main-es5.js');
            appendScript('../../angular-app/main-es2015.js');

            if (afterSdkReadyCallback) {
                afterSdkReadyCallback();
            }
        });

    };

    function appendScript(scriptSource) {
        let scriptTag = document.createElement('script');
        scriptTag.src = scriptSource;
        document.head.appendChild(scriptTag);
        return scriptTag;
    }
};