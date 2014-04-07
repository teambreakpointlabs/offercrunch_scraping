var casper = require('casper').create();
casper.options.clientScripts = ["jquery.js"];
var utils = require('utils');
var fs = require('fs'); 

var asdaTelevisions = [];

function getTelevisionOffers(){
    var tvOfferSections = $('.listItemInner');
    var tvOffers = Array.prototype.map.call(tvOfferSections, function(tv){
      // var tvOffer = new Array();
      var tvOffer = {};

      var retailer = 'Asda';
      var productType = 'television';

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

    	 if(($(tv).find('.viewProductLink').attr('href'))!=null){
    	 	productUrl = $(tv).find('.viewProductLink').attr('href');
       }

       if(($(tv).find('.viewProductLink').find('img').attr('src'))!=null){
        imageUrl = $(tv).find('.viewProductLink').find('img').attr('src');
       }

       if(($(tv).find('.wasPrice').html())!=null){
       	originalPrice = $(tv).find('.wasPrice').text();
        originalPrice = originalPrice.replace('£','');
        originalPrice = parseFloat(originalPrice);
       }
       if(($(tv).find('.newPrice').html())!=null){
      	offerPrice = $(tv).find('.newPrice').text();
        offerPrice = offerPrice.replace('£',''); 
        offerPrice = parseFloat(offerPrice);      
       }
       if(($(tv).find('.brand').html())!=null){
         screenSize = $(tv).find('.brand').text();  
         screenSize = screenSize.match(/\d{2}\"/); 
          if (screenSize!=null){
           screenSize = screenSize[0]
          }
          description = $(tv).find('.brand').text();
          brand = $(tv).find('.brand').text();
          brand = brand.replace(/\n/g,'');
          brand = brand.split(' ')[0];
          screenType = $(tv).find('.brand').text();
          if (screenType.match(/LED/)){
            screenType = 'LED';
          } else if (screenType.match(/(Plasma|plasma)/)){
            screenType = 'Plasma';
          }else if (screenType.match(/LCD/)){
            screenType = 'LCD';
          }
       }
       if (screenSize == null){
         if(($(tv).find('.brand').html())!=null){
         screenSize = $(tv).find('.brand').text();  
         screenSize = screenSize.match(/\d{2}(ins| INS)/); 
          if (screenSize!=null){
           screenSize = screenSize[0]
          }
       }
       }
       if (screenSize!=null){
        screenSize = screenSize.match(/\d{2}/);
        screenSize = parseFloat(screenSize[0]);
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
        details.screenType = screenType;


        tvOffer.details = details;
        tvOffer.pricing = pricing;
        tvOffer.url = url;
        tvOffer.retailer = retailer;
        tvOffer.brand = brand;
        tvOffer.type = productType;
        tvOffer.isValid = true;
        tvOffer.description = description;
        tvOffer.urlDesc = urlDesc;
      }

      return tvOffer;

    });
    return tvOffers;
    }

 casper.start('http://direct.asda.com/TVs/AD060119,default,sc.html?fix&viewAll', function() {
  asdaTelevisions = this.evaluate(getTelevisionOffers);
 });

casper.run(function(){
	this.echo('no errors');
	if (asdaTelevisions!=null){
utils.dump(asdaTelevisions);
    asdaTelevisions.forEach(function(x){
           //utils.dump(x);
          //var tvString = JSON.stringify(x);
          //this.echo(JSON.stringify(x));
           if (x.type!=undefined){
             fs.write('./asda-television.txt', JSON.stringify(x) + "\n", 'a');
           }
         });
		  this.echo('Found ' + asdaTelevisions.length + ' asda tvs'); 
		  //utils.dump(asdaTelevisions);
	}
	this.exit();
})
