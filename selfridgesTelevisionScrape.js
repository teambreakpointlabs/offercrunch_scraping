var utils = require('utils');
var fs = require('fs'); 
var casper = require("casper").create({
    waitTimeout: 1000,
    pageSettings: {
        userAgent: "Mozilla/5.0 (MSIE 9.0; Windows NT 6.1; Trident/5.0)"
    }
});
var currentPage = 1;

var terminate = function() {
    this.echo("finished scraping").exit();
};

function getTelevisionOffers(){
  var tvOfferSections = $('div.product');

  var tvOffers = Array.prototype.map.call(tvOfferSections, function(tv){
     var tvOffer = {};

       var productUrl = "";
       var imageUrl = "";
       var originalPrice = "";
       var offerPrice = "";
       var savings = "";
       var screenSize = "";
       // var properties = "";
       var screenType = "";
       var brand = "";
       var retailer = 'Selfridges';
       var productType = 'television';
       var pctSavings = "";
       var description = "";
       var urlDesc = "";
       var encodedProductUrl = "";
       var skimlinksUrl = "";

       if(($(tv).find('a').attr('href'))!=null){
         productUrl = $(tv).find('a').attr('href');
       }
      
       if(($(tv).find('a').find('p.price.was').text())!=null){
         originalPrice = $(tv).find('a').find('p.price.was').text();
         originalPrice = originalPrice.replace(/,/g, "");
         originalPrice = originalPrice.replace(/£/g, "");
         originalPrice = originalPrice.replace(/Was\s/g, "");
         originalPrice = parseFloat(originalPrice);
       }

       if (originalPrice == ""){
        return {};
       }

       if(($(tv).find('a').find('p.price').find('span.now').find('span.amount').text())!=null){
         offerPrice = $(tv).find('a').find('p.price').find('span.now').find('span.amount').text();
         offerPrice = offerPrice.replace(/,/g, "");
         offerPrice = offerPrice.replace(/£/g, "");
         offerPrice = parseFloat(offerPrice);
       }

        if(($(tv).find('a').find('h2').text())!=null){
         description = $(tv).find('a').find('h3').text();
         brand = $(tv).find('a').find('h2').text();
         if (brand !="LG"){
            brand = brand.toLowerCase();
            brand = brand.charAt(0).toUpperCase() + brand.substring(1);
          }
        }


         if(($(tv).find('a').find('h3').text())!=null){

           screenSize = $(tv).find('a').find('h3').text();
           screenSize = screenSize.match(/\d{2}"/);
           if (screenSize!=null){
             screenSize = screenSize[0];
             screenSize = screenSize.match(/\d{2}/);
             screenSize = screenSize[0];
           }
         }
        if(($(tv).find('a').find('h3').text())!=null){
           var desc = $(tv).find('a').find('h3').text();
           if (desc.match(/LED/)){
            screenType = 'LED';
           }
           if (desc.match(/Plasma/)){
            screenType = 'Plasma';
           }
           if (desc.match(/LCD/)){
            screenType = 'LCD';
           }
         }

       if(($(tv).find('div.image.quicklook').find('a').find('img').attr('src'))!=null){
         imageUrl = $(tv).find('div.image.quicklook').find('a').find('img').attr('src');
       }
       
      
    encodedProductUrl = encodeURIComponent(productUrl);
    //skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1347041&site=www.specialoffershopper.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=d1cbe13e65417e162e392fc0edcccb5f&xcreo=0&sref=http%3A%2F%2Fwww.specialoffershopper.co.uk&xtz=-660';
    skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1506902&site=www.offercrunch.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=a11734410a17086b1e3a57e4e942b244&xcreo=0&sref=http%3A%2F%2Fwww.offercrunch.co.uk&xtz=-60';


    brand = brand.toLowerCase();
    retailer = retailer.toLowerCase();

       if (description!=''){
       urlDesc = description.replace(/\s+/g,'-').toLowerCase();
      if (urlDesc!=''){
        if (urlDesc.slice(-1)=="."){
          urlDesc = urlDesc.substring(0,urlDesc.length-1);
        }
         urlDesc = urlDesc.replace(/["”]/g,"");
        urlDesc = urlDesc.replace(/--/g,"");
        urlDesc = urlDesc.replace(/\//g,"-");
        urlDesc = urlDesc.replace(/,/g,"");
        urlDesc = urlDesc.replace(/&/g,"and");
       }
    }else{
      //back up if desc is not scraped
      var unique = parseFloat(Math.floor(Math.random() * 1000000000));
      urlDesc = brand + '-' + productType + '-' + unique;
    }
        var url = {};
        var pricing = {};
        var details = {};

        url.product = productUrl;
        url.image = imageUrl;
        url.skimlinks = skimlinksUrl;
       // var oldPrice = parseFloat(newPrice) + parseFloat(discount);
        pricing.original = originalPrice;
        pricing.offer = offerPrice;
        savings = originalPrice - offerPrice;
        pricing.savings = Math.round(savings);
        details.screenSize = parseFloat(screenSize);
        details.screenType = screenType;
        tvOffer.url = url;
        tvOffer.details = details;
        tvOffer.retailer = retailer;
        tvOffer.type = productType;
        tvOffer.brand = brand;
        tvOffer.isValid = true;
        tvOffer.description = description;
        tvOffer.urlDesc = urlDesc;
       //percentage discount
        
          //pctSavings = savings;
          //decimal = Math.round(savings/originalPrice);
          pctSavings = Math.ceil((savings/originalPrice)*100);
        
       

       
        pricing.pctSavings = pctSavings;
        tvOffer.pricing = pricing;
      // }

      
     
       return tvOffer;
   });
  //get those with money off
   // var tvOffersDiscounted = [];
   // for (var i=0;i<tvOffers.length;i++){
   //   if(tvOffers[i].length>1){
   //     tvOffersDiscounted.push(tvOffers[i]);
   //   }
   // }
   return tvOffers;
}

var processPage = function() {
    var url;
    this.echo("capturing page");
    var selfridgesTelevisions = this.evaluate(getTelevisionOffers);
    //utils.dump(johnlewisTelevisions);
    if (selfridgesTelevisions!=null){
      for (var i=0; i < selfridgesTelevisions.length; i++){
        if (selfridgesTelevisions[i].pricing.savings != undefined){
          var tvString = JSON.stringify(selfridgesTelevisions[i]);
          fs.write('./selfridges-television.txt', tvString + "\n", 'a');
          //utils.dump(selfridgesTelevisions[i]);
        }
       // if (selfridgesTelevisions.pricing.original === undefined){
        // utils.dump(selfridgesTelevisions[i]);
       // };
      //utils.dump(selfridgesTelevisions);
      // var tvString = JSON.stringify(johnlewisTelevisions[i]);
      // fs.write('./johnLewisTelevisions.txt', tvString, 'a');
    
     }
      this.echo(selfridgesTelevisions.length);
    }else{
      this.echo('null');
    }
      //for (var i=0; i<currysTelevisions.length;i++){

         // var link_url = currysTelevisions[i][0];
         // var image_url = currysTelevisions[i][1];
         // var old_price = currysTelevisions[i][2];
         // var price_off = currysTelevisions[i][3];
         // var new_price = currysTelevisions[i][4];
         // var retailer = currysTelevisions[i][5];
         // var make = currysTelevisions[i][6];
         // var screen_size = currysTelevisions[i][7];
         // var tv_type = currysTelevisions[i][8];
         // var product_type = currysTelevisions[i][9];
         // var percent_off = currysTelevisions[i][10];
        // var tvString = '';
     
        // for (var j=0; j<currysTelevisions[i].length; j++){

            // if (typeof(currysTelevisions[i][j])=="string"){
            //    tvString = tvString.concat(currysTelevisions[i][j]+';');
            // }else{
          //      tvString = tvString.concat(currysTelevisions[i][j]+';');
            // }
         
        // }

   
         // var tvObjString = "Product.create!(link_url:'"+link_url+
         //   "',image_url:'"+image_url+"'" 
         //   + ",product_type:'"+product_type+"',old_price:"+old_price+",new_price:"+new_price+",price_off:"
         //   + price_off+",percent_off:"+percent_off+",retailer:'"
         //   +retailer+"',screen_size:"+screen_size+",make:'"
         //   +make+"',tv_type:'"+tv_type+"')";
          //this.echo(tvObjString);
        // fs.write('lib/tasks/tmp/tv_scrape.txt',tvString+"\n",'a'); 
      //}
      this.exit();
    }

    //this.capture("currys-results-p" + currentPage + ".png");

    //if (currentPage >= 12 || !this.exists(".next")) {
    //    return terminate.call(casper);
    //}

    //currentPage++;
    //this.echo("requesting next page: " + currentPage);
    //url = this.getCurrentUrl();
    //this.thenClick(".next").then(function() {
    //    this.waitFor(function() {
     //       return url !== this.getCurrentUrl();
     //   }, processPage, terminate);
    //});
//};

casper.start("http://www.selfridges.com/en/Home-Tech/Categories/Shop-Tech/Televisions/All-televisions/?ic=19860&llc=sn&template=3Across", function() {
 
});


casper.run(
   processPage
);
