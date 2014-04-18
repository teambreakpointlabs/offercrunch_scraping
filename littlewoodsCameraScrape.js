var utils = require('utils');
var fs = require('fs'); 
var casper = require("casper").create({
    waitTimeout: 1000,
    pageSettings: {
        userAgent: "Mozilla/5.0 (MSIE 9.0; Windows NT 6.1; Trident/5.0)"
    }
});
var currentPage = 1;
casper.options.clientScripts = ["jquery.js"];
var terminate = function() {
    this.echo("finished scraping").exit();
};

function getCameraOffers(){
  var cameraSections = $('li.product');

  var cameraOffers = Array.prototype.map.call(cameraSections, function(camera){
     var cameraOffer = {};

     var productUrl = "";
     var imageUrl = "";
     var originalPrice = "";
     var offerPrice = "";
     var savings = "";
     // var screenSize = "";
  // var properties = "";
     var screenType = "";
     var brand = "";
     var retailer = 'Littlewoods';
     var productType = 'camera';
     var percentDiscount = "";
     var description = '';
     var urlDesc = '';
     var encodedProductUrl = '';
     var skimlinksUrl = '';

     if(($(camera).find('a.productMainImage').attr('href'))!=null){
       productUrl = $(camera).find('a.productMainImage').attr('href');
       productUrl = productUrl.split('?')[0];
     }
      if(($(camera).find('.productMainImage').find('img').attr('src'))!=null){
        imageUrl = $(camera).find('.productMainImage').find('img').attr('src');
      }
     if(($(camera).find('.productTitle').find('span').text())!=null){
       description = $(camera).find('.productTitle').find('span').text();
     }
     // if(($(tv).find('prodinfo').find('prodright').find('a').attr('href'))!=null){
       // description = $(tv).find('prodinfo').find('prodright').find('a').attr('href');
       //.find('h3 a').find('span.description')
       //description = $(tv).find('prodinfo').find('prodright').find('h3 a').find('span.description');
     // }

     if(($(camera).find('dd.productWasPrice').text())!=null){
       originalPrice = $(camera).find('dd.productWasPrice').text();
       originalPrice = originalPrice.replace(/,/g, "");
       originalPrice = originalPrice.match(/[0-9]+\.?[0-9]*/);
        if (originalPrice!=null){
          originalPrice = parseFloat(originalPrice[0]);
        }else{
          return {};
         //originalPrice = "";
       }
     }

     if(($(camera).find('dd.productNowPrice').text())!=null){
       offerPrice = $(camera).find('dd.productNowPrice').text();
       offerPrice = offerPrice.replace(/,/g, "");
       offerPrice = offerPrice.match(/[0-9]+\.?[0-9]*/);
       if (offerPrice!=null){
         offerPrice = parseFloat(offerPrice[0]);
       }else{
        offerPrice = "";
       }
     }
     if(($(camera).find('dd.productSavePrice').text())!=null){
       savings = $(camera).find('dd.productSavePrice').text();
       savings = savings.replace(/,/g, "");
       savings = savings.match(/[0-9]+\.?[0-9]*/);
       if (savings!=null){
         savings = parseFloat(savings[0]);
       }else{
         savings = "";
       }
     }

     if (($(camera).find('.productTitle').find('em').text())!=null){
       brand = $(camera).find('.productTitle').find('em').text();
     }

     // if (($(camera).find('.productTitle').find('span').text())!=null){
     //   screenSize = $(camera).find('.productTitle').find('span').text();
     //   screenSize = screenSize.match(/\d{2}\.?\d+? (inch|Inch)/);
     //   if (screenSize != null){
     //     screenSize = screenSize[0];
     //     screenSize = screenSize.match(/\d{2}\.?\d+?/);
     //     screenSize = screenSize[0];
     //     screenSize = parseFloat(screenSize);
        
     //   }else{
     //    return {};
     //   }
     // }

    // make seo friendly url from description
    if (description!=''){
       urlDesc = description.replace(/\s+/g,'-').toLowerCase();
      if (urlDesc!=''){
        if (urlDesc.slice(-1)=="."){
          urlDesc = urlDesc.substring(0,urlDesc.length-1);
        }
        urlDesc = urlDesc.replace(/"/g,"");
        urlDesc = urlDesc.replace(/--/g,"");
        urlDesc = urlDesc.replace(/\//g,"-");
        urlDesc = urlDesc.replace(/,/g,"");
        urlDesc = urlDesc.replace(/&/g,"and");
       }
    }else{
      //back up if desc is not scraped
      var unique = parseFloat(Math.floor(Math.random() * 1000000000));
      urlDesc = brand + '-' + productType + '-' + unique;
    }

    // if (offerPrice >= originalPrice){
    //    return {};
    // }

    // if (urlDesc == 'e1-530-intel®-pentium®-4gb-ram-1tb-hard-drive-wifi-15.6-inch-camera-black-imr'){
    //   return {};
    // }

    encodedProductUrl = encodeURIComponent(productUrl);
    //skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1347041&site=www.specialoffershopper.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=d1cbe13e65417e162e392fc0edcccb5f&xcreo=0&sref=http%3A%2F%2Fwww.specialoffershopper.co.uk&xtz=-660';
    //skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1506902&site=www.offercrunch.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=a11734410a17086b1e3a57e4e942b244&xcreo=0&sref=http%3A%2F%2Fwww.offercrunch.co.uk&xtz=-60';
    skimlinksUrl = 'http://www.awin1.com/cread.php?awinmid=3089&awinaffid=193639&clickref=&p='+encodedProductUrl;
    
    brand = brand.toLowerCase();
    if (brand == 'fuji') brand = "fujifilm";
    retailer = retailer.toLowerCase();
      var url = {};
      var pricing = {};
      // var details = {};

      url.product = productUrl; 
      url.image = imageUrl;
      url.skimlinks = skimlinksUrl;

      pricing.original = originalPrice;
      pricing.offer = offerPrice;
      pricing.savings = savings;
      pricing.pctSavings = Math.round((savings/originalPrice)*100);


      cameraOffer.retailer = retailer;
      cameraOffer.url = url;
      cameraOffer.pricing = pricing;
      cameraOffer.brand = brand;

      // // details.screenSize = screenSize;

      // cameraOffer.details = details;
      cameraOffer.type = productType;
      cameraOffer.isValid = true;
      cameraOffer.description = description;
      cameraOffer.urlDesc = urlDesc;
      
      return cameraOffer;
     
     // if (screenSize!="" && pricing.original !=""){
     //  return tvOffer;
     // }else{
     //  return {};
     // }
  });

   return cameraOffers;
}

var processPage = function() {
    var url;
    this.echo("capturing page");
    var littlewoodsCameras = this.evaluate(getCameraOffers);
    if (littlewoodsCameras!=null){
        //utils.dump(littlewoodsCameras);
          littlewoodsCameras.forEach(function(x){
            if (x.type != undefined){
              //utils.dump(x);
              fs.write('./littlewoods-camera.txt', JSON.stringify(x)  + "\n", 'a');
            }
          });
          // var tvString = JSON.stringify(x);
          // this.echo(JSON.stringify(x));
          // if (x.type!=undefined){
          // fs.write('./littlewoodscameras.txt', JSON.stringify(x), 'a');
          // }
         // });
        //for (var i=0; i < littlewoodsTelevisions.length; i++){

          //utils.dump(littlewoodsTelevisions);
        
    this.echo('Number of offers: ' + littlewoodsCameras.length);

  }else{
    this.echo('no offers found');
  }
     

    if (currentPage >= 12 || !this.exists(".paginationNext")) {
        return terminate.call(casper);
    }
    currentPage++;
   url = this.getCurrentUrl();
    this.thenClick(".paginationNext").then(function() {
        this.waitFor(function() {
            return url !== this.getCurrentUrl();
        }, processPage, terminate);
    });
}

   

casper.start("http://www.littlewoods.com/electricals/cameras/e/b/4823.end?numProducts=100", function() {
 
});

casper.waitForSelector('.paginationNext', processPage, terminate);


casper.run();