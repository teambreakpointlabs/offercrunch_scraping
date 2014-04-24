var currysTelevisions = [];
var utils = require('utils');
var fs = require('fs'); 
var casper = require("casper").create({
    waitTimeout: 1000,
    pageSettings: {
        userAgent: "Mozilla/5.0 (MSIE 9.0; Windows NT 6.1; Trident/5.0)"
    }
});
casper.options.clientScripts = ["jquery.js"];
var currentPage = 1;

var terminate = function() {
    this.echo("finished scraping").exit();
};

function isInt(n) {
   return typeof n === 'number' && n % 1 == 0;
}

function getTelevisionOffers(){
  var tvOfferSections = $('.item');

  var tvOffers = Array.prototype.map.call(tvOfferSections, function(tv){
      var tvOffer = {};

      var productUrl, imageUrl, originalPrice = "";
    	var offerPrice = "";
      var savings = "";
    	var screenSize = "";
    	var properties = "";
    	var screenType = "";
    	var make = "";
    	var retailer = 'zavvi';
    	var productType = 'laptop';
    	var percentDiscount = "";
      var urlDesc = "";
      var encodedProductUrl = "";
      var skimlinksUrl = "";


      if (($(tv).find('div.product-image').find('a').attr('href'))!=null){
        productUrl = $(tv).find('div.product-image').find('a').attr('href');
      }
//     	if(($(tv).find('h3').find('a').attr('href'))!=null){
//     		productUrl = $(tv).find('h3').find('a').attr('href');
//         productUrl = "http://www.prcdirect.co.uk"+productUrl;
//       }
//       if(($(tv).find('h3').find('a').text())!=null){
//         brand = $(tv).find('h3').find('a').text();
//         brand = brand.split(' ')[0];
//         brand = brand.toLowerCase();
//       }
      if(($(tv).find('p.product-name').find('a').text())!=null){
        description = $(tv).find('p.product-name').find('a').text();
          if (description.slice(-1)==","){
            description = description.substring(0,description.length-1);
          }
        description = description.trim();
        description = description.replace('...','');

        var lastIndex = description.lastIndexOf(" ");
        var description = description.substring(0, lastIndex);

        var descriptionSplit = description.split(' ');
        if (descriptionSplit[descriptionSplit.length-1]=='with'){
          
         var lastIndex = description.lastIndexOf(" ");
         description = description.substring(0, lastIndex);
        }

        description = description.replace("(","");
        description = description.replace(")","");
        
      //      description = description.replace("(","");
      //      description = description.replace(")","");
      //      description = description.replace(/®/,"");


        screenSize = description.match(/\d{2}( Inch| inch)/);
        if (screenSize!=null){
          screenSize = screenSize[0].match(/\d{2}/);
          screenSize = screenSize[0];
        }
      //    // screenSize = description.split(' ')[0];
      //    // if (screenSize != null){
      //    //    screenSize = screenSize.replace('"',"");
      //    // //   screenSize = screenSize[0];
      //    // // }
      //    // if (description.match(/LED/)){
      //    //  screenType = 'LED';
      //    // }else if (description.match(/LCD/)){
      //    //  screenType = 'LCD';
      //    // }else if (description.match(/Plasma/)){
      //    //  screenType = "plasma";
      //    // }

         brand = description.split(" ")[0];
         brand = brand.toLowerCase();

       }
      //  if(($(tv).find('div.productDetail').find('p').text())!=null){
      //   descriptionDetail = $(tv).find('div.productDetail').find('p').text();
      //   screenSize = descriptionDetail.match(/\d{2}\.?\d?"/);
      //   if (screenSize!=null){
      //     screenSize = screenSize[0];
      //   }
      // }

      if(($(tv).find('.product-image').find('img').attr('src'))!=null){
    		imageUrl = $(tv).find('.product-image').find('img').attr('src');
        //imageUrl = imageUrl.replace("mini","detail");
      }
      // if(($(tv).find('div.crossedOutPrice').find('img').attr('alt'))!=null){
      //   originalPrice = $(tv).find('div.crossedOutPrice').find('img').attr('alt');
      //   originalPrice = originalPrice.replace(",","");
      //   originalPrice = originalPrice.match(/[0-9]+\.?[0-9]*/);
      //   originalPrice = parseFloat(originalPrice);
      // }
      if(($(tv).find('div.price').find('span').text())!=null){
        offerPrice = $(tv).find('div.price').find('span').text();
        offerPrice = offerPrice.replace(",","");
        offerPrice = offerPrice.match(/[0-9]+\.?[0-9]*/);
        offerPrice = parseFloat(offerPrice);
      }

      if(($(tv).find('p.yousave').text())!=null){
        savings = $(tv).find('p.yousave').text();
        savings = savings.replace(",","");
        savings = savings.match(/[0-9]+\.?[0-9]*/);
        savings = parseFloat(savings);
      }

// // // //           //make seo friendly url from description
    if (description!=''){
       urlDesc = description.replace(/\s+/g,'-').toLowerCase();
      if (urlDesc!=''){
        if (urlDesc.slice(-1)=="."){
          urlDesc = urlDesc.substring(0,urlDesc.length-1);
        }
        urlDesc = urlDesc.replace(/"/g,"");
        urlDesc = urlDesc.replace(/--/g,"");
        urlDesc = urlDesc.replace(/\//g,"-");
        urlDesc = urlDesc.replace(/,/g,"-");
        urlDesc = urlDesc.replace(/®/,"");
        urlDesc = urlDesc.replace(/&/g,"and");
        urlDesc = urlDesc.replace(/\(/g,"");
        urlDesc = urlDesc.replace(/\)/g,"");
        urlDesc = urlDesc + "-offer";
       }
    }
      encodedProductUrl = encodeURIComponent(productUrl);
// // //  //   skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1347041&site=www.specialoffershopper.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=d1cbe13e65417e162e392fc0edcccb5f&xcreo=0&sref=http%3A%2F%2Fwww.specialoffershopper.co.uk&xtz=-660';
       skimlinksUrl = 'http://www.awin1.com/cread.php?awinmid=2549&awinaffid=193639&clickref=&p='+encodedProductUrl;
// // //     skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1506902&site=www.offercrunch.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=a11734410a17086b1e3a57e4e942b244&xcreo=0&sref=http%3A%2F%2Fwww.offercrunch.co.uk&xtz=-60';

// // //      brand = brand.toLowerCase();
// // // //     retailer = retailer.toLowerCase();

// // // // if(oldPrice!=null && screenSize != ""){
  
                var url = {};
                var pricing = {};
                var details = {};
                url.product = productUrl; 
                url.image = imageUrl;
                url.skimlinks = skimlinksUrl;
                var originalPrice = offerPrice + savings;
                pricing.original = originalPrice;
                pricing.offer = offerPrice;
//              var savings = originalPrice - offerPrice;  
                pricing.savings = savings;
                var pctSavings = parseInt(savings/originalPrice * 100);
                pricing.pctSavings = pctSavings;
                var savingsString = savings.toFixed(2);
                savingsString = savingsString.replace(".","-");
                if (savingsString!='NaN'){
                  urlDesc = urlDesc + "-" + pctSavings + "-percent-off-save-"+savingsString+"-pounds";
                }else{
                return {};
                }
// // // //      pricing.pctSavings = Math.round(parseFloat(savings)/parseFloat(originalPrice)*100);
                 details.screenSize = parseFloat(screenSize);
          //      details.screenType = screenType;
                 tvOffer.url = url;
                 tvOffer.details = details;
                 tvOffer.retailer = retailer;
                 tvOffer.pricing = pricing;
                 tvOffer.type = productType; 
                 tvOffer.brand = brand;
                 tvOffer.description = description;
                 tvOffer.urlDesc = urlDesc;
                 tvOffer.isValid = true;


      return tvOffer;
  });

   return tvOffers;
}

var processPage = function() {
    this.echo('process page');
    var url;
    var currysTelevisions = this.evaluate(getTelevisionOffers);
    if (currysTelevisions!=null){
    //utils.dump(currysTelevisions);
            for (var i=0; i < currysTelevisions.length; i++){
           // utils.dump(currysTelevisions[i]);
               if (currysTelevisions[i].type != undefined){
             // this.echo(currysTelevisions[i].pricing.original);
               if (isNaN(parseInt(currysTelevisions[i].pricing.original))){
                  continue;
                }
              var televisionString = JSON.stringify(currysTelevisions[i]);
             //

              fs.write('./zavvi-laptop.txt', televisionString + "\n", 'a');
              utils.dump(currysTelevisions[i]);
               }
             }
               this.echo(currysTelevisions.length);

      }
 
    this.exit();
 };

casper.start("http://www.zavvi.com/technology/pc-laptops/laptops.list", function() {
 //http://www.currys.co.uk/gbuk/tv-dvd-blu-ray/televisions/large-screen-tvs-32-and-over/301_3002_30002_xx_xx/xx-criteria.html
 //http://www.currys.co.uk/gbuk/tv-dvd-blu-ray/televisions/small-screen-tvs-up-to-32/301_3915_31642_xx_xx/xx-criteria.html
});

// casper.waitForSelector('a.load-more', processPage, terminate);


// casper.run();
casper.run(
   processPage
);