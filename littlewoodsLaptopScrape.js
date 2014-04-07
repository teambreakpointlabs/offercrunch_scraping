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

function getTelevisionOffers(){
  var laptopSections = $('li.product');

  var laptopOffers = Array.prototype.map.call(laptopSections, function(laptop){
     var laptopOffer = {};

     var productUrl = "";
     var imageUrl = "";
     var originalPrice = "";
     var offerPrice = "";
     var savings = "";
     var screenSize = "";
  // var properties = "";
     var screenType = "";
     var brand = "";
     var retailer = 'Littlewoods';
     var productType = 'laptop';
     var percentDiscount = "";
     var description = '';
     var urlDesc = '';
     var encodedProductUrl = "";
     var skimlinksUrl = '';

     if(($(laptop).find('a.productMainImage').attr('href'))!=null){
       productUrl = $(laptop).find('a.productMainImage').attr('href');
       productUrl = productUrl.split('?')[0];
     }
      if(($(laptop).find('.productMainImage').find('img').attr('src'))!=null){
        imageUrl = $(laptop).find('.productMainImage').find('img').attr('src');
      }
     if(($(laptop).find('.productTitle').find('span').text())!=null){
       description = $(laptop).find('.productTitle').find('span').text();
     }
     // if(($(tv).find('prodinfo').find('prodright').find('a').attr('href'))!=null){
       // description = $(tv).find('prodinfo').find('prodright').find('a').attr('href');
       //.find('h3 a').find('span.description')
       //description = $(tv).find('prodinfo').find('prodright').find('h3 a').find('span.description');
     // }

     if(($(laptop).find('dd.productWasPrice').text())!=null){
       originalPrice = $(laptop).find('dd.productWasPrice').text();
       originalPrice = originalPrice.replace(/,/g, "");
       originalPrice = originalPrice.match(/[0-9]+\.?[0-9]*/);
        if (originalPrice!=null){
          originalPrice = parseFloat(originalPrice[0]);
        }else{
          return {};
         //originalPrice = "";
       }
     }

     if(($(laptop).find('dd.productNowPrice').text())!=null){
       offerPrice = $(laptop).find('dd.productNowPrice').text();
       offerPrice = offerPrice.replace(/,/g, "");
       offerPrice = offerPrice.match(/[0-9]+\.?[0-9]*/);
       if (offerPrice!=null){
         offerPrice = parseFloat(offerPrice[0]);
       }else{
        offerPrice = "";
       }
     }
     if(($(laptop).find('dd.productSavePrice').text())!=null){
       savings = $(laptop).find('dd.productSavePrice').text();
       if (savings.indexOf("Up")!= -1){
         return {};
       }
       savings = savings.replace(/,/g, "");
       savings = savings.match(/[0-9]+\.?[0-9]*/);
       if (savings!=null){
         savings = parseFloat(savings[0]);
       }else{
         savings = "";
       }
     }

     if (($(laptop).find('.productTitle').find('em').text())!=null){
       brand = $(laptop).find('.productTitle').find('em').text();
     }

     if (($(laptop).find('.productTitle').find('span').text())!=null){
       screenSize = $(laptop).find('.productTitle').find('span').text();
       screenSize = screenSize.match(/\d{2}\.?\d+? (inch|Inch)/);
       if (screenSize != null){
         screenSize = screenSize[0];
         screenSize = screenSize.match(/\d{2}\.?\d+?/);
         screenSize = screenSize[0];
         screenSize = parseFloat(screenSize);
        
       }else{
        return {};
       }
     }

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

    if (offerPrice >= originalPrice){
       return {};
    }

    if (productUrl == 'http://www.littlewoods.com/acer-e1-530-intelreg-pentiumreg-processor-4gb-ram-1tb-hard-drive-wi-fi-156-inch-laptop-black-imr/1338679591.prd'){
      return {};
    }

    if (brand == 'Hp'){
      brand = 'HP';
    }



    encodedProductUrl = encodeURIComponent(productUrl);
    //skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1347041&site=www.specialoffershopper.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=d1cbe13e65417e162e392fc0edcccb5f&xcreo=0&sref=http%3A%2F%2Fwww.specialoffershopper.co.uk&xtz=-660';
    skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1506902&site=www.offercrunch.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=a11734410a17086b1e3a57e4e942b244&xcreo=0&sref=http%3A%2F%2Fwww.offercrunch.co.uk&xtz=-60';

    brand = brand.toLowerCase();
    if (brand == 'packard') brand = 'packard bell';
    retailer = retailer.toLowerCase();

      var url = {};
      var pricing = {};
      var details = {};

      url.product = productUrl; 
      url.image = imageUrl;
      url.skimlinks = skimlinksUrl;

      pricing.original = originalPrice;
      pricing.offer = offerPrice;
      pricing.savings = savings;
      pricing.pctSavings = Math.round((savings/originalPrice)*100);


      laptopOffer.retailer = retailer;
      laptopOffer.url = url;
      laptopOffer.pricing = pricing;
      laptopOffer.brand = brand;

      details.screenSize = screenSize;

      laptopOffer.details = details;
      laptopOffer.type = productType;
      laptopOffer.isValid = true;
      laptopOffer.description = description;
      laptopOffer.urlDesc = urlDesc;
      
      return laptopOffer;
     
     // if (screenSize!="" && pricing.original !=""){
     //  return tvOffer;
     // }else{
     //  return {};
     // }
  });

   return laptopOffers;
}

var processPage = function() {
    var url;
    this.echo("capturing page");
    var littlewoodsTelevisions = this.evaluate(getTelevisionOffers);
    if (littlewoodsTelevisions!=null){
        //utils.dump(littlewoodsTelevisions);
          littlewoodsTelevisions.forEach(function(x){
            if (x.type != undefined){
              //utils.dump(x);
              fs.write('./littlewoods-laptop.txt', JSON.stringify(x)  + "\n", 'a');
            }
          });
          // var tvString = JSON.stringify(x);
          // this.echo(JSON.stringify(x));
          // if (x.type!=undefined){
          // fs.write('./littlewoodsLaptops.txt', JSON.stringify(x), 'a');
          // }
         // });
        //for (var i=0; i < littlewoodsTelevisions.length; i++){

          //utils.dump(littlewoodsTelevisions);
        
    this.echo('Number of offers: ' + littlewoodsTelevisions.length);

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

   

casper.start("http://www.littlewoods.com/electricals/laptops/e/b/4873.end?numProducts=100", function() {
 
});

casper.waitForSelector('.paginationNext', processPage, terminate);


casper.run();