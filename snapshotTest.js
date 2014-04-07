utils = require('utils');
var casper = require("casper").create({
    waitTimeout: 1000,
    pageSettings: {
        userAgent: "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)"
    }
});
casper.options.clientScripts = ["jquery.js"];

casper.start('http://www.offercrunch.co.uk/offers/laptop/lenovo/lenovo-flex-14-convertible-14-touchscreen-laptop-red', function() {
    this.capture('offercrunch.png');
});

casper.run();