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
  var tvOfferSections = $('ul#products-listing.products-grid.clear > li');

  var tvOffers = Array.prototype.map.call(tvOfferSections, function(tv){
    var tvOffer = {};

    var productUrl, imageUrl, originalPrice, offerPrice, savings, screenSize, properties, brand, pctSavings = "";
    var retailer = 'COOP Electrical';
    var productType = 'laptop';
    var description = '';
    var urlDesc = '';
    var encodedProductUrl = '';
    var skimlinksUrl = '';

    if(($(tv).find('div.product-image').find('a').attr('href'))!=null){
      productUrl = 'http://www.coopelectricalshop.co.uk' + $(tv).find('div.product-image').find('a').attr('href');
    }
    if(($(tv).find('div.product-image').find('img').attr('src'))!=null){
      imageUrl = $(tv).find('div.product-image').find('img').attr('src');
    }

    if(($(tv).find('div.product-details').find('p').find('a').text())!=null){
      description = $(tv).find('div.product-details').find('p').find('a').text();
    }

    if(($(tv).find('div.product-order-details').find('strong').text())!=null){
      offerPrice = $(tv).find('div.product-order-details').find('strong').text()
      offerPrice = offerPrice.replace(",","");
      offerPrice =  offerPrice.match(/\.?\d[\d.,]*/);
      if (offerPrice!=null){
        offerPrice = offerPrice[0];
        offerPrice = parseFloat(offerPrice);
      }else{
        offerPrice = '';
      }
      
    }
   
    if(($(tv).find('del').text())!=null){
      originalPrice = $(tv).find('del').text();
      originalPrice = originalPrice.replace(",","");
      originalPrice = originalPrice.match(/\.?\d[\d.,]*/);
      if (originalPrice!=null){
        originalPrice = originalPrice[0];
        originalPrice = parseFloat(originalPrice);
      }else{
        //no offer
        return {};
      }
    }
    
    if(($(tv).find('em').text())!=null){
      savings =  $(tv).find('em').text();
      savings = savings.match(/\.?\d[\d.,]*/);
      if (savings!=null){
          savings = savings[0];
          savings = parseFloat(savings);
        }else{
          savings = '';
        }
      }

      if (description != ''){
        screenSize = description.match(/\d{2}\.?\d?"/);
        if (screenSize !=null){
          screenSize = parseFloat(screenSize[0]);
        }else{
          screenSize = '';
        }
        brand = description.split(' ')[0];
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
        urlDesc = urlDesc.replace(/\//g,"-");
        urlDesc = urlDesc.replace(/,/g,"-");
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
    details.screenSize = screenSize;
    tvOffer.url = url;
    tvOffer.details = details;
    tvOffer.retailer = retailer;
    tvOffer.type = productType;
    tvOffer.description = description;
    tvOffer.brand = brand;
    tvOffer.urlDesc = urlDesc;

    // //percentage discount
    pctSavings = Math.ceil((savings)/originalPrice * 100);
    pricing.pctSavings = pctSavings;
    
    tvOffer.pricing = pricing;
    tvOffer.isValid = true;

    return tvOffer;
  });
  return tvOffers;
}

var processPage = function() {
  var argosTelevisions = this.evaluate(getTelevisionOffers);
    if (argosTelevisions!=null){
      for (var i=0; i < argosTelevisions.length; i++){
           if (argosTelevisions[i].type != undefined){
            // if (isNaN(parseInt(argosTelevisions[i].pricing.original))){
            //   continue;
            // }
            var televisionString = JSON.stringify(argosTelevisions[i]);
            fs.write('./coop electrical-laptop.txt', televisionString + "\n", 'a');
            utils.dump(argosTelevisions[i]);
           }
        }
        this.echo(argosTelevisions.length);
    }else{
      this.echo('no offers');
    }
    this.exit();
};

casper.start("http://www.coopelectricalshop.co.uk/Computing/Laptops+Parent+Group/Laptops/fd/c/c/c?pgsz=all#content", function() {
});

casper.run(
  processPage
);