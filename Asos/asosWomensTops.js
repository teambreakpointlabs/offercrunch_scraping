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
    var productType = 'top';
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
    //var brands = ['ALDO','Ash','ASOS','B Store','Barbour','BCBGeneration','Be&D','Bertie','Birkenstock','Black Secret','Blink','Bobbies','Boo Roo','Bronx','Call it Spring','Calvin Klein','Carvela','Caterpillar','Cheap Monday','Chinese Laundry','Chocolate Schubar','Converse','Deux Souliers','DKNY','Dr Martens','Dune','Elizabeth and James','Emu','F-Troupe','Faith','Fred Perry','French Connection','French Sole','Frye','Ganni','Gola','Golddigga','Guess','H By Hudson','Havaianas','House of Harlow','Hunter','Ipanema','Jack Wills','Jean Michel Cazabat','Juju','K-Swiss','Karen Millen','KELSI DAGGER','KG Kurt Geiger','Kiboots','Lacoste','Le Coq Sportif','London Rebel','Love From Australia','Love Moschino','Luxury Rebel','Mango','Marc By Marc Jacobs','Markus Lupfer','Mel By Melissa','Melissa','Messeca','Miista','Minimarket','Miss KG','Miss Trish','Monki','Moon Boot','New Balance','New Kid','New Look','Nike','Oasis','Onitsuka Tiger','Palladium','Park Lane','Pieces','Pollini','Pony','Pour La Victoire','Protest','Pull&Bear','Puma','Ravel','Report Signature','River Island','Roxy','Rubber Duck','Sam Edelman','Chloe','Senso','Seychelles','Shellys London','Shoe the Bear','Sol Sana','Sole Society','Sophia Kokosalaki','Sorel','Steve Madden','Sugarfree Shoes','Superga','Supra','Swear','Swedish Hasbeens','Ted Baker','Timberland','Timeless','Toms','Truffle','UGG','Underground','Vagabond','Vans','Vila','Vivienne Westwood','Whistles','Wolverine','Won Hundred','Wood Wood','YMC','Youth Rise Up','Zigi'];
    var brands = ['18 And East','2nd Day','7 For All Mankind','71 Stanton','A Question Of','A Wear','Adidas','Alice & You','American Apparel','American Vintage','Amplified','Antipodium','AQ AQ','Aqua','Arrogant Cat','Aryn K','Ashish','ASOS','ASOS Africa','ASOS Curve','ASOS Maternity','ASOS Petite','ASOS White','AX Paris','B Side By Wale','B+AB','b.Young','BA&SH','Back By Ann Sofie Back','Band of Gypsies','Baum Und Pferdgarten','Bellfield','Beloved','Bitching & Junkfood','Black Secret','Bolzoni & Walsh','Boulee','Boutique by Jaeger','BOY London','Brashy Couture','Brat & Suzie','Brave Soul','By Zoe','BZR','CAPTURE By Hollywood Made','Carhartt','Carmakoma','Chalayan Grey Line','Cheap Monday','Chinti and Parker','Club L','Colorblock','Costa Blanca','Criminal Damage','Current/Elliott','d.RA','Daisy Street','Darling','Denham','Denim & Supply by Ralph Lauren','Diesel','Dimepiece','Dress Gallery','Earth Couture','Edit','Eleven Paris','ELLESSE','Elliot Atkinson','Emma Cook','Esprit','Essentiel Antwerp','Evil Twin','Finders Keepers','For Love And Lemons','Freak of Nature','Free People','French Connection','G-Star','Ganni','Gestuz','Girl. by Band of Outsiders','Glamorous','Glamorous Petite','Glamorous Tall','Goldie','Goodie Two Sleeves','HOUSE of HACKNEY','Hilfiger Denim','House of Holland','Illustrated People','Influence','Insight','Iro','Isabella Oliver','Jack Wills','James Perse','Jarlo','JDY','JNBY','Joes Jeans','Jovonna','Jovonnista','Joyrich','Joyrich','Joystick Junkies','Juicy Couture','Junarose','Junk Food','Just Female','Karen Millen','Kate Thomas','Katie Judith','Kill City','Kiss The Sky','Lacoste','Lacoste Live','Lashes of London','Lavish Alice','Lazy Oaf','Les Prairies de Paris','Levis','Lipsy','Liquorish','Little Mistress','Little White Lies','LNA','Louise Amstrup','Love','Love & Liberty','Love Moschino','Love Zooey','Lovestruck','Lucabella','Lulu & Co','Lydia Bright','Maison Scotch','Mama.licious','Mango','Markus Lupfer','Max C London','Meghan Fabulous','MiH Jeans','Mina','Minimum','Minkpink','Monki','Motel','Mother of Pearl','Mr Gugu & Miss Go','Needle & Thread','Neon Rose','New Look','New Look Inspire','New Look Maternity','New Look Petite','New Look Tall','Nike','Noisy May','Oasis','Obey','Oh My Love','Olivia Rubin','One Teaspoon','OnePiece','Only','Ostwald Helgason','Other UK','Paradis London','Paul & Joe Sister','Paul by Paul Smith','Pencey','Pencey Standard','Penfield','People Tree','Pepe Jeans','Peter Jensen','Pieces','Pippa Lynn','Poor Boy','Pop Boutique','POP CPH','Poppy Lux','Pull&Bear','Puma','Quontum','Rag & Bone/JEAN','Rare','Reclaimed','Religion','River Island','Roxy','RVCA','Sass & Bide','Sauce','See by Chloe','See U Soon','Selected','Selfish By Forever Unique','Sessun','Shackled','Sick Girl','Skargorn','Somedays','Sonia by Sonia Rykiel','Sophia Kokosalaki','South Parade','Spijkers en Spijkers','Splendid','Storm and Marie','Stussy','Sugarhill Boutique','Taller Than Your Average','Ted Baker','Textile Federation','The Furies','The Kooples Sport','The Style','The WhitePepper','Three Floor','TO LOVE KUVAA','Tokyo Laundry','Traffic People','True Decadence','True Decadence Petite','Twenty8Twelve','Twist & Tango','Twisted Muse','UCLA','Ukulele','Vero Moda','Vero Moda Very','Vila','Voodoo Girl','Wackerhaus','Wal G','Warehouse','Whistles','White Chocoolate','Whitney Eve','Wildfox','Wildfox White Label','Winter Kate','Wood Wood','Worn By','Y.A.S','YMC','Your Eyes Lie','Yumi','Zoe Karssen'];


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

    //ralph lauren not being picked up
    if (description.match('Ralph Lauren')){
      brand = 'Ralph Lauren';
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
     savings = Math.round(savings * 100)/100;
     pricing.savings = savings;
     var percentageSaved = parseInt(savings/parseFloat(originalPrice) * 100);
     pricing.pctSavings = percentageSaved;
     var savingsString = '' + savings;
     if (savingsString!='NaN'){
      urlDesc = urlDesc + "-" + percentageSaved + "-percent-off-save-"+savingsString+"-pounds";
     }else{
      return {};
     }
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
            fs.write('./asos-top.txt', shoeString + "\n", 'a');
            utils.dump(asosMensShoes[i]);
           }
        }
        this.echo(asosMensShoes.length);
    }else{
      this.echo('no offers');
    }
    this.exit();
};

casper.start("http://www.asos.com/Women/Sale/Tops/Cat/pgecategory.aspx?cid=4167&r=2#parentID=-1&pge=0&pgeSize=500&sort=-1", function() {
   // http://www.asos.com/Men/Sale/Jackets-Coats/Cat/pgecategory.aspx?cid=2112
    // http://www.asos.com/Men/Sale/Jeans/Cat/pgecategory.aspx?cid=5230 jeans
    // http://www.asos.com/Men/Sale/Jumpers-Cardigans/Cat/pgecategory.aspx?cid=3137
});

casper.run(
  processPage
);