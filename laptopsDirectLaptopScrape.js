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
  var tvOfferSections = $('td[id]');

  var tvOffers = Array.prototype.map.call(tvOfferSections, function(tv){
      
      var tvOffer = {};

      var productUrl, imageUrl, offerPrice = "";
    	var newPrice = "";
      var discount = "";
    	var screenSize = "";
    	var properties = "";
    	var tvType = "";
    	var brand = "";
    	var retailer = 'Laptops Direct';
    	var productType = 'laptop';
    	var percentDiscount = "";
      var description = "";
      var urlDesc = "";
      var encodedProductUrl = "";
      var skimlinksUrl = "";

     if(($(tv).find('td.OfferTitle').find('a.offerboxtitle').text()!=null)){
       description = $(tv).find('td.OfferTitle').find('a.offerboxtitle').text();
       description = description.split(/\s-\s/)[0];
     }

     if(($(tv).find('td.OfferTitle').find('a').attr('href'))!=null){
       productUrl = $(tv).find('td.OfferTitle').find('a').attr('href');
     }

     if(($(tv).find('img.offerImage').attr('src'))!=null){
       imageUrl = $(tv).find('img.offerImage').attr('src');
     }

     if(($(tv).find('td.OfferBoxPrice').find('img').attr('alt'))!=null){
       offerPrice = $(tv).find('td.OfferBoxPrice').find('img').attr('alt');
       offerPrice = offerPrice.replace("£","");
       offerPrice = parseFloat(offerPrice);
     }

     //check not a trade in offer
     if(($(tv).find('td.OfferBoxPrice').html())!=null){
      //return if is so not included in file output
      var checkRegPrice = $(tv).find('td.OfferBoxPrice').html();
      var result = checkRegPrice.match(/Regular/);
      if (result){
        return {};
      }
     }


     var pctSavingsFound = false;
     if(($(tv).find('div.VPpercentSquarel').find('b').find('span').text())!=null){
       pctSavings = $(tv).find('div.VPpercentSquarel').find('b').find('span').text();
       if (pctSavings!=''){
       	pctSavings = pctSavings.replace("%","");
       	pctSavings = parseInt(pctSavings);
        pctSavingsFound = true;
       }
     }
     if (!pctSavingsFound){
     if(($(tv).find('div.VPpercentRoundel').find('b').find('span').text())!=null){
       pctSavings = $(tv).find('div.VPpercentRoundel').find('b').find('span').text();
       if (pctSavings!=''){
        pctSavings = pctSavings.replace("%","");
        pctSavings = parseInt(pctSavings);
       }
     }
   }
    
     if(($(tv).find('td.productInfo').find('ul li:first-child').text())!=null){
       screenSize = $(tv).find('td.productInfo').find('ul li:first-child').text();
       screenSize = screenSize.match(/\d{2}\.?\d?in/);
       if (screenSize!=null){
       	screenSize = screenSize[0];
       	screenSize = parseFloat(screenSize);
       }
     }
     

     if (description!=''){
     	  brand = description.split(" ")[0];
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

 if(pctSavings!=''){
  
    var url = {};
    var pricing = {};
    var details = {};
    url.product = productUrl;
    url.image = imageUrl;
    url.skimlinks = skimlinksUrl;
    pricing.offer = offerPrice;
    pricing.pctSavings = pctSavings;
    details.screenSize = screenSize;
    tvOffer.url = url;
    tvOffer.details = details;
    tvOffer.retailer = retailer;
    tvOffer.pricing = pricing;
    tvOffer.type = 'laptop';
    tvOffer.brand = brand;
    tvOffer.description = description;
    tvOffer.urlDesc = urlDesc;
    tvOffer.isValid = true;
  }else{
 	 return {};
 }
      return tvOffer;
  });
   return tvOffers;
}

var processPage = function() {
  this.echo('process page');
    var url;
    //this.echo("capturing page " + currentPage);
    var currysTelevisions = this.evaluate(getTelevisionOffers);
    if (currysTelevisions!=null){
   

          // utils.dump(currysTelevisions);
           for (var i=0; i < currysTelevisions.length; i++){

           // utils.dump(currysTelevisions[i]);
             if (currysTelevisions[i].type == undefined){
            // / this.echo(currysTelevisions[i].pricing.original);
             // if (isNaN(parseInt(currysTelevisions[i].pricing.original))){
                continue;
              }
               // utils.dump(currysTelevisions[i]);
            var televisionString = JSON.stringify(currysTelevisions[i]);
            fs.write('./laptops direct-laptop.txt', televisionString + "\n", 'a');
            utils.dump(currysTelevisions[i]);
            //}
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
    

    if (currentPage >= 12 || !this.exists('div.sli_pagination')) {
        this.echo("terminate");
         return terminate.call(casper);
    }

    currentPage++;
    //this.echo("requesting next page: " + currentPage);
    url = this.getCurrentUrl();
    // toClick = this.find("a:contains('Next')");
    this.thenClick('div.sli_pagination a:last-child').then(function() {
        this.waitFor(function() {
            return url !== this.getCurrentUrl();
        }, processPage, terminate);
    });
};

casper.start("http://www.laptopsdirect.co.uk/ct/laptops-and-netbooks/laptops?&cnt=48", function() {
 //http://www.currys.co.uk/gbuk/tv-dvd-blu-ray/televisions/large-screen-tvs-32-and-over/301_3002_30002_xx_xx/xx-criteria.html
 //http://www.currys.co.uk/gbuk/tv-dvd-blu-ray/televisions/small-screen-tvs-up-to-32/301_3915_31642_xx_xx/xx-criteria.html
});

casper.waitForSelector('div.sli_pagination', processPage, terminate);

casper.run();