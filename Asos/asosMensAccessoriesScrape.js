var utils = require('utils');
var fs = require('fs'); 
var casper = require("casper").create({
    verbose: true,
    logLevel: "debug",
    waitTimeout: 1000,
    pageSettings: {
        userAgent: "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:15.0) Gecko/20120427 Firefox/15.0a1"
    }
});
casper.options.clientScripts = ["jquery.js"];

function getTelevisionOffers(){
  var tvOfferSections = $('ul#items li');

  var tvOffers = Array.prototype.map.call(tvOfferSections, function(tv){
    var tvOffer = {};

    var productUrl, imageUrl, originalPrice, offerPrice, savings, screenSize, properties, brand, pctSavings = "";
    var retailer = 'asos';
    var category = 'fashion';
    var productType = 'jeans';
    var gender = 'm';
    var description = '';
    var urlDesc = '';
    var encodedProductUrl = '';
    var skimlinksUrl = '';
    var description = '';

    if(($(tv).find('a.desc').attr('href'))!=null){
      productUrl = $(tv).find('a.desc').attr('href');
      productUrl = "http://www.asos.com"+productUrl;
    }
    if(($(tv).find('a.desc').text())!=null){
      description = $(tv).find('a.desc').text();  
    }
    
    if(($(tv).find('img').attr('src'))!=null){
      imageUrl = $(tv).find('img').attr('src');
    }


    if(($(tv).find('span.recRP.rrp').text())!=null){
        originalPrice = $(tv).find('span.recRP.rrp').text();
        originalPrice = originalPrice.match(/\.?\d[\d.,]*/);
      if (originalPrice!=null){
        originalPrice = originalPrice[0];
      }else{
        // return {};
      }
    } 

    if (originalPrice == null){
       if(($(tv).find('.price').text())!=null){
      originalPrice = $(tv).find('.price').text();
      originalPrice = originalPrice.match(/\.?\d[\d.,]*/);
      if (originalPrice!=null){
        originalPrice = originalPrice[0];
      }else{
  
      }
    }
    } 

    if(($(tv).find('.outlet-current-price').text())!=null){
      
     offerPrice = $(tv).find('.outlet-current-price').text();
     offerPrice = offerPrice.match(/\.?\d[\d.,]*/);
      if (offerPrice!=null){
       offerPrice = offerPrice[0];
       }
    }
    
    if (offerPrice == null){
    if(($(tv).find('span.prevPrice.previousprice').text())!=null){
       offerPrice = $(tv).find('span.prevPrice.previousprice').text();
      offerPrice = offerPrice.match(/\.?\d[\d.,]*/);
       if (offerPrice!=null){
        offerPrice = offerPrice[0];
       }
    }
    }


    //     //make seo friendly url from description
     if (description!=''){
        urlDesc = description.replace(/\s+/g,'-').toLowerCase();
       if (urlDesc!=''){
         if (urlDesc.slice(-1)=="."){
          urlDesc = urlDesc.substring(0,urlDesc.length-1);
        }
         urlDesc = urlDesc.replace(/"/g,"");
         urlDesc = urlDesc.replace(/--/g,"");
         urlDesc = urlDesc.replace(/\//g,"-");
       }
     }else{
    //   //back up if desc is not scraped
       var unique = parseFloat(Math.floor(Math.random() * 1000000000));
       urlDesc = brand + '-' + productType + '-' + unique;
     }

    encodedProductUrl = encodeURIComponent(productUrl);
    // skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1347041&site=www.specialoffershopper.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=d1cbe13e65417e162e392fc0edcccb5f&xcreo=0&sref=http%3A%2F%2Fwww.specialoffershopper.co.uk&xtz=-660';
    skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1506902&site=www.offercrunch.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=a11734410a17086b1e3a57e4e942b244&xcreo=0&sref=http%3A%2F%2Fwww.offercrunch.co.uk&xtz=-60';


    // if (isNaN(parseInt(screenSize)) && brand == 'Apple'){
    //   screenSize = parseFloat(propertiesArr[4]);
    // }

    // brand = brand.toLowerCase();
    // retailer = retailer.toLowerCase();

    // if (originalPrice != null){
     



    var brands = ['Crosshatch','!Solid','A Question Of','American Apparel','Anerkjendt','Antony Morato','ASOS','Barbour','Bellfield','Ben Sherman','Blood Brother','Brave Soul','Carhartt','Cheap Monday','D-Struct','Ralph Lauren','Deus Ex Machina','Diesel','DKNY','DZ','Esprit','Farah Vintage','Firetrap','Fred Perry','Fred Perry Laurel Wreath','French Connection','G-Star','Gant Rugger','Henleys','Hilfiger Denim','Jack & Jones','Jack Wills','Joyrich','Kulte','Lacoste','Levis','Libertine Libertine','Love Moschino','Lyle & Scott','Merc','Minimum','Native Youth','New Look','Nudie Jeans','Penfield','Pepe','Ralph Lauren','Paul Smith','Pull&Bear','Quiksilver','Reclaimed','Reiss','Religion','Ringspun','River Island','Rock & Revival','Selected','Soulland','Superdry','Supreme Being','Ted Baker','The Kooples Sport','Tommy Hilfiger','Unconditional','Uniforms For The Dedicated','United Colors of Benetton','Vacant','VITO','Voi Jeans','Wolsey','Wood Wood','YMC'];

    var brand = '';
    var firstWord = description.split(' ')[0];
    var twoWords = firstWord + " " + description.split(' ')[1];
    var threeWords = twoWords + " " + description.split(' ')[2];

    if (($.inArray(firstWord, brands))!=-1){
      brand = firstWord;
    }
    if (($.inArray(twoWords, brands))!=-1){
      brand = twoWords;
    }
    if (($.inArray(threeWords, brands))!=-1){
      brand = threeWords;
    }
    // if (brand == ''){
    //   if (($.inArray(description.split(' ')[0]) + " " + description.split(' ')[1], brands))!=-1){
    //   brand = description.split(' '[0])+ " " + description.split(' ')[1];
    // }
    // }

    var url = {};
    var pricing = {};
    // var details = {};
     url.product = productUrl;
     url.image = imageUrl;
     url.skimlinks = skimlinksUrl;
     pricing.original = parseFloat(originalPrice);
     pricing.offer = parseFloat(offerPrice);
     var savings = parseFloat(originalPrice) - parseFloat(offerPrice);
     pricing.savings = Math.round(savings * 100)/100;
     pricing.pctSavings = parseInt(savings/parseFloat(originalPrice) * 100);
    // details.screenSize = screenSize;
    // details.screenType = tvType;
     tvOffer.url = url;
    // tvOffer.details = details;
     tvOffer.retailer = retailer;
     tvOffer.type = productType;
     tvOffer.description = description;
     tvOffer.brand = brand;
     tvOffer.urlDesc = urlDesc;
     tvOffer.category = category;
     tvOffer.gender = gender;

    // //percentage discount
    // pctSavings = Math.ceil((savings)/originalPrice * 100);
    // pricing.pctSavings = pctSavings;
     tvOffer.pricing = pricing;
    // tvOffer.description = description;
    // //tvOffer.last_updated = new Date();
    // tvOffer.isValid = true;
    // }
      return tvOffer;
  });
  return tvOffers;
}

var processPage = function() {
  var argosTelevisions = this.evaluate(getTelevisionOffers);
    if (argosTelevisions!=null){
      for (var i=0; i < argosTelevisions.length; i++){
           if (argosTelevisions[i].type != undefined){
            // if (isNaN(parseInt(argosTelevisions[i].pricing.original))){
            //   continue;
            // }
            //var televisionString = JSON.stringify(argosTelevisions[i]);
            //fs.write('./Argos-television.txt', televisionString + "\n", 'a');
            utils.dump(argosTelevisions[i]);
           }
        }
    }else{
      this.echo('no offers');
    }
    this.exit();
};

casper.start("http://www.asos.com/Men/Sale/Jackets-Coats/Cat/pgecategory.aspx?cid=2112", function() {
    // http://www.asos.com/Men/Sale/Jeans/Cat/pgecategory.aspx?cid=5230 jeans
    // http://www.asos.com/Men/Sale/Jumpers-Cardigans/Cat/pgecategory.aspx?cid=3137
});

casper.run(
  processPage
);