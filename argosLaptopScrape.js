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

function getLaptopOffers(){
  var laptopOfferSections = $('li.item');

  var laptopOffers = Array.prototype.map.call(laptopOfferSections, function(tv){
    var laptopOffer = {};

    var productUrl, imageUrl, originalPrice, offerPrice, savings, screenSize, properties, brand, pctSavings = "";
    var retailer = 'Argos';
    var productType = 'laptop';
    var description = '';
    var urlDesc = '';
    var skimlinksUrl = '';
    var encodedProductUrl = '';

    if(($(tv).find('dt.title').find('a').attr('href'))!=null){
      productUrl = $(tv).find('dt.title').find('a').attr('href');
    }

    if(($(tv).find('dt.title').find('a.desc.nogrouping').text())!=null){
      description = $(tv).find('dt.title').find('a.desc.nogrouping').text();
    }

    if(($(tv).find('dd.image.scene7 a').find('img').attr('src'))!=null){
      imageUrl = $(tv).find('dd.image.scene7 a').find('img').attr('src');
    }

    if(($(tv).find('span.main').text())!=null){
      offerPrice = $(tv).find('span.main').text();
      offerPrice =  offerPrice.match(/\.?\d[\d.,]*/);
      if (offerPrice!=null){
        offerPrice = offerPrice[0];
        offerPrice = parseFloat(offerPrice);
      }else{
        offerPrice = '';
      }
      
    }
   
    if(($(tv).find('span.wasPrice').text())!=null){
      originalPrice = $(tv).find('span.wasPrice').text();
      originalPrice = originalPrice.match(/\.?\d[\d.,]*/);
      if (originalPrice!=null){
        originalPrice = originalPrice[0];
        originalPrice = parseFloat(originalPrice);
      }else{
        originalPrice = '';
      }
    }
    
    if(($(tv).find('span.savePrice').text())!=null){
      savings =  $(tv).find('span.savePrice').text();
      if (savings.match(/%/)){
        if (savings!=null && originalPrice!='' && offerPrice!=''){
          savings = originalPrice - offerPrice;
        }
      }else{
        savings = savings.match(/\.?\d[\d.,]*/);
      if (savings!=null){
          savings = savings[0];
          savings = parseFloat(savings);
        }else{
          savings = '';
        }
      }
    }
    
    if(($(tv).find('dt.title').find('a').text())!=null){
      var properties = $(tv).find('dt.title').find('a').text();
      var propertiesArr = properties.split(' ');
      brand = propertiesArr[0];

      for (i=0;i<propertiesArr.length;i++){
           if (propertiesArr[i].match(/\d{2}[.].*/)) {
             screenSize = propertiesArr[i].match(/\d{2}[.].*/);
             if (screenSize!=null){
              screenSize = screenSize[0];
              screenSize = parseFloat(screenSize);
             }else{
              screenSize = '';
             }
        }
      }
    }
    if (isNaN(parseInt(screenSize)) && brand == 'Apple'){
      screenSize = parseFloat(propertiesArr[4]);
    }

    //make seo friendly url from description
    if (description!=''){
       urlDesc = description.replace(/\s+/g,'-').toLowerCase();
       if (urlDesc!=''){
        if (urlDesc.slice(-1)=="."){
          urlDesc = urlDesc.substring(0,urlDesc.length-1);
        }
        urlDesc = urlDesc.replace(/"/g,"");
        urlDesc = urlDesc.replace(/--/g,"");
        urlDesc = urlDesc.replace(/&/g,"and");
       }
       // if (urlDesc.slice(-1)=="."){
       //   urlDesc = urlDesc.substring(0,urlDesc.length()-1);
       // }
    }else{
      //back up if desc is not scraped
      var unique = parseFloat(Math.floor(Math.random() * 1000000000));
      urlDesc = brand + '-' + productType + '-' + unique;
    }
    
    encodedProductUrl = encodeURIComponent(productUrl);
    //skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1347041&site=www.specialoffershopper.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=d1cbe13e65417e162e392fc0edcccb5f&xcreo=0&sref=http%3A%2F%2Fwww.specialoffershopper.co.uk&xtz=-660';
    skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1506902&site=www.offercrunch.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=a11734410a17086b1e3a57e4e942b244&xcreo=0&sref=http%3A%2F%2Fwww.offercrunch.co.uk&xtz=-60';

    brand = brand.toLowerCase();
    if (brand == 'packard') brand = 'packard bell';
    retailer = retailer.toLowerCase();

    if (originalPrice != null){
   
    var url = {};
    var pricing = {};
    var details = {};
    url.product = productUrl;
    url.image = imageUrl;
    url.skimlinks = skimlinksUrl;
    pricing.original = originalPrice;
    pricing.offer = offerPrice;
    pricing.savings = savings;
    details.screenSize = screenSize;
    laptopOffer.url = url;
    laptopOffer.details = details;
    laptopOffer.retailer = retailer;
    laptopOffer.type = productType;
    laptopOffer.brand = brand;
    laptopOffer.urlDesc = urlDesc;
    

    //percentage discount
    pctSavings = Math.ceil((savings)/originalPrice * 100);
    pricing.pctSavings = pctSavings;
    laptopOffer.pricing = pricing;
    laptopOffer.isValid = true;
    laptopOffer.description = description;

    }
      return laptopOffer;
  });
  return laptopOffers;
}

var processPage = function() {
  var argosLaptops = this.evaluate(getLaptopOffers);
    if (argosLaptops!=null){
      utils.dump(argosLaptops[i]);
      for (var i=0; i < argosLaptops.length; i++){
          if (argosLaptops[i].type != undefined){
            if (isNaN(parseInt(argosLaptops[i].pricing.original))){
              continue;
            }
            if (argosLaptops[i].url.image == undefined){
              continue;
            }
            var laptopString = JSON.stringify(argosLaptops[i]);
            //this.echo (encodeURIComponent(argosTelevisions[i].url.product));
            fs.write('./argos-laptop.txt', laptopString  + "\n", 'a');
            //utils.dump(argosLaptops[i]);
          }
        }
    }else{
      this.echo('no offers');
    }
    this.exit();
};

casper.start("http://www.argos.co.uk/static/Browse/c_1/1%7Ccategory_root%7CTechnology%7C33006169/c_2/2%7C33006169%7CLaptops+and+PCs%7C33007795/c_3/3%7Ccat_33007795%7CLaptops+and+netbooks%7C33014243/fs/2/p/1/pp/Show+all/s/Relevance.htm", function() {
});

casper.run(
  processPage
);