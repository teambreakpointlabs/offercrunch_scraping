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
  var tvOfferSections = $('div.product-listing');

  var tvOffers = Array.prototype.map.call(tvOfferSections, function(tv){
      var tvOffer = {};

      var productUrl, imageUrl, offerPrice = "";
    	var newPrice = "";
      var discount = "";
    	var screenSize = "";
    	var properties = "";
    	//var screenType = "";
    	var brand = "";
    	var retailer = 'ebuyer';
    	var productType = 'laptop';
    	var percentDiscount = "";
      var description = "";
      var urlDesc = "";
      var encodedProductUrl = "";
      var skimlinksUrl = "";


    var brands = ['ACER','Acer','Asus','Dell','Extra Value','Fujitsu','HP','Hewlett Packard','Lenovo','Samsung','Sony','Toshiba','Zoostrom'];


     if(($(tv).find('.title-holder').find('h3').text()!=null)){
       description = $(tv).find('.title-holder').find('h3').text();
       

       screenSize = $(tv).find('.title-holder').text();
        screenSize = screenSize.match(/\d{2}\.?\d?"/);
        if (screenSize != null){
         screenSize = screenSize[0].match(/\d{2}\.?\d?/);
         screenSize = screenSize[0];
        }

       for (var i=0;i<brands.length;i++){
        var brandToCheck = brands[i];
        if (description.match(brandToCheck)){
          brand = brandToCheck;
          brand = brand.toLowerCase();
          if (brand === 'hewlett packard') brand = 'hp';
          break;
        }
       }
   
     }

     if(($(tv).find('.image-holder').find('a').attr('href'))!=null){
       productUrl = $(tv).find('.image-holder').find('a').attr('href');
     }

     if(($(tv).find('.image-holder').find('img').attr('src'))!=null){
       imageUrl = $(tv).find('.image-holder').find('img').attr('src');
     }

     if(($(tv).find('.price-holder').find('span.inc.price-lrg').text())!=null){
       offerPrice = $(tv).find('.price-holder').find('span.inc.price-lrg').text();
       offerPrice = offerPrice.replace("£","");
       offerPrice = parseFloat(offerPrice);
     }

     if(($(tv).find('.priceSavingLine').find('span.inc.was').text())!=null){
       originalPrice = $(tv).find('.priceSavingLine').find('span.inc.was').text();
       originalPrice = originalPrice.replace("£","");
       originalPrice = parseFloat(originalPrice);
     }

     if(($(tv).find('.priceSavingLine').find('span.red').find('span.inc').text())!=null){
       savings = $(tv).find('.priceSavingLine').find('span.red').find('span.inc').text();
       savings = savings.replace("£","");
       savings = parseFloat(savings);
     }

      



    //      //make seo friendly url from description
    if (description!=''){
      urlDesc = description.replace(/\s+/g,'-').toLowerCase();
       if (urlDesc!=''){
        if (urlDesc.slice(-1)=="."){
          urlDesc = urlDesc.substring(0,urlDesc.length-1);
        }
        urlDesc = urlDesc.replace(/"/g,"");
        urlDesc = urlDesc.replace(/--/g,"");
        urlDesc = urlDesc.replace(/\//g,"-");
        urlDesc = urlDesc.replace(/&/g,"and");
        urlDesc = urlDesc.replace(/”/g,"");
        urlDesc = urlDesc.replace(/\./g,"-");
        urlDesc = urlDesc + "-offer";
       }
    }else{
      //back up if desc is not scraped
      var unique = parseFloat(Math.floor(Math.random() * 1000000000));
      urlDesc = brand + '-' + productType + '-' + unique;
    }

     
     

  encodedProductUrl = encodeURIComponent(productUrl);
  skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1506902&site=www.offercrunch.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=a11734410a17086b1e3a57e4e942b244&xcreo=0&sref=http%3A%2F%2Fwww.offercrunch.co.uk&xtz=-60';


  
    var url = {};
    var pricing = {};
    var details = {};
    url.product = productUrl;
    url.image = imageUrl;
    url.skimlinks = skimlinksUrl;
    pricing.original = originalPrice;
    pricing.offer = offerPrice;
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
    details.screenSize = parseFloat(screenSize);
    //details.screenType = screenType;
    tvOffer.url = url;
    tvOffer.details = details;
    tvOffer.retailer = retailer;
    tvOffer.pricing = pricing;
    tvOffer.type = 'laptop';
    tvOffer.brand = brand;
    tvOffer.description = description;
    tvOffer.urlDesc = urlDesc;
    tvOffer.isValid = true;
// }else{
// 	return {};
// }
      // tvOffer.push(productUrl);
      // tvOffer.push(imageUrl);
      // tvOffer.push(oldPrice);
      // tvOffer.push(discount);
      // tvOffer.push(newPrice);
      // tvOffer.push(retailer);
      // tvOffer.push(make);
      // tvOffer.push(screenSize);
      // tvOffer.push(tvType);
      // tvOffer.push(productType);

      
      	//work out percent discount
        // var oldPriceFloat = parseFloat(oldPrice);
        // var discountFloat = parseFloat(discount);
        // var percentDiscount = Math.ceil(discount/oldPrice * 100);

      
      // tvOffer.push(percentDiscount);
// }

      return tvOffer;
   });
  //get those with money off
  // var tvOffersDiscounted = [];
  // for (var i=0;i<tvOffers.length;i++){
  // 	if(tvOffers[i][2]!=null){
  // 		tvOffersDiscounted.push(tvOffers[i]);
  // 	}
  // }
   // return tvOffersDiscounted;
   return tvOffers;
}

var processPage = function() {
    var url;
    //this.echo("capturing page " + currentPage);
    var currysTelevisions = this.evaluate(getTelevisionOffers);
    if (currysTelevisions!=null){
   

          // utils.dump(currysTelevisions);
           for (var i=0; i < currysTelevisions.length; i++){
            if (currysTelevisions[i].pricing === undefined){
              continue;
            }
            if (currysTelevisions[i].details.screenSize === ''){
              continue;
            }
           // utils.dump(currysTelevisions[i]);
            if (currysTelevisions[i].pricing.original != undefined){
            // / this.echo(currysTelevisions[i].pricing.original);
             // if (isNaN(parseInt(currysTelevisions[i].pricing.original))){
               // continue;
             // }
               // utils.dump(currysTelevisions[i]);
            var televisionString = JSON.stringify(currysTelevisions[i]);
            fs.write('./ebuyer-laptop.txt', televisionString + "\n", 'a');
             utils.dump(currysTelevisions[i]);
            }
          }
      }
      //this.echo(currysTelevisions.length);
      //utils.dump(currysTelevisions);

      // for (var i=0; i<currysTelevisions.length;i++){

      	 
      	 // var tvString = '';
     
      	 // for (var j=0; j<currysTelevisions[i].length; j++){

	      	 	// if (typeof(currysTelevisions[i][j])=="string"){
	      	 			// tvString = tvString.concat(currysTelevisions[i][j]+';');
	      	 	// }else{
	      	// / 	  	tvString = tvString.concat(currysTelevisions[i][j]+';');
	       	// }
      	 
      	 // }

          // this.echo(tvString);
      	 //fs.write('../ProductionSites/my_offer_feed/lib/tasks/tv_scrape.txt',tvString+"\n",'a'); 
     
    

    //this.capture("currys-results-p" + currentPage + ".png");
    

    if (currentPage >= 12 || !this.exists('li.search-next a')) {
        this.echo("terminate");
         return terminate.call(casper);
    }

    currentPage++;
    //this.echo("requesting next page: " + currentPage);
    url = this.getCurrentUrl();
    // toClick = this.find("a:contains('Next')");
    this.thenClick('li.search-next a').then(function() {
        this.waitFor(function() {
            return url !== this.getCurrentUrl();
        }, processPage, terminate);
    });
};

casper.start("http://www.ebuyer.com/store/Computer/cat/Laptops?limit=30&page=1", function() {
 //http://www.currys.co.uk/gbuk/tv-dvd-blu-ray/televisions/large-screen-tvs-32-and-over/301_3002_30002_xx_xx/xx-criteria.html
 //http://www.currys.co.uk/gbuk/tv-dvd-blu-ray/televisions/small-screen-tvs-up-to-32/301_3915_31642_xx_xx/xx-criteria.html
});

casper.waitForSelector('li.search-next a', processPage, terminate);

casper.run();