var currysTelevisions = [];
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
  var tvOfferSections = $('article');

  var tvOffers = Array.prototype.map.call(tvOfferSections, function(tv){
     var tvOffer = {};

       var productLink = "";
       var imageLink = "";
       var oldPrice = "";
       var newPrice = "";
       var discount = "";
       var screenSize = "";
      // var properties = "";
       var tvType = "";
       var make = "";
       var retailer = 'John Lewis';
       var productType = 'television';
       var percentDiscount = "";
       var description = "";
       var urlDesc = "";
       var skimlinksUrl = "";
       var encodedProductUrl = "";

       if(($(tv).find('a').attr('href'))!=null){
         productLink = $(tv).find('a').attr('href');
       }
       if($(tv).find('p.special-offer')!=null){
         discount = $(tv).find('p.special-offer').text();
         if (discount.match(/Save £\d+/)){
          discount = discount.match(/Save £\d+/);
          discount = discount[0].match(/\d+/);
          discount = discount[0];
         }
       }
       if(($(tv).find('img').attr('src'))!=null){
         imageLink = $(tv).find('img').attr('src');
         imageLink = imageLink.replace("//","");
       }
        if(($(tv).find('p.price').find('a').text())!=null){
          newPrice = $(tv).find('p.price').find('a').text();
          newPrice = newPrice.replace(/[ \t\r\n]+/g,"");
          newPrice = newPrice.replace(/£/g, "");
          newPrice = newPrice.replace(/,/g, "");
        }

       var descString = "";
       var descStringArr = [];
       if(($(tv).find('strong').text())!=null){
        description = $(tv).find('strong').text();
           descString = $(tv).find('strong').text();
           if (descString.match(/Plasma/)){
            tvType = "Plasma";
           }
           if (descString.match(/LED/)){
            tvType = "LED";
           }
           if (descString.match(/LCD/)){
            tvType = "LCD";
           }
           if (descString.match(/\d{2}("|”)/)){
            screenSize = descString.match(/\d{2}("|”)/);
            screenSize = screenSize[0].replace('"','');
           }
           if (descString.match(/\d{2} Inch/)){
            screenSize = descString.match(/\d{2} Inch/);
            screenSize = screenSize[0].replace(' Inch','');
           }

           descStringArr = descString.split(" ");
           make = descStringArr[2];
           make =  make.replace(/[ \t\r\n]+/g,"");
           //newPrice = descStringArr;

           //tvType = descStringArr[5];
           //screenSize = descStringArr[9];
          // newPrice = descStringArr[20];


       }

           //make seo friendly url from description
       if (description!=''){
      urlDesc = description.split(',')[0].replace(/\s+/g,'-').toLowerCase();
       if (urlDesc!=''){
        if (urlDesc.slice(-1)=="."){
          urlDesc = urlDesc.substring(0,urlDesc.length-1);
        }
         if (urlDesc.charAt(0)=="-"){
          urlDesc = urlDesc.replace('-',"");
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

      brand = make.toLowerCase();
      retailer = retailer.toLowerCase();


      // tvOffer.push(discount);
      if (discount.match(/^\d+/)){
       //tvOffer.push("http://www.johnlewis.com" + productLink);
       //tvOffer.push("http://"+imageLink);
       //work out old price and  % off
       //var oldPrice = parseFloat(newPrice) - parseFloat(discount);
       //var percentDiscount = Math.ceil(parseFloat(discount)/newPrice * 100);
       //tvOffer.push(parseFloat(newPrice));
       //tvOffer.push(parseFloat(discount));
       //tvOffer.push(oldPrice);
       //tvOffer.push(retailer);
       //tvOffer.push(make);
       //tvOffer.push(screenSize);
       //tvOffer.push(tvType);
       //tvOffer.push(productType);
       //tvOffer.push(percentDiscount);
     
 
       var url = {};
       var pricing = {};
       var details = {};

       var productUrl = "http://www.johnlewis.com" + productLink;
       url.product = productUrl;
       encodedProductUrl = encodeURIComponent(productUrl);
       //skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1347041&site=www.specialoffershopper.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=d1cbe13e65417e162e392fc0edcccb5f&xcreo=0&sref=http%3A%2F%2Fwww.specialoffershopper.co.uk&xtz=-660';
       skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1506902&site=www.offercrunch.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=a11734410a17086b1e3a57e4e942b244&xcreo=0&sref=http%3A%2F%2Fwww.offercrunch.co.uk&xtz=-60';

       url.image = "http://" + imageLink;
       url.skimlinks = skimlinksUrl;
       var oldPrice = parseFloat(newPrice) + parseFloat(discount);
       pricing.original = oldPrice;
       pricing.offer = parseFloat(newPrice);
       pricing.savings = parseFloat(discount);
       details.screenSize = parseFloat(screenSize);
       details.screenType = tvType;
       tvOffer.url = url;
       tvOffer.details = details;
       tvOffer.retailer = retailer;
       tvOffer.type = productType;
       tvOffer.brand = brand;
       tvOffer.isValid = true;
       tvOffer.description = description;
       tvOffer.urlDesc = urlDesc;
        
       //percentage discount
       pctSavings = Math.ceil((parseFloat(discount))/parseFloat(oldPrice) * 100);
       pricing.pctSavings = parseFloat(pctSavings);
       tvOffer.pricing = pricing;
      }
     
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
    var johnlewisTelevisions = this.evaluate(getTelevisionOffers);
    //utils.dump(johnlewisTelevisions);
    if (johnlewisTelevisions!=null){
      for (var i=0; i < johnlewisTelevisions.length; i++){
        if (johnlewisTelevisions[i].type != undefined){
      
       var tvString = JSON.stringify(johnlewisTelevisions[i]);
       this.echo(tvString);
       fs.write('./john lewis-television.txt', tvString + "\n", 'a');
    
    }
      }
      //this.echo(johnlewisTelevisions.length);
 





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

casper.start("http://www.johnlewis.com/electricals/televisions/tv-special-offers/c800001149", function() {
 
});


casper.run(
   processPage
);
