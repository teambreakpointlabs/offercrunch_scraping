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

function getCameraOffers(){
  var cameraOfferSections = $('.resultrow.productData');

  var cameraOffers = Array.prototype.map.call(cameraOfferSections, function(cameraOffer){
    
    var camera = {};

    var productUrl, imageUrl, originalPrice, offerPrice, savings, brand, description, urlDesc = "";
    var retailer = 'Jessops';
    var productType = 'camera';
    var encodedProductUrl = "";
    var skimlinksUrl = "";

    if(($(cameraOffer).find('.imglisting.productDataImage').find('img').attr('src'))!=null){
    	imageUrl = $(cameraOffer).find('.imglisting.productDataImage').find('img').attr('src');
    }

    if(($(cameraOffer).find('.imglisting.productDataImage').attr('href'))!=null){
      productUrl = $(cameraOffer).find('.imglisting.productDataImage').attr('href');
    }

    if(($(cameraOffer).find('.productDataName').text())!=null){
      description = $(cameraOffer).find('.productDataName').text();
      brand = description.split(' ')[0];
    }

    if(($(cameraOffer).find('span.savetext').text())!=null){
      savings = $(cameraOffer).find('span.savetext').text();
      savings = savings.match(/\.?\d[\d.,]*/);
      if (savings) {
        savings = savings[0];
      }else{
        return {};
      }
    }

    if(($(cameraOffer).find('span.waspricetext').text())!=null){
      originalPrice = $(cameraOffer).find('span.waspricetext').text();
      originalPrice = originalPrice.match(/\.?\d[\d.,]*/);
      if (originalPrice){
        originalPrice = originalPrice[0];
      }
    }
    
    if(($(cameraOffer).find('span.resultprice.productDataPrice').text())!=null){
      offerPrice = $(cameraOffer).find('span.resultprice.productDataPrice').text();
      offerPrice = offerPrice.match(/\.?\d[\d.,]*/);
      if (offerPrice){
        offerPrice = offerPrice[0];
      }
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
    retailer = retailer.toLowerCase();
    //build json object
    var url = {};
    var pricing = {};
    url.product = productUrl;
    url.image = imageUrl;
    url.skimlinks = skimlinksUrl;
    pricing.original = parseFloat(originalPrice);
    pricing.offer = parseFloat(offerPrice);
    pricing.savings = parseFloat(savings);
    pricing.pctSavings = Math.round(parseFloat(savings)/parseFloat(originalPrice)*100);
    camera.url = url;
    camera.retailer = retailer;
    camera.brand = brand;
    camera.pricing = pricing;
    camera.type = productType;
    camera.description = description;
    camera.urlDesc = urlDesc;
    camera.isValid = true;
      
    return camera;
  });
   return cameraOffers;
}

var processPage = function() {
    var url;
    //this.echo("capturing page " + currentPage);
    var cameras = this.evaluate(getCameraOffers);
    if (cameras!=null){
    
      var offerCount = 0;
      for (var i=0; i < cameras.length; i++){
        var cameraString = JSON.stringify(cameras[i]);
        if (cameras[i].type != undefined){
          offerCount++;
          utils.dump(cameras[i]);
          fs.write('./jessops-camera.txt', cameraString + "\n", 'a');
        }
      }
      this.echo('Found ' + offerCount + ' offers');
    }
     
    if (currentPage >= 12 || !this.exists(".pagenextbtn")) {
        return terminate.call(casper);
    }

    currentPage++;
    //this.echo("requesting next page: " + currentPage);
    url = this.getCurrentUrl();
    this.thenClick(".pagenextbtn").then(function() {
        this.waitFor(function() {
            return url !== this.getCurrentUrl();
        }, processPage, terminate);
    });
};

casper.start("http://www.jessops.com/cameras/compact-digital-cameras?fh_view_size=100", function() {
});

casper.waitForSelector('.pagenextbtn', processPage, terminate);

casper.run();