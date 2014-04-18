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
  var shoeOfferSections = $('.product-list-element');

  var shoeOffers = Array.prototype.map.call(shoeOfferSections, function(shoe){
    var shoeOffer = {};

    var productUrl, imageUrl, originalPrice, offerPrice, savings, screenSize, properties, brand, pctSavings = "";
    var retailer = 'house of fraser';
    var category = 'fashion';
    var productType = 'shoe';
    var gender = 'women';
    var description = '';
    var urlDesc = '';
    var encodedProductUrl = '';
    var skimlinksUrl = '';
    var description = '';

    if(($(shoe).find('.product-description').find('a').attr('href'))!=null){
      productUrl = $(shoe).find('.product-description').find('a').attr('href')
    }
    if(($(shoe).find('.product-description').find('h3').text())!=null){
      description = $(shoe).find('.product-description').find('h3').text();
      description = description.replace(/\r?\n|\r/g, "");
      description = description.replace(".","");
    }
    
    if(($(shoe).find('img').attr('src'))!=null){
      imageUrl = $(shoe).find('img').attr('src');
    }


    if(($(shoe).find('span.price-was').text())!=null){
        originalPrice = $(shoe).find('span.price-was').text();
        originalPrice = originalPrice.match(/\.?\d[\d.,]*/);
      if (originalPrice!=null){
        originalPrice = originalPrice[0];
      }else{
        // return {};
      }
    } 

    // if (originalPrice == null){
    //    if(($(shoe).find('.price').text())!=null){
    //   originalPrice = $(shoe).find('.price').text();
    //   originalPrice = originalPrice.match(/\.?\d[\d.,]*/);
    //   if (originalPrice!=null){
    //     originalPrice = originalPrice[0];
    //   }else{
  
    //   }
    // }
    // } 

    if(($(shoe).find('span.price-now').text())!=null){
      
     offerPrice = $(shoe).find('span.price-now').text();
     offerPrice = offerPrice.match(/\.?\d[\d.,]*/);
      if (offerPrice!=null){
       offerPrice = offerPrice[0];
       }
    }
    
    // if (offerPrice == null){
    // if(($(shoe).find('span.prevPrice.previousprice').text())!=null){
    //    offerPrice = $(shoe).find('span.prevPrice.previousprice').text();
    //   offerPrice = offerPrice.match(/\.?\d[\d.,]*/);
    //    if (offerPrice!=null){
    //     offerPrice = offerPrice[0];
    //    }
    // }
    // }


    // //     //make seo friendly url from description
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
    // // skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1347041&site=www.specialoffershopper.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=d1cbe13e65417e162e392fc0edcccb5f&xcreo=0&sref=http%3A%2F%2Fwww.specialoffershopper.co.uk&xtz=-660';
    skimlinksUrl = 'http://go.redirectingat.com/?id=54354X1506902&site=www.offercrunch.co.uk&xs=1&isjs=1&url='+ encodedProductUrl + '&xguid=a11734410a17086b1e3a57e4e942b244&xcreo=0&sref=http%3A%2F%2Fwww.offercrunch.co.uk&xtz=-60';


    // if (isNaN(parseInt(screenSize)) && brand == 'Apple'){
    //   screenSize = parseFloat(propertiesArr[4]);
    // }

    // brand = brand.toLowerCase();
    // retailer = retailer.toLowerCase();

    // if (originalPrice != null){
     



    // var brands = ['Crosshatch','!Solid','A Question Of','American Apparel','Anerkjendt','Antony Morato','ASOS','Barbour','Bellfield','Ben Sherman','Blood Brother','Brave Soul','Carhartt','Cheap Monday','D-Struct','Ralph Lauren','Deus Ex Machina','Diesel','DKNY','DZ','Esprit','Farah Vintage','Firetrap','Fred Perry','Fred Perry Laurel Wreath','French Connection','G-Star','Gant Rugger','Henleys','Hilfiger Denim','Jack & Jones','Jack Wills','Joyrich','Kulte','Le Coq Sportif','Lacoste','Levis','Libertine Libertine','Love Moschino','Lyle & Scott','Merc','Minimum','Timberland','Native Youth','New Look','Nike','Nudie Jeans','Penfield','Pepe','Ralph Lauren','Paul Smith','Pull&Bear','Quiksilver','Reclaimed','Reiss','Religion','Ringspun','River Island','Rock & Revival','Selected','Soulland','Superdry','Supreme Being','Ted Baker','The Kooples Sport','Tommy Hilfiger','Unconditional','Uniforms For The Dedicated','United Colors of Benetton','Vacant','Vans','VITO','Voi Jeans','Wolsey','Wood Wood','YMC'];

    // var brands = ['Adidas Originals','ALDO','Anthony Miles','Antoine and Stanley','ASOS','Barbour','Base London','Beck & Hersey','Bellfield','Ben Sherman','Bobbies','Boxfresh','Buttero','CAT','Converse','Creative Recreation','Crosshatch','Diesel','Dolce & Gabbana','Dune','Feud','Firetrap','Base','Frank Wright','Fred Perry','Gola','Gourmet','Grenson','Hudson','Homeys','Hugo Boss','Hummel','Hush Puppies','Hype','Jack & Jones','Jeffery West','Kurt Geiger','Lacoste','Le Coq Sportif','Loake','Marc Jacobs','New Balance','New Look','Nike','Onitsuka','Tiger','Paul Smith','Ralph Lauren','Pony','Pull&Bear','Puma','Quiksilver','Reiss','Religion','River Island','Rock & Revival','Rokin','Rolando Sturlini','Selected','Shoe the Bear','Skive','Soulland','Supra','Ted Baker','The North Face','Timberland','Trickers','Underground','Vans','Vivienne Westwood','XTI','YMC'];


    //var brands = ['Armani Junior','Ashworth','Barker','Bertie','Bonnie Baby','Camper','Caterpillar','Duca Del Cosma','Dune','Ecco','FitFlop','Gandys','Geox','Havaianas','Howick','Hudson','Hugo Boss','Hunter','Jack & Jones','Joules','Just Sheepskin','Kikkor Golf','Lacoste','Linea','Monta Munda','Nike','Oliver Sweeney','Original Penguin','Paul Smith','Peter Werth','Pied a Terre','Ralph Lauren','Puma','Rockport','Roland Cartier','Steve Madden','Superga','Ted Baker','Timberland','Tommy Hilfiger','UGG','Vivienne Westwood'];
    //var brands = ['Alexandre Savile Row','Aquascutum','Armani Collezioni','Armani Jeans','Army & Navy','Barbour','Baumler','Beck & Hersey','Bellfield','Bench','Ben Sherman','Billabong','Boxfresh','Chester Barrie','Corsivo','Criminal','Daniel Hechter','Ralph Lauren','Desigual','Diesel ','Dockers','Duchamp','Duck and Cover','Farah','Farrell','Fly53','Fred Perry','French Connection','Gant','G-Star','Hackett','Hardy Amies','Henri Lloyd','Howick','Hugo Boss ','Jack & Jones','Jaeger','JC Rags','J Lindeberg','Joules','Kenneth Cole','Label Lab','Levis','Lightning Bolt','Linea','Lyle and Scott','Merc','Minimum','Native Youth','New & Lingwood','Original Penguin','Patrick Cox','Paul & Shark','Paul Costelloe','Paul Smith','Paul Smith','Peter Werth','Ralph Lauren','Pretty Green','Quiksilver','Racing Green','Raging Bull','Religion','Richard James Mayfair ','Scotch & Soda','Simon Carter','Skopes','Supreme Being','Ted Baker','Thomas Pink','TM Lewin','Tommy Hilfiger','True Religion','Victorinox','Villain','Vivienne Westwood','Weird Fish','White Stuff','Without Prejudice','1 like no other','7 For All Mankind','883 Police'];
    //var brands = ['Adrianna Papell','Aftershock','Alexon','Almari','Anglomania','Aquascutum','Armani','Atelier 61','Awear','Barbour','Bench','Biba','Boutique by Jaeger','CC','Chervo','Chesca','Closet','Coast','Cutie','Damsel in a Dress','Dash','Day Birger Et Mikkelsen','Ralph Lauren','Desigual','Dickins & Jones','Diesel','East','Eastex','Episode','Fenn Wright Manson','Finders Keepers','French Connection','Gestuz','Ginger Fizz','Glamorous','Golfino','Great Plains','Green Lamb','Hallhuber','Helen McAlinden','Hobbs','HotSquash','Iro','Izabel London','Jacques Vert','Jaeger','James Lakeland','Jane Norman','John Zack','Jolie Moi','Kaliko','Karen Millen','Kenneth Cole','Kilian Kerner Senses','L.K. Bennett','Label Lab','Lands End','Lashes','LIJA','Linea','Linea','Lipsy','Liu Jo','Love','Love Moschino','Mango','Marella','Mary Portas','Masters','Maurie & Eve','MaxMara Studio','Michael Kors','Mint Velvet','Minuet Petite','Motel','Negarin','NEON ROSE','Noisy May','Oasis','Olivia Rubin','Only','Oui','Paper Dolls','Phase Eight','Philosophy','Pied a Terre','Ping','Planet','Precis Petite','Pussycat','Quiz','Religion','Replay','Reverse','Rutzou','Salsa','Samya','Sandwich','Second Female','Selfish','Smash','Sodamix','St Martins','Suit Female','Superdry','Taking Shape','Ted Baker','tfnc','The Department','Therapy','Tommy Hilfiger','True Decadence','True Religion','Uttam Boutique','Vero Moda','Vila','Viyella','Wal-G','Warehouse','Weekend MaxMara','Whistles','White Stuff','Windsmoor','Worn By','Yanny London','Yumi'];
    var brands = ['Aldo','Anne Klein','Ash','Bertie','Carvela','Converse','Dash','Dune','Episode','FitFlop','Gabor','Gandys','Geox','Gola','Gordon Scott','Head Over Heels ','Hobbs','Jane Norman','Jessica Simpson','Jones Bootmaker','Karen Millen','KG','Kurt Geiger','L.K. Bennett','Ralph Lauren','Linea','Lipsy','Lotus','Mascotte','Melissa','Michael Kors','Miss KG','Naturalizer','Nine West','Oasis','Office','Paul Green','Phase Eight','Pied a Terre','Planet','Pretty Ballerina','Ravel','Sam Edelman','Steve Madden','Superga','Toms','UGG','Untold','Van Dal','Vince Camuto','Whistles'];

    var brand = '';

    for (var i=0;i<brands.length;i++){
      if (description.match(brands[i])){
        brand = brands[i];
        break;
      }
    }


    // var firstWord = description.split(' ')[0];
    // var twoWords = firstWord + " " + description.split(' ')[1];
    // var threeWords = twoWords + " " + description.split(' ')[2];

    // if (($.inArray(firstWord, brands))!=-1){
    //   brand = firstWord;
    // }
    // if (($.inArray(twoWords, brands))!=-1){
    //   brand = twoWords;
    // }
    // if (($.inArray(threeWords, brands))!=-1){
    //   brand = threeWords;
    // }

    // if (description.match('Paul Smith')){
    //   brand = 'Paul Smith';
    // }
    // if (description.match('Ralph Lauren')){
    //   brand = 'Ralph Lauren';
    // }

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
     var savingsString = savings.toFixed(2);
           savingsString = savingsString.replace(".","-");

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
            fs.write('./hof-shoe.txt', shoeString + "\n", 'a');
            utils.dump(asosMensShoes[i]);
           }
        }
        this.echo(asosMensShoes.length);
    }else{
      this.echo('no offers');
    }
    this.exit();
};

casper.start("http://www.houseoffraser.co.uk/Ladies+Shoes/S4160,default,sc.html?start=0&sz=500", function() {
   
   // http://www.asos.com/Men/Sale/Jackets-Coats/Cat/pgecategory.aspx?cid=2112
    // http://www.asos.com/Men/Sale/Jeans/Cat/pgecategory.aspx?cid=5230 jeans
    // http://www.asos.com/Men/Sale/Jumpers-Cardigans/Cat/pgecategory.aspx?cid=3137
});

casper.run(
  processPage
);