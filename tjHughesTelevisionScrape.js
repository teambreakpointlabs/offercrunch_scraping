var argosTelevisions = [];
var utils = require('utils');
var fs = require('fs'); 
var casper = require("casper").create({
    verbose: true,
    logLevel: "debug",
    waitTimeout: 1000,
    pageSettings: {
        userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_3) AppleWebKit/534.55.3 (KHTML, like Gecko) Version/5.1.3 Safari/534.53.10"
    }
});
casper.options.clientScripts = ["jquery.js"];

function getTelevisionOffers(){
  var tvOfferSections = $('li.item');

  var tvOffers = Array.prototype.map.call(tvOfferSections, function(tv){
    var tvOffer = {};

    var productUrl, imageUrl, originalPrice, offerPrice, savings, screenSize, properties, brand, pctSavings, screenType = "";
    var retailer = 'tj hughes';
    var productType = 'television';
    var description = '';
    var urlDesc = '';
    var encodedProductUrl = '';
    var skimlinksUrl = '';

    // if(($(tv).find('h2.product-name').find('a').attr('href'))!=null){
     // productUrl = $(tv).text();//find('h2.product-name').find('a').attr('href');
    // }
    // if(($(tv).find('.product-list-cnt-mid').find('h2').find('small').text())!=null){
    //   description = $(tv).find('.product-list-cnt-mid').find('h2').find('small').text();
    //   screenSize = description.match(/\d{2}\"/);
    //   if (screenSize != null){
    //     screenSize = screenSize[0];
    //     screenSize = screenSize.match(/\d{2}/);
    //   }
    //     if (description.match(/LED/i)){
    //       screenType = "LED";
    //     }
    //     if (description.match(/Plasma/i)){
    //       screenType = "Plasma";
    //     }
    //     if (description.match(/LCD/i)){
    //       screenType = "LCD";
    //     }
    // }
    
    // if(($(tv).find('.product-list-cnt-mid').find('h2').find('a').find('strong').text())!=null){
    //   brand = $(tv).find('.product-list-cnt-mid').find('h2').find('a').find('strong').text();
    //   brand = brand.toLowerCase();
    // }

    // var imageSet = false;

    // if (($(tv).find('.product-list-cnt').find('img').attr('src'))!=null) {
    //  imageUrl = $(tv).find('.product-list-cnt').find('img').attr('src');
    // }

    // if (!imageSet){
    //   if(($(tv).find('dd.image a').find('img').attr('src'))!=null){
    //    imageUrl = "http://www.argos.co.uk" + $(tv).find('dd.image a').find('img').attr('src');
    //   }
    // }

   //  if(($(tv).find('.product-list-cnt span.pricing strong').text())!=null){
   //    offerPrice = $(tv).find('.product-list-cnt span.pricing strong').text();
   //    offerPrice =  offerPrice.match(/\.?\d[\d.,]*/);
   //    if (offerPrice!=null){
   //      offerPrice = offerPrice[0];
   //      offerPrice = parseFloat(offerPrice);
   //    }else{
   //      offerPrice = '';
   //      return {}
   //    }   
   // }
   
    // if(($(tv).find('.product-list-cnt span.pricing small span').text())!=null){
    //   originalPrice = $(tv).find('.product-list-cnt span.pricing small span').text();
    //   originalPrice = originalPrice.match(/\.?\d[\d.,]*/);
    //   if (originalPrice!=null){
    //     originalPrice = originalPrice[0];
    //     originalPrice = parseFloat(originalPrice);
    //   }else{
    //     originalPrice = '';
    //     return {}
    //   }
    // }
    
    // if(($(tv).find('.save span').text())!=null){
    //   savings =  $(tv).find('.save span').text();
     
    //   savings = savings.match(/\.?\d[\d.,]*/);
    //   if (savings!=null){
    //       savings = savings[0];
    //       savings = parseFloat(savings);
    //     }else{
    //       savings = '';
    //    }
    //   }
   // description = brand.charAt(0).toUpperCase() + brand.slice(1) + ' ' + description;
   //  //     //make seo friendly url from description
   //  if (description!=''){
   //     urlDesc = description.replace(/\s+/g,'-').toLowerCase();
   //    if (urlDesc!=''){
   //      if (urlDesc.slice(-1)=="."){
   //        urlDesc = urlDesc.substring(0,urlDesc.length-1);
   //      }
   //      urlDesc = urlDesc.replace(/"/g,"");
   //      urlDesc = urlDesc.replace(/--/g,"");
   //      urlDesc = urlDesc.replace(/\//g,"-");
   //      urlDesc = urlDesc.replace(/&/g,"and");
   //     }
   //  }else{
   //    //back up if desc is not scraped
   //    var unique = parseFloat(Math.floor(Math.random() * 1000000000));
   //    urlDesc = brand + '-' + productType + '-' + unique;
   //  }

    // encodedProductUrl = encodeURIComponent(productUrl);
    // //skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1347041&site=www.specialoffershopper.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=d1cbe13e65417e162e392fc0edcccb5f&xcreo=0&sref=http%3A%2F%2Fwww.specialoffershopper.co.uk&xtz=-660';
    //skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1506902&site=www.offercrunch.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=a11734410a17086b1e3a57e4e942b244&xcreo=0&sref=http%3A%2F%2Fwww.offercrunch.co.uk&xtz=-60';

    // skimlinksUrl = 'http://www.awin1.com/cread.php?awinmid=3133&awinaffid=193639&clickref=&p='+encodedProductUrl;
    // // if (isNaN(parseInt(screenSize)) && brand == 'Apple'){
    // //   screenSize = parseFloat(propertiesArr[4]);
    // // }

    // brand = brand.toLowerCase();
    // retailer = retailer.toLowerCase();

    // if (originalPrice != null){
   
        var url = {};
       // var pricing = {};
       // var details = {};
        url.product = productUrl;
       // url.image = imageUrl;
       // url.skimlinks = skimlinksUrl;
       // pricing.original = originalPrice;
       // pricing.offer = offerPrice;
       // pricing.savings = savings;
       // var pctSavings = parseInt(savings/originalPrice * 100);
       // pricing.pctSavings = pctSavings;
       // var savingsString = savings.toFixed(2);
       // savingsString = savingsString.replace(".","-");
       // if (savingsString!='NaN'){
       //   urlDesc = urlDesc + "-" + pctSavings + "-percent-off-save-"+savingsString+"-pounds";
       // }else{
       //    return {};
       // }
       // details.screenSize = parseInt(screenSize);
       // details.screenType = screenType;
        tvOffer.url = url;
       // tvOffer.details = details;
        tvOffer.retailer = retailer;
       // tvOffer.type = productType;
       // tvOffer.brand = brand;
       // tvOffer.urlDesc = urlDesc;

    // //percentage discount
    // pctSavings = Math.ceil((savings)/originalPrice * 100);
       // pricing.pctSavings = pctSavings;
       // tvOffer.pricing = pricing;
       // tvOffer.description = description;
    // //tvOffer.last_updated = new Date();
       // tvOffer.isValid = true;
    // }
      return tvOffer;
  });
  return tvOffers;
}

var processPage = function() {
  var argosTelevisions = this.evaluate(getTelevisionOffers);
    if (argosTelevisions!=null){
      for (var i=0; i < argosTelevisions.length; i++){
          // if (argosTelevisions[i].type != undefined){
            // if (isNaN(parseInt(argosTelevisions[i].pricing.original))){
              // continue;
            // }
             // var televisionString = JSON.stringify(argosTelevisions[i]);
             // fs.write('./hughes direct-television.txt', televisionString + "\n", 'a');
            utils.dump(argosTelevisions[i]);
           // }
        }
    }else{
      this.echo('no offers');
    }
    this.exit();
};

casper.start("http://www.tjhughes.co.uk/electricals/sound-vision/televisions", function() {
});

casper.run(
  processPage
);