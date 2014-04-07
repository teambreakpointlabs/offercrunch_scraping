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
  var tvOfferSections = $('td');

  var tvOffers = Array.prototype.map.call(tvOfferSections, function(tv){
      var tvOffer = {};

      var productUrl, imageUrl, offerPrice = "";
    	var newPrice = "";
      var discount = "";
    	var screenSize = "";
    	var properties = "";
    	var tvType = "";
    	var brand = "";
    	var retailer = 'Direct Tvs';
    	var productType = 'television';
    	var percentDiscount = "";
      var description = "";
      var urlDesc = "";
      var encodedProductUrl = "";
      var skimlinksUrl = "";

     if(($(tv).find('td.OfferTitle').find('a.offerboxtitle').text()!=null)){
       description = $(tv).find('td.OfferTitle').find('a.offerboxtitle').text();
     }

     if(($(tv).find('td.OfferTitle').find('a').attr('href'))!=null){
       productUrl = $(tv).find('td.OfferTitle').find('a').attr('href');
     }

     if(($(tv).find('img.offerImage').attr('src'))!=null){
       imageUrl = $(tv).find('img.offerImage').attr('src');
     }

     if(($(tv).find('td.OfferBoxPrice').find('img').attr('alt'))!=null){
       offerPrice = $(tv).find('td.OfferBoxPrice').find('img').attr('alt');
       offerPrice = offerPrice.replace("&pound;","");
       offerPrice = parseFloat(offerPrice);
     }

     if(($(tv).find('div.VPpercentSquarel').find('span').text())!=null){
       pctSavings = $(tv).find('div.VPpercentSquarel').find('span').text();
       if (pctSavings!=''){
       	pctSavings = pctSavings.replace("%","");
       	pctSavings = parseFloat(pctSavings);
       }
     }

      if (description.match(/LED/i)){
          tvType = "LED";
        }
        if (description.match(/Plasma/i)){
          tvType = "Plasma";
        }
        if (description.match(/LCD/i)){
          tvType = "LCD";
        }

     if(($(tv).find('td.productInfo').find('ul li:first-child').text())!=null){
       screenSize = $(tv).find('td.productInfo').find('ul li:first-child').text();
       screenSize = screenSize.match(/\d{2}/);
       if (screenSize!=null){
       	screenSize = screenSize[0];
       	screenSize = parseInt(screenSize);
       }
     }
     

     if (description!=''){
     	  brand = description.split(" ")[0];
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
        urlDesc = urlDesc.replace(/&/g,"and");
       }
    }else{
      //back up if desc is not scraped
      var unique = parseFloat(Math.floor(Math.random() * 1000000000));
      urlDesc = brand + '-' + productType + '-' + unique;
    }

     
     

      // if(($(tv).find('.previousPrice').html())!=null){
      // 	originalPrice = $(tv).find('.previousPrice').html();
      // }
//       if(($(tv).find('.offerSticker.offerSaving').html())!=null){
//       	discount = $(tv).find('.offerSticker.offerSaving').html();
//       }
//        if(($(tv).find('.currentPrice').text())!=null){
//       	newPrice = $(tv).find('.currentPrice').text();
//       }

//       oldPrice = oldPrice.replace(",","");
//       newPrice = newPrice.replace(",","");
//       discount = discount.replace(",","");

//       var numPattern = /\d+/g;
//       oldPrice = oldPrice.match(numPattern);
//       newPrice = newPrice.match(numPattern);
//       discount = discount.match(numPattern);

//       oldPrice = oldPrice == null ? "" : oldPrice.join(".");
//       newPrice = newPrice == null ? "" : newPrice.join(".");
//       discount = discount == null ? "" : discount.join(".");

//       var checkValid = '^[0-9]+\.?[0-9]*$';
//       oldPrice = oldPrice.match(checkValid);
//       newPrice = newPrice.match(checkValid);
//       discount = discount.match(checkValid);

//       var propertiesArr = properties.split(" ");
   
//       //filter properties
//       for (var i=0; i<propertiesArr.length; i++){
//       	//make
//       	if (i==0){
//       	  make = propertiesArr[i];
//           if (make !="LG"){
//             make = make.toLowerCase();
//             make = make.charAt(0).toUpperCase() + make.substring(1);
//           }
//         }
//         //screen
//         if ((propertiesArr[i].match(/\d{2}("|”)/))){
//         	screenSize = propertiesArr[i];
//         	screenSize = screenSize.replace('"',"");
//         }
//         //tv type
//         if ((propertiesArr[i]=="LED")||(propertiesArr[i]=="Plasma")||(propertiesArr[i]=="LCD")){
//         	tvType = propertiesArr[i];
//         }
//       }

 encodedProductUrl = encodeURIComponent(productUrl);
//skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1347041&site=www.specialoffershopper.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=d1cbe13e65417e162e392fc0edcccb5f&xcreo=0&sref=http%3A%2F%2Fwww.specialoffershopper.co.uk&xtz=-660';
 skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1506902&site=www.offercrunch.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=a11734410a17086b1e3a57e4e942b244&xcreo=0&sref=http%3A%2F%2Fwww.offercrunch.co.uk&xtz=-60';

    brand = brand.toLowerCase();
    retailer = retailer.toLowerCase();
    
 if(pctSavings!=''){
  
   var url = {};
   var pricing = {};
   var details = {};
     url.product = productUrl;
     url.image = imageUrl;
     url.skimlinks = skimlinksUrl;
     //pricing.original = parseFloat(oldPrice);
     pricing.offer = offerPrice;
//   pricing.savings = parseFloat(discount);
     pricing.pctSavings = pctSavings;
     details.screenSize = screenSize;
     details.screenType = tvType;
     tvOffer.url = url;
     tvOffer.details = details;
     tvOffer.retailer = retailer;
     tvOffer.pricing = pricing;
     tvOffer.type = 'television';
     tvOffer.brand = brand;
     tvOffer.description = description;
     tvOffer.urlDesc = urlDesc;
     tvOffer.isValid = true;
}else{
	return {};
}
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

           // utils.dump(currysTelevisions[i]);
            if (currysTelevisions[i].type != undefined && currysTelevisions[i].brand != ""){
            // / this.echo(currysTelevisions[i].pricing.original);
             // if (isNaN(parseInt(currysTelevisions[i].pricing.original))){
               // continue;
             // }
               // utils.dump(currysTelevisions[i]);
              var televisionString = JSON.stringify(currysTelevisions[i]);
            fs.write('./direct tvs-television.txt', televisionString + "\n", 'a');
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
    

    if (currentPage >= 12 || !this.exists('div#sli_pagination_footer')) {
        this.echo("terminate");
         return terminate.call(casper);
    }

    currentPage++;
    //this.echo("requesting next page: " + currentPage);
    url = this.getCurrentUrl();
    // toClick = this.find("a:contains('Next')");
    this.thenClick('div#sli_pagination_footer a:last-child').then(function() {
        this.waitFor(function() {
            return url !== this.getCurrentUrl();
        }, processPage, terminate);
    });
};

casper.start("http://search.directtvs.co.uk/nav/tvtype/ledtv/type/tvs/0", function() {
 //http://www.currys.co.uk/gbuk/tv-dvd-blu-ray/televisions/large-screen-tvs-32-and-over/301_3002_30002_xx_xx/xx-criteria.html
 //http://www.currys.co.uk/gbuk/tv-dvd-blu-ray/televisions/small-screen-tvs-up-to-32/301_3915_31642_xx_xx/xx-criteria.html
});

casper.waitForSelector('div#sli_pagination_footer', processPage, terminate);

casper.run();