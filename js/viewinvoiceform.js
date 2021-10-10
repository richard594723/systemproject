getParameters();

function getParameters() {
    let urlString = window.location.href;

    let paramString = urlString.split('?')[1];

    let params_arr = paramString.split('&');
    let parameter = [
        []
    ];
    for (let i = 0; i < params_arr.length; i++) {

        let pair = params_arr[i].split('=');
        parameter[i][0] = pair[0];
        parameter[i][1] = pair[1];

    }

    $.ajax({
        type: 'post',
        url: './php/invoice.php',
        data: { action: "viewspecificinvoice", invoiceid: parameter[0][1] },
        dataType: "json",
        success: function(data) {
            var invoicedata = data;
            document.getElementById("billno").innerHTML = invoicedata[0]['billno'];
            document.getElementById("billdatetime").innerHTML = invoicedata[0]['billdatetime'];
            document.getElementById("expirydate").innerHTML = invoicedata[0]['expirydate'];
            document.getElementById("ic").innerHTML = invoicedata[0]['ic'];
            document.getElementById("name").innerHTML = invoicedata[0]['name'];
            document.getElementById("model").innerHTML = invoicedata[0]['model'];
            document.getElementById("imei").innerHTML = invoicedata[0]['imei'];
            document.getElementById("phonelock").innerHTML = invoicedata[0]['phonelock'];
            document.getElementById("amount").innerHTML = invoicedata[0]['amount'];

        },
        error: function(ajaxContext) {
            alert("The action of view specific customer is failed.");

        }
    });

}
detectwindow();

function detectwindow() {
    /*  Opera 8.0+
    var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';
    // Blink engine detection
    var isBlink = (isChrome || isOpera) && !!window.CSS;
    // Safari 3.0+ "[object HTMLElementConstructor]" 
    var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || (typeof safari !== 'undefined' && safari.pushNotification));
    // Internet Explorer 6-11
    var isIE = /*@cc_on!*(/)@false || !!document.documentMode;
    // Edge 20+
    var isEdge = !isIE && !!window.StyleMedia;
    // Chrome 1 - 71
    var isChrome = !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
    */
    // Chrome 1 - 71
    var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
    // Firefox 1.0+
    var isFirefox = typeof InstallTrigger !== 'undefined';

    if (isChrome == true) {
        $("p").addClass("print-chrome-text");
        $("h2").addClass("print-chrome-title");
        $("h3").addClass("print-chrome-title");
        $(".row").removeClass("pb-4");
    } else if (isFirefox == true) {
        $(".row").removeClass("pb-4");
        $("p").addClass("print-mozilla-text");
        $("h2").addClass("print-mozilla-title");
        $("h3").addClass("print-mozilla-title");
    }
}