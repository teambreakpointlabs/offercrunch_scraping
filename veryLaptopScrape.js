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
  var tvOfferSections = $('li.product');

  var tvOffers = Array.prototype.map.call(tvOfferSections, function(tv){
     var tvOffer = {};

      var productUrl = "";
      var imageUrl = "";
      var originalPrice = "";
      var offerPrice = "";
      var savings = "";
      var screenSize = "";
  // var properties = "";
     // var screenType = "";
     var brand = "";
     var retailer = 'Very';
     var productType = 'laptop';
     var pctSavings = "";
     var description = "";
     var urlDesc = "";

    if(($(tv).find('div.productInfo').find('a.productTitle').attr('href'))!=null){
      productUrl = $(tv).find('div.productInfo').find('a.productTitle').attr('href');
    }
    if(($(tv).find('div.productImages.productWarranty').find('a.productMainImage').find('img').attr('src'))!=null){
      imageUrl = $(tv).find('div.productImages.productWarranty').find('a.productMainImage').find('img').attr('src');
    }

    if(($(tv).find('div.productInfo').find('a.productTitle').find('h3').find('span').text())!=null){
      description = $(tv).find('div.productInfo').find('a.productTitle').find('h3').find('span').text();
      screenSize = $(tv).find('div.productInfo').find('a.productTitle').find('h3').find('span').text();
      screenSize = screenSize.match(/[0-9]+\.?[0-9]* inch/);
      if (screenSize == null){
        screenSize = '';
      }else{
        screenSize = screenSize[0];
        screenSize = screenSize.match((/[0-9]+\.?[0-9]*/));
        screenSize = screenSize[0];
        screenSize = parseFloat(screenSize);
      }
    }
     // if(($(tv).find('prodinfo').find('prodright').find('a').attr('href'))!=null){
       // description = $(tv).find('prodinfo').find('prodright').find('a').attr('href');
       //.find('h3 a').find('span.description')
       //description = $(tv).find('prodinfo').find('prodright').find('h3 a').find('span.description');
     // }

     if(($(tv).find('div.productInfo').find('a.productPrice').find('dl dd.productWasPrice').text())!=null){
       originalPrice = $(tv).find('div.productInfo').find('a.productPrice').find('dl dd.productWasPrice').text();
       originalPrice = originalPrice.replace(/,/g, "");
       originalPrice = originalPrice.replace(/£/g, "");
       originalPrice = originalPrice.replace(/Was\s/g, "");
       originalPrice = parseFloat(originalPrice);
      }

      if(($(tv).find('div.productInfo').find('a.productPrice').find('dl dd.productNowPrice').text())!=null){
       offerPrice = $(tv).find('div.productInfo').find('a.productPrice').find('dl dd.productNowPrice').text();
       offerPrice = offerPrice.replace(/,/g, "");
       offerPrice = offerPrice.replace(/£/g, "");
       offerPrice = offerPrice.replace(/Now\s/g, "");
       offerPrice = parseFloat(offerPrice);
      }

      if(($(tv).find('div.productInfo').find('a.productPrice').find('dl dd.productSavePrice').text())!=null){
       savings = $(tv).find('div.productInfo').find('a.productPrice').find('dl dd.productSavePrice').text();
       savings = savings.replace(/,/g, "");
       savings = savings.replace(/£/g, "");
       savings = savings.replace(/Save\s/g, "");
       savings = parseFloat(savings);

      }

      if(($(tv).find('div.productInfo').find('a.productTitle').find('h3 em').text())!=null){
        brand = $(tv).find('div.productInfo').find('a.productTitle').find('h3 em').text();
      }

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
       }
    }else{
      //back up if desc is not scraped
      var unique = parseFloat(Math.floor(Math.random() * 1000000000));
      urlDesc = brand + '-' + productType + '-' + unique;
    }


       
     // }
     // if(($(tv).find('div.prodinfo').find('div.prodleft').find('dl.price').find('dd span.was').text())!=null){
     //   offerPrice = $(tv).find('div.prodinfo').find('div.prodleft').find('dl.price').find('dd span.now').text();
     //   offerPrice = offerPrice.replace(/,/g, "");
     //   offerPrice = offerPrice.match(/[0-9]+\.?[0-9]*/);
     //   if (offerPrice!=null){
     //     offerPrice = parseFloat(offerPrice[0]);
     //   }else{
     //    offerPrice = "";
     //   }
     // }
     // if(($(tv).find('div.prodinfo').find('div.prodleft').find('dl.price').find('dd span.was').text())!=null){
     //   savings = $(tv).find('div.prodinfo').find('div.prodleft').find('dl.price').find('dd span.save').text();
     //   savings = savings.replace(/,/g, "");
     //   savings = savings.match(/[0-9]+\.?[0-9]*/);
     //   if (savings!=null){
     //     savings = parseFloat(savings[0]);
     //   }else{
     //     savings = "";
     //   }
     // }

     // if (($(tv).find('div.prodinfo').find('div.prodright').find('h3 a em.brand').text())!=null){
     //   brand = $(tv).find('div.prodinfo').find('div.prodright').find('h3 a em.brand').text();
     // }

     // if (($(tv).find('div.prodinfo').find('div.prodright').find('h3 a span.description').text())!=null){
     //   screenSize = $(tv).find('div.prodinfo').find('div.prodright').find('h3 a span.description').text();
     //   screenSize = screenSize.match(/\d{2}\.?\d+? (inch|Inch)/);
     //   if (screenSize != null){
     //     screenSize = screenSize[0];
     //     screenSize = screenSize.match(/\d{2}\.?\d+?/);
     //     screenSize = screenSize[0];
     //     screenSize = parseFloat(screenSize);
        
     //   }else{
     //     screenSize = "";
     //   }
     // }

    brand = brand.toLowerCase();
    retailer = retailer.toLowerCase();

      
      var url = {};
      var pricing = {};
      var details = {};

      url.product = productUrl; 
      url.image = imageUrl;

      pricing.original = originalPrice;
      pricing.offer = offerPrice;
      pricing.savings = savings;
      pricing.pctSavings = Math.round((savings/originalPrice)*100);


     tvOffer.retailer = retailer;
     tvOffer.type = productType;
     tvOffer.url = url;
     tvOffer.pricing = pricing;
     tvOffer.brand = brand;
     tvOffer.isValid = true;
     tvOffer.description = description;
     tvOffer.urlDesc = urlDesc;

      details.screenSize = screenSize;

      tvOffer.details = details;
     // tvOffer.type = productType;

     // if (screenSize!="" && pricing.original !=""){
       return tvOffer;
     // }else{
      // return {};
     // }
  });

   return tvOffers;
}

var processPage = function() {
    var url;
    this.echo("capturing page");
    var littlewoodsTelevisions = this.evaluate(getTelevisionOffers);
    if (littlewoodsTelevisions!=null){
        utils.dump(littlewoodsTelevisions);
          littlewoodsTelevisions.forEach(function(x){
             fs.write('./very-laptop.txt', JSON.stringify(x) + "\n", 'a');
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
     
  this.exit();
}

   

casper.start("http://www.very.co.uk/electricals/laptops/e/b/4873/promo/cyber-deals.end?sort=price,1&numProducts=30", function() {
 
});


casper.run(
   processPage
);
