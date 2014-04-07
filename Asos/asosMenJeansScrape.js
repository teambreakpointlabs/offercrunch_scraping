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

function getTabletOffers(){
  var tabletOfferSections = $('ul#items li');

  var tabletOffers = Array.prototype.map.call(tabletOfferSections, function(tablet){
      var tabletOffer = {};

      var productUrl, imageUrl, oldPrice = "";
    	var newPrice = "";
      var discount = "";
    	var screenSize = "";
    	var properties = "";
    	var make = "";
    	var retailer = 'asos';
    	var productType = 'jeans';
      var category = 'fashion';
      var gender = 'm';
    	var percentDiscount = "";
      var urlDesc = "";
      var skimlinksUrl = "";
      var encodedProductUrl = "";
      var description = "";

    	if(($(tablet).find('a.desc').attr('href'))!=null){
        productUrl = $(tablet).find('a.desc').attr('href');
        productUrl = "http://www.asos.com"+productUrl;
      }
      // if(($(tablet).find('a.desc').text())!=null){
      //   description = $(tablet).find('a.desc').text();  
      // }
    //    if(($(tablet).find('img.image.respImg').attr('src'))!=null){
    //      imageUrl = $(tablet).find('img.image.respImg').attr('src');
    //    }
    //   if(($(tablet).find('.productTitle').find('a').text())!=null){
    // 		properties = $(tablet).find('.productTitle').find('a').text();
    //   }
  

    //   if(($(tablet).find('.previousPrice').html())!=null){
    //   	oldPrice = $(tablet).find('.previousPrice').html();
    //   }
    //   if(($(tablet).find('.offerSticker.offerSaving').html())!=null){
    //   	discount = $(tablet).find('.offerSticker.offerSaving').html();
    //   }
    //    if(($(tablet).find('.currentPrice').text())!=null){
    //   	newPrice = $(tablet).find('.currentPrice').text();
    //   }

    //   oldPrice = oldPrice.replace(",","");
    //    newPrice = newPrice.replace(",","");
    //    discount = discount.replace(",","");

    //   var numPattern = /\d+/g;
    //   oldPrice = oldPrice.match(numPattern);
    //   newPrice = newPrice.match(numPattern);
    //   discount = discount.match(numPattern);

    //   oldPrice = oldPrice == null ? "" : oldPrice.join(".");
    //   newPrice = newPrice == null ? "" : newPrice.join(".");
    //   discount = discount == null ? "" : discount.join(".");

    //   var checkValid = '^[0-9]+\.?[0-9]*$';
    //   oldPrice = oldPrice.match(checkValid);
    //   newPrice = newPrice.match(checkValid);
    //   discount = discount.match(checkValid);

    //   var propertiesArr = properties.split(" ");
   
    //   //filter properties
    //   for (var i=0; i<propertiesArr.length; i++){
    //   	//make
    //   	if (i==0){
    //   	  make = propertiesArr[i];
    //        if (make !="LG"){
    //         make = make.toLowerCase();
    //         make = make.charAt(0).toUpperCase() + make.substring(1);
    //        }
    //     }
    //   }

    // //make seo friendly url from description
    // if (properties!=''){
    //    urlDesc = properties.replace(/\s+/g,'-').toLowerCase();
    //   if (urlDesc!=''){
    //     if (urlDesc.slice(-1)=="."){
    //       urlDesc = urlDesc.substring(0,urlDesc.length-1);
    //     }
    //     urlDesc = urlDesc.replace(/--/g,"");
    //     urlDesc = urlDesc.replace(/["”]/g,"");
    //     urlDesc = urlDesc.replace(/\//g,"-");
    //     urlDesc = urlDesc.replace(/,/g,"-");
    //     urlDesc = urlDesc.replace(/&/g,"and");
    //    }
    // }else{
    //   //back up if desc is not scraped
    //   var unique = parseFloat(Math.floor(Math.random() * 1000000000));
    //   urlDesc = make + '-' + productType + '-' + unique;
    // }

        //screen
        // if ((propertiesArr[i].match(/\d{2}("|”)/))){
        // 	screenSize = propertiesArr[i];
        // 	screenSize = screenSize.replace('"',"");
        // }
        //tablet type
        // if ((propertiesArr[i]=="LED")||(propertiesArr[i]=="Plasma")||(propertiesArr[i]=="LCD")){
        // 	tabletType = propertiesArr[i];
        // }
      // }

  // encodedProductUrl = encodeURIComponent(productUrl);
  //skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1347041&site=www.specialoffershopper.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=d1cbe13e65417e162e392fc0edcccb5f&xcreo=0&sref=http%3A%2F%2Fwww.specialoffershopper.co.uk&xtz=-660';
   // skimlinksUrl = 'http://www.awin1.com/cread.php?awinmid=1599&awinaffid=193639&clickref=&p='+encodedProductUrl;

 
    // brand = make.toLowerCase();
    // retailer = retailer.toLowerCase();

 // if(oldPrice!=null){
  
   var url = {};
   // var pricing = {};
   // var details = {};
   url.product = productUrl;
   // url.image = imageUrl;
   // url.skimlinks = skimlinksUrl;
   // pricing.original = parseFloat(oldPrice);
   // pricing.offer = parseFloat(newPrice);
   // pricing.savings = parseFloat(discount);
   // pricing.pctSavings = Math.round(parseFloat(discount)/parseFloat(oldPrice)*100);
  // details.screenSize = parseFloat(screenSize);
  // details.screenType = tabletType;
   tabletOffer.url = url;
  // tabletOffer.details = details;
   // tabletOffer.retailer = retailer;
   // tabletOffer.pricing = pricing;
    tabletOffer.type = productType;
   // /tabletOffer.brand = brand;
  // tabletOffer.isValid = true;
    // tabletOffer.description = description;
   // tabletOffer.urlDesc = urlDesc;

      // tabletOffer.push(productUrl);
      // tabletOffer.push(imageUrl);
      // tabletOffer.push(oldPrice);
      // tabletOffer.push(discount);
      // tabletOffer.push(newPrice);
      // tabletOffer.push(retailer);
      // tabletOffer.push(make);
      // tabletOffer.push(screenSize);
      // tabletOffer.push(tabletType);
      // tabletOffer.push(productType);

      
      	//work out percent discount
        // var oldPriceFloat = parseFloat(oldPrice);
        // var discountFloat = parseFloat(discount);
        // var percentDiscount = Math.ceil(discount/oldPrice * 100);

      
      // tabletOffer.push(percentDiscount);
// }

      return tabletOffer;
  });
  //get those with money off
  // var tabletOffersDiscounted = [];
  // for (var i=0;i<tabletOffers.length;i++){
  // 	if(tabletOffers[i][2]!=null){
  // 		tabletOffersDiscounted.push(tabletOffers[i]);
  // 	}
  // }
   // return tabletOffersDiscounted;
   return tabletOffers;
}

