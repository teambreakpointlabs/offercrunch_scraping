var currysTelevisions = [];
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
  var tvOfferSections = $('div.product');

  var tvOffers = Array.prototype.map.call(tvOfferSections, function(tv){
      var tvOffer = {};

      var productUrl, imageUrl, originalPrice = "";
    	var offerPrice = "";
      var savings = "";
    	var screenSize = "";
    	var properties = "";
    	var tvType = "";
    	var make = "";
    	var retailer = 'tesco';
    	var productType = 'television';
    	var percentDiscount = "";
      var urlDesc = "";
      var encodedProductUrl = "";
      var skimlinksUrl = "";

    	if(($(tv).find('a.thumbnail').attr('href'))!=null){
    		productUrl = $(tv).find('a.thumbnail').attr('href');
        productUrl = "http://www.tesco.com/direct"+productUrl;
        productUrl = productUrl.split('prd');
        productUrl = productUrl[0] + 'prd';
      }
      if(($(tv).find('a.thumbnail').find('div').find('noscript').text())!=null){
        description = $(tv).find('a.thumbnail').find('div').find('noscript').text();
        description = description.split('alt=\"');
        description = description[1];
        description = description.split('\"');
        description = description[0];
        brand = description.split(' ')[0];
        screenSize = description.match(/\d{2} Inch/);
        if (screenSize != null){
          screenSize = screenSize[0];
          screenSize = screenSize.match(/\d{2}/);
          screenSize = screenSize[0];
        }
      }
      if(($(tv).find('img').attr('src'))!=null){
    		imageUrl = $(tv).find('img').attr('src');
      }
      if(($(tv).find('ol.former-prices li').text())!=null){
      	originalPrice = $(tv).find('ol.former-prices li').text();
        originalPrice = originalPrice.match(/[0-9]+\.?[0-9]*/);
        originalPrice = parseFloat(originalPrice);
      }
      if(($(tv).find('p.price').text())!=null){
      	offerPrice = $(tv).find('p.price').text();
        offerPrice = offerPrice.match(/[0-9]+\.?[0-9]*/);
        offerPrice = parseFloat(offerPrice);
      }
      if(($(tv).find('p.saving').text())!=null){
        savings = $(tv).find('p.saving').text();
        savings = savings.match(/[0-9]+\.?[0-9]*/);
        savings = parseFloat(savings);
      }

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
//           //make seo friendly url from description
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
        urlDesc = urlDesc + "-offer";
       }
    }else{
      //back up if desc is not scraped
      var unique = parseFloat(Math.floor(Math.random() * 1000000000));
      urlDesc = brand + '-' + productType + '-' + unique;
    }

    encodedProductUrl = encodeURIComponent(productUrl);
 //   skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1347041&site=www.specialoffershopper.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=d1cbe13e65417e162e392fc0edcccb5f&xcreo=0&sref=http%3A%2F%2Fwww.specialoffershopper.co.uk&xtz=-660';
//    skimlinksUrl = 'http://www.awin1.com/cread.php?awinmid=1599&awinaffid=193639&clickref=&p='+encodedProductUrl;
    skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1506902&site=www.offercrunch.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=a11734410a17086b1e3a57e4e942b244&xcreo=0&sref=http%3A%2F%2Fwww.offercrunch.co.uk&xtz=-60';

     brand = brand.toLowerCase();
//     retailer = retailer.toLowerCase();

// if(oldPrice!=null && screenSize != ""){
  
    var url = {};
    var pricing = {};
    var details = {};
    url.product = productUrl;
    url.image = imageUrl;
    url.skimlinks = skimlinksUrl;
     pricing.original = originalPrice;
     pricing.offer = offerPrice;
     pricing.savings = savings;
     var pctSavings = parseInt(parseFloat(savings)/parseFloat(originalPrice) * 100);
     pricing.pctSavings = pctSavings;
     var savingsString = savings.toFixed(2);
     savingsString = savingsString.replace(".","-");
     if (savingsString!='NaN'){
      urlDesc = urlDesc + "-" + pctSavings + "-percent-off-save-"+savingsString+"-pounds";
     }else{
      return {};
     }
     pricing.pctSavings = Math.round(parseFloat(savings)/parseFloat(originalPrice)*100);
     details.screenSize = parseInt(screenSize);
     details.screenType = 'LED';
     tvOffer.url = url;
     tvOffer.details = details;
     tvOffer.retailer = 'tesco';
     tvOffer.pricing = pricing;
     tvOffer.type = productType;
     tvOffer.brand = brand;
     tvOffer.description = description;
     tvOffer.urlDesc = urlDesc;
     tvOffer.isValid = true;

//       // tvOffer.push(productUrl);
//       // tvOffer.push(imageUrl);
//       // tvOffer.push(oldPrice);
//       // tvOffer.push(discount);
//       // tvOffer.push(newPrice);
//       // tvOffer.push(retailer);
//       // tvOffer.push(make);
//       // tvOffer.push(screenSize);
//       // tvOffer.push(tvType);
//       // tvOffer.push(productType);

      
//       	//work out percent discount
//         // var oldPriceFloat = parseFloat(oldPrice);
//         // var discountFloat = parseFloat(discount);
//         // var percentDiscount = Math.ceil(discount/oldPrice * 100);

      
//       // tvOffer.push(percentDiscount);
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
    this.echo('process page');
    var url;
    var currysTelevisions = this.evaluate(getTelevisionOffers);
    if (currysTelevisions!=null){
    //utils.dump(currysTelevisions);
          for (var i=0; i < currysTelevisions.length; i++){
           // utils.dump(currysTelevisions[i]);
            if (currysTelevisions[i].type != undefined){
             // this.echo(currysTelevisions[i].pricing.original);
             // if (isNaN(parseInt(currysTelevisions[i].pricing.original))){
             //   continue;
             // }
             var televisionString = JSON.stringify(currysTelevisions[i]);
             fs.write('./tesco-television.txt', televisionString + "\n", 'a');
             //utils.dump(currysTelevisions);
            }
         }
               this.echo(currysTelevisions.length);

      }
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

    // if (currentPage >= 12 || !this.exists("a.load-more")) {
        // return terminate.call(casper);
    // }
   

     // currentPage++;
    //this.echo("requesting next page: " + currentPage);
    //url = this.getCurrentUrl();
    // this.thenClick("a.load-more").then(function() {
      // this.capture("tesco-results-p" + currentPage + ".png");
    // });
    // this.scrollToBottom();
    this.exit();
 };

casper.start("http://www.tesco.com/direct/technology-gaming/led-tvs/cat3375702.list?catId=4294959823+4294959246&icid=televisions_visnavstamp_slot5&lastFilter=Seller|Tesco", function() {
 //http://www.currys.co.uk/gbuk/tv-dvd-blu-ray/televisions/large-screen-tvs-32-and-over/301_3002_30002_xx_xx/xx-criteria.html
 //http://www.currys.co.uk/gbuk/tv-dvd-blu-ray/televisions/small-screen-tvs-up-to-32/301_3915_31642_xx_xx/xx-criteria.html
});

// casper.waitForSelector('a.load-more', processPage, terminate);


// casper.run();
casper.run(
   processPage
);