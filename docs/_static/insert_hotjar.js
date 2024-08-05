// _static/insert_hotjar.js

// Function to add a script element to the head
function addScript(src, onload) {
    var script = document.createElement('script');
    script.async = true;
    script.src = src;
    if (onload) {
        script.onload = onload;
    }
    document.head.appendChild(script);
}

// Add Google Tag Manager
addScript('https://www.googletagmanager.com/gtag/js?id=G-S2NQCWGG1N', function() {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());
    gtag('config', 'G-S2NQCWGG1N');
});

// Add Hotjar
(function(h,o,t,j,a,r){
    h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
    h._hjSettings={hjid:YOUR_HOTJAR_ID,hjsv:6};
    a=o.getElementsByTagName('head')[0];
    r=o.createElement('script');r.async=1;
    r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
    a.appendChild(r);
})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');

(function() {
    var gtagScript = document.createElement('script');
    gtagScript.async = true;
    gtagScript.src = "https://www.googletagmanager.com/gtag/js?id=G-S2NQCWGG1N";
    document.head.appendChild(gtagScript);

    gtagScript.onload = function() {
        window.dataLayer = window.dataLayer || [];
        function gtag() { dataLayer.push(arguments); }
        gtag('js', new Date());
        gtag('config', 'G-S2NQCWGG1N');
    };
})();
