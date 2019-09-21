function initialize(explicitNotifyLoaded, usePlatformStyles, usePlatformScripts, afterSdkReadyCallback) {
  appendScript('../../lib/VSS.SDK.min.js').onload = function () {
    VSS.init({
      explicitNotifyLoaded: explicitNotifyLoaded || false,
      usePlatformStyles: usePlatformStyles || false,
      usePlatformScripts: usePlatformScripts || false
    });

    VSS.ready(function () {
      if (checkIfBrowserSupportsEs2015()) {
        appendScript('../../angular-app/runtime-es2015.js');
        appendScript('../../angular-app/polyfills-es2015.js');
        appendScript('../../angular-app/main-es2015.js');
      } else {
        appendScript('../../angular-app/runtime-es5.js');
        appendScript('../../angular-app/main-es5.js');
        appendScript('../../angular-app/polyfills-es5.js');
      }

      if (afterSdkReadyCallback) {
        afterSdkReadyCallback();
      }
    });
  };

  function checkIfBrowserSupportsEs2015() {
    try {
      new Function("(a = 0) => a");
      return true;
    }
    catch (err) {
      return false;
    }
  };

  function appendScript(scriptSource) {
    const scriptTag = document.createElement('script');
    scriptTag.src = scriptSource;
    document.head.appendChild(scriptTag);
    return scriptTag;
  }
};
