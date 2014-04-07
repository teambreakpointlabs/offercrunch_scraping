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

function getShoeOffers(){
  var shoeOfferSections = $('ul#items li');

  var shoeOffers = Array.prototype.map.call(shoeOfferSections, function(shoe){
    var shoeOffer = {};

    var productUrl, imageUrl, originalPrice, offerPrice, savings, screenSize, properties, brand, pctSavings = "";
    var retailer = 'asos';
    var category = 'fashion';
    var productType = 'shoe';
    var gender = 'women';
    var description = '';
    var urlDesc = '';
    var encodedProductUrl = '';
    var skimlinksUrl = '';
    var description = '';

    if(($(shoe).find('a.desc').attr('href'))!=null){
      productUrl = $(shoe).find('a.desc').attr('href');
      productUrl = "http://www.asos.com"+productUrl;
    }
    if(($(shoe).find('a.desc').text())!=null){
      description = $(shoe).find('a.desc').text();  
    }
    
    if(($(shoe).find('img').attr('src'))!=null){
      imageUrl = $(shoe).find('img').attr('src');
    }


    if(($(shoe).find('span.recRP.rrp').text())!=null){
        originalPrice = $(shoe).find('span.recRP.rrp').text();
        originalPrice = originalPrice.match(/\.?\d[\d.,]*/);
      if (originalPrice!=null){
        originalPrice = originalPrice[0];
      }else{
        // return {};
      }
    } 

    if (originalPrice == null){
       if(($(shoe).find('.price').text())!=null){
      originalPrice = $(shoe).find('.price').text();
      originalPrice = originalPrice.match(/\.?\d[\d.,]*/);
      if (originalPrice!=null){
        originalPrice = originalPrice[0];
      }else{
  
      }
    }
    } 

    if(($(shoe).find('.outlet-current-price').text())!=null){
      
     offerPrice = $(shoe).find('.outlet-current-price').text();
     offerPrice = offerPrice.match(/\.?\d[\d.,]*/);
      if (offerPrice!=null){
       offerPrice = offerPrice[0];
       }
    }
    
    if (offerPrice == null){
    if(($(shoe).find('span.prevPrice.previousprice').text())!=null){
       offerPrice = $(shoe).find('span.prevPrice.previousprice').text();
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
     



    // var brands = ['Crosshatch','!Solid','A Question Of','American Apparel','Anerkjendt','Antony Morato','ASOS','Barbour','Bellfield','Ben Sherman','Blood Brother','Brave Soul','Carhartt','Cheap Monday','D-Struct','Ralph Lauren','Deus Ex Machina','Diesel','DKNY','DZ','Esprit','Farah Vintage','Firetrap','Fred Perry','Fred Perry Laurel Wreath','French Connection','G-Star','Gant Rugger','Henleys','Hilfiger Denim','Jack & Jones','Jack Wills','Joyrich','Kulte','Le Coq Sportif','Lacoste','Levis','Libertine Libertine','Love Moschino','Lyle & Scott','Merc','Minimum','Timberland','Native Youth','New Look','Nike','Nudie Jeans','Penfield','Pepe','Ralph Lauren','Paul Smith','Pull&Bear','Quiksilver','Reclaimed','Reiss','Religion','Ringspun','River Island','Rock & Revival','Selected','Soulland','Superdry','Supreme Being','Ted Baker','The Kooples Sport','Tommy Hilfiger','Unconditional','Uniforms For The Dedicated','United Colors of Benetton','Vacant','Vans','VITO','Voi Jeans','Wolsey','Wood Wood','YMC'];
    var brands = ['ALDO','Ash','ASOS','B Store','Barbour','BCBGeneration','Be&D','Bertie','Birkenstock','Black Secret','Blink','Bobbies','Boo Roo','Bronx','Call it Spring','Calvin Klein','Carvela','Caterpillar','Cheap Monday','Chinese Laundry','Chocolate Schubar','Converse','Deux Souliers','DKNY','Dr Martens','Dune','Elizabeth and James','Emu','F-Troupe','Faith','Fred Perry','French Connection','French Sole','Frye','Ganni','Gola','Golddigga','Guess','H By Hudson','Havaianas','House of Harlow','Hunter','Ipanema','Jack Wills','Jean Michel Cazabat','Juju','K-Swiss','Karen Millen','KELSI DAGGER','KG Kurt Geiger','Kiboots','Lacoste','Le Coq Sportif','London Rebel','Love From Australia','Love Moschino','Luxury Rebel','Mango','Marc By Marc Jacobs','Markus Lupfer','Mel By Melissa','Melissa','Messeca','Miista','Minimarket','Miss KG','Miss Trish','Monki','Moon Boot','New Balance','New Kid','New Look','Nike','Oasis','Onitsuka Tiger','Palladium','Park Lane','Pieces','Pollini','Pony','Pour La Victoire','Protest','Pull&Bear','Puma','Ravel','Report Signature','River Island','Roxy','Rubber Duck','Sam Edelman','Chloe','Senso','Seychelles','Shellys London','Shoe the Bear','Sol Sana','Sole Society','Sophia Kokosalaki','Sorel','Steve Madden','Sugarfree Shoes','Superga','Supra','Swear','Swedish Hasbeens','Ted Baker','Timberland','Timeless','Toms','Truffle','UGG','Underground','Vagabond','Vans','Vila','Vivienne Westwood','Whistles','Wolverine','Won Hundred','Wood Wood','YMC','Youth Rise Up','Zigi'];

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

    brand = brand.toLowerCase();

    var url = {};
    var pricing = {};
     url.product = productUrl;
     url.image = imageUrl;
     url.skimlinks = skimlinksUrl;
     pricing.original = parseFloat(originalPrice);
     pricing.offer = parseFloat(offerPrice);
     var savings = parseFloat(originalPrice) - parseFloat(offerPrice);
     pricing.savings = Math.round(savings * 100)/100;
     pricing.pctSavings = parseInt(savings/parseFloat(originalPrice) * 100);
     shoeOffer.url = url;
     shoeOffer.retailer = retailer;
     shoeOffer.type = productType;
     shoeOffer.description = description;
     shoeOffer.brand = brand;
     shoeOffer.urlDesc = urlDesc;
     shoeOffer.category = category;
     shoeOffer.gender = gender;
     shoeOffer.pricing = pricing;
     shoeOffer.isValid = true;
    return shoeOffer;
  });
  return shoeOffers;
}

var processPage = function() {
  var asosMensShoes = this.evaluate(getShoeOffers);
    if (asosMensShoes!=null){
      for (var i=0; i < asosMensShoes.length; i++){
           if (asosMensShoes[i].type != undefined){
            // if (isNaN(parseInt(argosTelevisions[i].pricing.original))){
            //   continue;
            // }
            var shoeString = JSON.stringify(asosMensShoes[i]);
            fs.write('./asos-shoe.txt', shoeString + "\n", 'a');
            utils.dump(asosMensShoes[i]);
           }
        }
    }else{
      this.echo('no offers');
    }
    this.exit();
};

casper.start("http://www.asos.com/Women/Sale/Shoes/Cat/pgecategory.aspx?cid=1931", function() {
   // http://www.asos.com/Men/Sale/Jackets-Coats/Cat/pgecategory.aspx?cid=2112
    // http://www.asos.com/Men/Sale/Jeans/Cat/pgecategory.aspx?cid=5230 jeans
    // http://www.asos.com/Men/Sale/Jumpers-Cardigans/Cat/pgecategory.aspx?cid=3137
});

casper.run(
  processPage
);