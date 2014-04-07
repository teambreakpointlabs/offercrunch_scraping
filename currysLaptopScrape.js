var currysLaptops = [];
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

function getLaptopOffers(){
  var laptopOfferSections = $('.product.productCompare');
  var laptopOffers = Array.prototype.map.call(laptopOfferSections, function(laptop){
    
    var laptopOffer = {};

    var productUrl = "";
    var imageUrl = "";
    var originalPrice = "";
    var offerPrice = "";
    var savings = "";
    var screenSize = "";
    var properties = "";
    var brand = "";
    var retailer = 'Currys';
    var productType = 'laptop';
    var pctSavings = "";
    var description = "";
    var urlDesc = "";
    var encodedProductUrl = "";
    var skimlinksUrl = "";

    if(($(laptop).find('.productTitle').find('a').attr('href'))!=null){
      productUrl = $(laptop).find('.productTitle').find('a').attr('href');
    }
    if(($(laptop).find('.productTitle').find('a').text())!=null){
      properties = $(laptop).find('.productTitle').find('a').text();
      description = $(laptop).find('.productTitle').find('a').text();
    }
    if(($(laptop).find('img.image.respImg').attr('src'))!=null){
    	imageUrl = $(laptop).find('img.image.respImg').attr('src');
    }
    if(($(laptop).find('.previousPrice').html())!=null){
      originalPrice = $(laptop).find('.previousPrice').html();
      originalPrice = originalPrice.match(/\.?\d[\d.,]*/);
      originalPrice = originalPrice[0];
    }
    if(($(laptop).find('.offerSticker.offerSaving').html())!=null){
      savings = $(laptop).find('.offerSticker.offerSaving').html();
      savings = savings.match(/\.?\d[\d.,]*/);
      savings = savings[0];
    }
    if(($(laptop).find('.currentPrice').text())!=null){
      offerPrice = $(laptop).find('.currentPrice').text();
      offerPrice = offerPrice.match(/\.?\d[\d.,]*/);
      offerPrice = offerPrice[0];
    }

    var propertiesArr = properties.split(" ");
   
    //filter properties
    for (var i=0; i<propertiesArr.length; i++){
      if (i==0){
      	brand = propertiesArr[i];
        brand = brand.toLowerCase();
        brand = brand.charAt(0).toUpperCase() + brand.substring(1);
      }
    }
      //screen
      if ((properties.match(/\d{2}\.?\d?"/))){
        screenSize = properties.match(/\d{2}\.?\d?"/);
        screenSize = screenSize[0];
        screenSize = screenSize.replace('/\\/','');
      }

      //make seo friendly url from description
    if (properties!=''){
       urlDesc = properties.replace(/\s+/g,'-').toLowerCase();
      if (urlDesc!=''){
        if (urlDesc.slice(-1)=="."){
          urlDesc = urlDesc.substring(0,urlDesc.length-1);
        }
        urlDesc = urlDesc.replace(/--/g,"");
        urlDesc = urlDesc.replace(/["”]/g,"");
        urlDesc = urlDesc.replace(/\//g,"-");
        urlDesc = urlDesc.replace(/,/g,"-");
        urlDesc = urlDesc.replace(/&/g,"and");
       }
    }else{
      //back up if desc is not scraped
      var unique = parseFloat(Math.floor(Math.random() * 1000000000));
      urlDesc = brand + '-' + productType + '-' + unique;
    }

    if (brand == 'Hp'){
      brand = 'HP';
    }
    
   
  encodedProductUrl = encodeURIComponent(productUrl);
  //skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1347041&site=www.specialoffershopper.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=d1cbe13e65417e162e392fc0edcccb5f&xcreo=0&sref=http%3A%2F%2Fwww.specialoffershopper.co.uk&xtz=-660';
  skimlinksUrl = 'http://www.awin1.com/cread.php?awinmid=1599&awinaffid=193639&clickref=&p='+encodedProductUrl;

    brand = brand.toLowerCase();
    if (brand == 'packard') brand = 'packard bell';
    retailer = retailer.toLowerCase();

if(originalPrice != null && offerPrice != null){
  
  if (parseFloat(originalPrice) == 1){
    return {};
  }

  var url = {};
  var pricing = {};
  var details = {};
  url.product = productUrl;
  url.image = imageUrl;
  url.skimlinks = skimlinksUrl;
  pricing.original = parseFloat(originalPrice);
  pricing.offer = parseFloat(offerPrice);
  pricing.savings = parseFloat(savings);
  details.screenSize = parseFloat(screenSize);
  laptopOffer.url = url;
  laptopOffer.details = details;
  laptopOffer.retailer = retailer;
  laptopOffer.type = productType;
  laptopOffer.brand = brand;
  laptopOffer.isValid = true;
  laptopOffer.description = description;
  laptopOffer.urlDesc = urlDesc;

  pctSavings = Math.ceil((savings)/originalPrice * 100);
    pricing.pctSavings = pctSavings;
    laptopOffer.pricing = pricing;
  }
    return laptopOffer;
  });
  return laptopOffers;
}

var processPage = function() {
    var url;
    //this.echo("capturing page " + currentPage);
    var currysLaptops = this.evaluate(getLaptopOffers);
    if (currysLaptops!=null){
       for (var i=0; i < currysLaptops.length; i++){
          if (currysLaptops[i].type != undefined){
            if (isNaN(parseInt(currysLaptops[i].pricing.original))){
              continue;
            }
            var laptopString = JSON.stringify(currysLaptops[i]);
            fs.write('./currys-laptop.txt', laptopString + "\n", 'a');
            //this.echo(laptopString);
            utils.dump(currysLaptops[i]);
          }
        }
      }else{
        this.echo('no offers found');
      }
    

    //this.capture("currys-results-p" + currentPage + ".png");

    if (currentPage >= 12 || !this.exists(".next")) {
        return terminate.call(casper);
    }

    currentPage++;
    //this.echo("requesting next page: " + currentPage);
    url = this.getCurrentUrl();
    this.thenClick(".next").then(function() {
        this.waitFor(function() {
            return url !== this.getCurrentUrl();
        }, processPage, terminate);
    });
};

casper.start("http://www.currys.co.uk/gbuk/computing/laptops/laptops/315_3226_30328_xx_xx/xx-criteria.html", function() {
 //http://www.currys.co.uk/gbuk/tv-dvd-blu-ray/televisions/small-screen-tvs-up-to-32/301_3915_31642_xx_xx/xx-criteria.html
});

casper.waitForSelector('.next', processPage, terminate);

casper.run();