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

function getTabletOffers(){
  var tabletOfferSections = $('li.item');

  var tabletOffers = Array.prototype.map.call(tabletOfferSections, function(tablet){
    var tabletOffer = {};

    var productUrl, imageUrl, originalPrice, offerPrice, savings, screenSize, properties, brand, pctSavings = "";
    var retailer = 'Argos';
    var productType = 'tablet';
    var description = '';
    var urlDesc = '';
    var encodedProductUrl = '';
    var skimlinksUrl = '';

    if(($(tablet).find('dt.title').find('a').attr('href'))!=null){
      productUrl = $(tablet).find('dt.title').find('a').attr('href');
    }

    if(($(tablet).find('dt.title').find('a.desc.nogrouping').text())!=null){
      description = $(tablet).find('dt.title').find('a.desc.nogrouping').text();
    }

    if(($(tablet).find('dd.image.scene7 a').find('img').attr('src'))!=null){
      imageUrl = $(tablet).find('dd.image.scene7 a').find('img').attr('src');
    }

    if(($(tablet).find('span.main').text())!=null){
      offerPrice = $(tablet).find('span.main').text();
      offerPrice =  offerPrice.match(/\.?\d[\d.,]*/);
      if (offerPrice!=null){
        offerPrice = offerPrice[0];
        offerPrice = parseFloat(offerPrice);
      }else{
        offerPrice = '';
      }
      
    }
   
    if(($(tablet).find('span.wasPrice').text())!=null){
      originalPrice = $(tablet).find('span.wasPrice').text();
      originalPrice = originalPrice.match(/\.?\d[\d.,]*/);
      if (originalPrice!=null){
        originalPrice = originalPrice[0];
        originalPrice = parseFloat(originalPrice);
      }else{
        originalPrice = '';
      }
    }
    
    if(($(tablet).find('span.savePrice').text())!=null){
      savings =  $(tablet).find('span.savePrice').text();
      if (savings.match(/%/)){
        if (savings!=null && originalPrice!='' && offerPrice!=''){
          savings = originalPrice - offerPrice;
          savings = Math.ceil(parseFloat(savings));
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
      if (savings == 1){
        savings = originalPrice - offerPrice;
        savings = Math.ceil(parseFloat(savings));
      }
    }
    
    if(($(tablet).find('dt.title').find('a').text())!=null){
      var properties = $(tablet).find('dt.title').find('a').text();
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
    }else{
      //back up if desc is not scraped
      var unique = parseFloat(Math.floor(Math.random() * 1000000000));
      urlDesc = brand + '-' + productType + '-' + unique;
    }

    encodedProductUrl = encodeURIComponent(productUrl);
    //skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1347041&site=www.specialoffershopper.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=d1cbe13e65417e162e392fc0edcccb5f&xcreo=0&sref=http%3A%2F%2Fwww.specialoffershopper.co.uk&xtz=-660';
    skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1506902&site=www.offercrunch.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=a11734410a17086b1e3a57e4e942b244&xcreo=0&sref=http%3A%2F%2Fwww.offercrunch.co.uk&xtz=-60';



    brand = brand.toLowerCase();
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
    tabletOffer.url = url;
    tabletOffer.details = details;
    tabletOffer.retailer = retailer;
    tabletOffer.type = productType;
    tabletOffer.brand = brand;
    tabletOffer.urlDesc = urlDesc;
    tabletOffer.description = description;

    //percentage discount
    pctSavings = Math.round((savings)/originalPrice * 100);
    pricing.pctSavings = pctSavings;
    tabletOffer.pricing = pricing;
    tabletOffer.isValid = true;
    
    }
      return tabletOffer;
  });
  return tabletOffers;
}

var processPage = function() {
  var argosTablets = this.evaluate(getTabletOffers);
    if (argosTablets!=null){
      for (var i=0; i < argosTablets.length; i++){
          if (argosTablets[i].type != undefined){
            if (isNaN(parseInt(argosTablets[i].pricing.original))){
              continue;
            }
            var tabletString = JSON.stringify(argosTablets[i]);
            fs.write('./argos-tablet.txt', tabletString  + "\n", 'a');
            //utils.dump(argosTablets[i]);
          }
        }
    }else{
      this.echo('no offers');
    }
    this.exit();
};

casper.start("http://www.argos.co.uk/static/Browse/c_1/1%7Ccategory_root%7CTechnology%7C33006169/c_2/2%7C33006169%7CiPad%2C+tablets+and+E-readers%7C33007659/c_3/3%7Ccat_33007659%7CiPad+and+tablets%7C33014087/c_4/4%7Ccat_33014087%7CTablets%7C33025327/fs/2/p/1/pp/Show+all/s/Relevance.htm", function() {
});

casper.run(
  processPage
);