var processPage = function() {
    var url;
    this.echo("Starting - " + new Date().toISOString());
    this.echo("capturing page " + currentPage);
    var currysTablets = this.evaluate(getTabletOffers);
     if (currysTablets!=null){
    utils.dump(currysTablets);
          for (var i=0; i < currysTablets.length; i++){
            // utils.dump(currysTablets[i]);
            // if (currysTablets[i].type != undefined){
              // this.echo(currysTablets[i].pricing.original);
             // if (isNaN(parseInt(currysTablets[i].pricing.original))){
               // continue;
             // }
              // var tabletString = JSON.stringify(currysTablets[i]);
              // fs.write('./currys-tablet.txt', tabletString + "\n", 'a');
             utils.dump(currysTablets[i]);
           }
           // this.echo(currysTablets.length);
       
       }
      //this.echo(currysTelevisions.length);
      //utils.dump(currysTelevisions);

      // for (var i=0; i<currysTelevisions.length;i++){

      	 
      	 // var tabletString = '';
     
      	 // for (var j=0; j<currysTelevisions[i].length; j++){

	      	 	// if (typeof(currysTelevisions[i][j])=="string"){
	      	 			// tabletString = tabletString.concat(currysTelevisions[i][j]+';');
	      	 	// }else{
	      	// / 	  	tabletString = tabletString.concat(currysTelevisions[i][j]+';');
	       	// }
      	 
      	 // }

          // this.echo(tabletString);
      	 //fs.write('../ProductionSites/my_offer_feed/lib/tasks/tablet_scrape.txt',tabletString+"\n",'a'); 
     
    

    //this.capture("currys-results-p" + currentPage + ".png");

    if (currentPage >= 12 || !this.exists("li.page-skip a")) {
        return terminate.call(casper);
    }

    currentPage++;
    //this.echo("requesting next page: " + currentPage);
    url = this.getCurrentUrl();
    this.echo(url);
    this.thenClick("li.page-skip a").then(function() {
        this.waitFor(function() {
            return url !== this.getCurrentUrl();
        }, processPage, terminate);
    });
};

casper.start("http://www.asos.com/Men/Sale/Jeans/Cat/pgecategory.aspx?cid=5230&WT.ac=OL|MW|outlet|bdy|jeans#pgeSize=500", function() {
 //http://www.currys.co.uk/gbuk/tablet-dvd-blu-ray/televisions/large-screen-tablets-32-and-over/301_3002_30002_xx_xx/xx-criteria.html
 //http://www.currys.co.uk/gbuk/tablet-dvd-blu-ray/televisions/small-screen-tablets-up-to-32/301_3915_31642_xx_xx/xx-criteria.html
});

casper.waitForSelector('li.page-skip a', processPage, terminate);

casper.run();