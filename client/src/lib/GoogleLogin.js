export const loadGoogleScript = () => {
    (function () {
        const id = 'google-js';
        const src = 'https://apis.google.com/js/platform.js';
        const firstJS = document.getElementsByTagName('script')[0];

        if (document.getElementById(id)) return;
        const js = document.createElement('script');
        js.id = id;
        js.src = src;
        js.onload = window.onGoogleScriptLoad;
        firstJS.parentNode.insertBefore(js, firstJS);
    }());
}