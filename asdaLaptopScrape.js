var casper = require('casper').create();
casper.options.clientScripts = ["jquery.js"];
var utils = require('utils');
var fs = require('fs'); 

var asdaLaptops = [];

function getLaptopOffers(){
    var laptopOfferSections = $('.listItemInner');
    var laptopOffers = Array.prototype.map.call(laptopOfferSections, function(laptop){
      // var laptopOffer = new Array();
      var laptopOffer = {};

      var retailer = 'Asda';
      var productType = 'laptop';

       var productUrl = '';

     //  var productLink = 'false';
       var imageUrl = '';
    	 var originalPrice = '';
    	 var offerPrice = '';
       var savings = '';
       var pctSavings = '';
       var screenSize = '';
       var screenType = '';
       var brand = '';
       var description = '';
       var urlDesc = '';
       var skimlinksUrl = '';
       var encodedProductUrl = '';
    	// var discount = 'false';

    	 if(($(laptop).find('.viewProductLink').attr('href'))!=null){
    	 	productUrl = $(laptop).find('.viewProductLink').attr('href');
       }

       if(($(laptop).find('.viewProductLink').find('img').attr('src'))!=null){
        imageUrl = $(laptop).find('.viewProductLink').find('img').attr('src');
       }

       if(($(laptop).find('.wasPrice').html())!=null){
       	originalPrice = $(laptop).find('.wasPrice').text();
        originalPrice = originalPrice.replace('£','');
        originalPrice = parseFloat(originalPrice);
       }
       if(($(laptop).find('.newPrice').html())!=null){
      	offerPrice = $(laptop).find('.newPrice').text();
        offerPrice = offerPrice.replace('£',''); 
        offerPrice = parseFloat(offerPrice);      
       }
       if(($(laptop).find('.brand').html())!=null){
        description = $(laptop).find('.brand').text();
         screenSize = $(laptop).find('.brand').text();  
         screenSize = screenSize.match(/\d{2}\.\d?/); 
          if (screenSize!=null){
           screenSize = parseFloat(screenSize[0]);
          }
          brand = $(laptop).find('.brand').text();
          brand = brand.replace(/\n/g,'');
          brand = brand.split(' ')[0];
         
       }
          //make seo friendly url from description
    if (description!=''){
       urlDesc = description.replace(/\s+/g,'-').toLowerCase();
      if (urlDesc!=''){
        if (urlDesc.slice(-1)=="." || urlDesc.slice(-1)=="-"){
          urlDesc = urlDesc.substring(0,urlDesc.length-1);
        }
        if (urlDesc.charAt(0)=="-"){
          urlDesc = urlDesc.replace('-',"");
        }
        urlDesc = urlDesc.replace(/"/g,"");
        urlDesc = urlDesc.replace(/--/g,"");
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
    if (brand == 'Packard') brand = 'packard bell';
    retailer = retailer.toLowerCase();

      
      if (originalPrice != '' && offerPrice!= ''){

        //calc saving
        savings = originalPrice - offerPrice;
        pctSavings = Math.round(savings/originalPrice * 100);

        var url = {};
        var pricing = {};
        var details = {};


        url.product = productUrl;
        url.image = imageUrl;
        url.skimlinks = skimlinksUrl;
        pricing.original = originalPrice;
        pricing.offer = offerPrice;
        pricing.savings = savings;
        pricing.pctSavings = pctSavings;
        details.screenSize = screenSize;
        //details.screenType = screenType;


        laptopOffer.details = details;
        laptopOffer.pricing = pricing;
        laptopOffer.url = url;
        laptopOffer.retailer = retailer;
        laptopOffer.brand = brand;
        laptopOffer.type = productType;
        laptopOffer.isValid = true;
        laptopOffer.description = description;
        laptopOffer.urlDesc = urlDesc;

      }

      return laptopOffer;

    });
    return laptopOffers;
    }

 casper.start('http://direct.asda.com/Laptops-Netbooks/AD060407,default,sc.html?viewAll&showHits', function() {
  asdaLaptops = this.evaluate(getLaptopOffers);
});

casper.run(function(){
	this.echo('no errors');
	if (asdaLaptops!=null){
utils.dump(asdaLaptops);
    asdaLaptops.forEach(function(x){
          // utils.dump(x);
          //var laptopString = JSON.stringify(x);
          //this.echo(JSON.stringify(x));
          if (x.type!=undefined){
            fs.write('./asda-laptop.txt', JSON.stringify(x) + "\n", 'a');
          }
         });
		  this.echo('Found ' + asdaLaptops.length + ' asda laptops'); 
		  
	}
	this.exit();
})
