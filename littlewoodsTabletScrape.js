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

function getTabletOffers(){
  var tabletSections = $('li.product');

  var tabletOffers = Array.prototype.map.call(tabletSections, function(tablet){
     var tabletOffer = {};

     var productUrl = "";
     var imageUrl = "";
     var originalPrice = "";
     var offerPrice = "";
     var savings = "";
  // var properties = "";
     var screenType = "";
     var brand = "";
     var retailer = 'Littlewoods';
     var productType = 'tablet';
     var percentDiscount = "";
     var description = '';
     var urlDesc = '';
     var encodedProductUrl = "";
     var skimlinksUrl = "";

     if(($(tablet).find('a.productMainImage').attr('href'))!=null){
       productUrl = $(tablet).find('a.productMainImage').attr('href');
       productUrl = productUrl.split('?')[0];
     }
      if(($(tablet).find('.productMainImage').find('img').attr('src'))!=null){
        imageUrl = $(tablet).find('.productMainImage').find('img').attr('src');
      }
     if(($(tablet).find('.productTitle').find('span').text())!=null){
       description = $(tablet).find('.productTitle').find('span').text();
     }
     // if(($(tv).find('prodinfo').find('prodright').find('a').attr('href'))!=null){
       // description = $(tv).find('prodinfo').find('prodright').find('a').attr('href');
       //.find('h3 a').find('span.description')
       //description = $(tv).find('prodinfo').find('prodright').find('h3 a').find('span.description');
     // }

     if(($(tablet).find('dd.productWasPrice').text())!=null){
       originalPrice = $(tablet).find('dd.productWasPrice').text();
       originalPrice = originalPrice.replace(/,/g, "");
       originalPrice = originalPrice.match(/[0-9]+\.?[0-9]*/);
        if (originalPrice!=null){
          originalPrice = parseFloat(originalPrice[0]);
        }else{
          return {};
         //originalPrice = "";
       }
     }

     if(($(tablet).find('dd.productNowPrice').text())!=null){
       offerPrice = $(tablet).find('dd.productNowPrice').text();
       offerPrice = offerPrice.replace(/,/g, "");
       offerPrice = offerPrice.match(/[0-9]+\.?[0-9]*/);
       if (offerPrice!=null){
         offerPrice = parseFloat(offerPrice[0]);
       }else{
        offerPrice = "";
       }
     }
     if(($(tablet).find('dd.productSavePrice').text())!=null){
       savings = $(tablet).find('dd.productSavePrice').text();
       savings = savings.replace(/,/g, "");
       savings = savings.match(/[0-9]+\.?[0-9]*/);
       if (savings!=null){
         savings = parseFloat(savings[0]);
       }else{
         savings = "";
       }
     }

     if (($(tablet).find('.productTitle').find('em').text())!=null){
       brand = $(tablet).find('.productTitle').find('em').text();
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

    encodedProductUrl = encodeURIComponent(productUrl);
    //skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1347041&site=www.specialoffershopper.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=d1cbe13e65417e162e392fc0edcccb5f&xcreo=0&sref=http%3A%2F%2Fwww.specialoffershopper.co.uk&xtz=-660';
    skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1506902&site=www.offercrunch.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=a11734410a17086b1e3a57e4e942b244&xcreo=0&sref=http%3A%2F%2Fwww.offercrunch.co.uk&xtz=-60';

    brand = brand.toLowerCase();
    retailer = retailer.toLowerCase();


      var url = {};
      var pricing = {};

      url.product = productUrl; 
      url.image = imageUrl;
      url.skimlinks = skimlinksUrl;

      pricing.original = originalPrice;
      pricing.offer = offerPrice;
      pricing.savings = savings;
      pricing.pctSavings = Math.round((savings/originalPrice)*100);


      tabletOffer.retailer = retailer;
      tabletOffer.url = url;
      tabletOffer.pricing = pricing;
      tabletOffer.brand = brand;

      tabletOffer.type = productType;
      tabletOffer.isValid = true;
      tabletOffer.description = description;
      tabletOffer.urlDesc = urlDesc;
      
      return tabletOffer;
     
     // if (screenSize!="" && pricing.original !=""){
     //  return tvOffer;
     // }else{
     //  return {};
     // }
  });

   return tabletOffers;
}


var processPage = function() {
    var url;
    this.echo("capturing page");
    var littlewoodsTablets = this.evaluate(getTabletOffers);
    if (littlewoodsTablets!=null){
        utils.dump(littlewoodsTablets);
           littlewoodsTablets.forEach(function(x){
             if (x.type != undefined){
               //utils.dump(x);
               fs.write('./littlewoods-tablet.txt', JSON.stringify(x)  + "\n", 'a');
             }
          });
          // var tvString = JSON.stringify(x);
          // this.echo(JSON.stringify(x));
          // if (x.type!=undefined){
          // fs.write('./littlewoodstablets.txt', JSON.stringify(x), 'a');
          // }
         // });
        //for (var i=0; i < littlewoodsTelevisions.length; i++){

          //utils.dump(littlewoodsTelevisions);
        
    this.echo('Number of offers: ' + littlewoodsTablets.length);

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

   

casper.start("http://www.littlewoods.com/electricals/tablets-e-readers/tablets/e/b/101008.end?numProducts=100", function() {
 
});

casper.waitForSelector('.paginationNext', processPage, terminate);


casper.run();