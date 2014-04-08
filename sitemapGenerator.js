var mongodb = require('mongodb')
  , MongoClient = mongodb.MongoClient;

var lazy = require("lazy"),
        fs  = require("fs");

var writeToFile = function(file, string){
  fs.appendFileSync(file, string);
    // if (err){
    //   console.log('problem writing to file');
    // }
  // });
}


//can get these from database in future
var offerTypes = ['television', 'laptop', 'tablet', 'camera'];
var offerFashionTypes = ['shoe', 'shirt','top'];
var offerWomenFashionTypes = ['shoe', 'top'];
var offerMenFashionTypes = ['shoe', 'shirt'];
var offerWomenFashionTypes = ['shoe', 'top'];
var televisionBrands = ['aqualite','bush','cello','lg','panasonic','toshiba','philips','sharp','samsung', 'jvc','sony','hitachi','digihome','logik','sandstrom','jmb','luxor'];
var laptopBrands = ['advent','acer','asus','apple','dell','gigabyte','fujitsu','msi','hp','lenovo','samsung','sony','toshiba','packard bell'];
var tabletBrands = ['acer','samsung','sony','archos','toshiba','kobo','hp','arnova','prestigio','gemini','asus','google','apple','microsoft','nook','lenovo'];
var cameraBrands = ['fujifilm', 'nikon', 'canon','panasonic','olympus','samsung','vivitar','pentax','polaroid'];




var fileName = './sitemap/sitemap.xml';
writeToFile(fileName,'<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
console.log('------ generating sitemap.xml --------');
writeToFile(fileName,"\n  <sitemap>");
writeToFile(fileName,"\n    <loc>http://www.offercrunch.co.uk/sitemap/main</loc>");
writeToFile(fileName,"\n    <lastmod>"+ new Date().toISOString() + "</lastmod>");
writeToFile(fileName,"\n  </sitemap>");

for (var i=0;i<offerTypes.length;i++){
  writeToFile(fileName,"\n  <sitemap>");
  writeToFile(fileName,"\n    <loc>http://www.offercrunch.co.uk/sitemap/offers/"+offerTypes[i]+"</loc>");
  writeToFile(fileName,"\n    <lastmod>"+ new Date().toISOString() + "</lastmod>");
  writeToFile(fileName,"\n  </sitemap>");
}
for (var i=0;i<offerFashionTypes.length;i++){
  writeToFile(fileName,"\n  <sitemap>");
  writeToFile(fileName,"\n    <loc>http://www.offercrunch.co.uk/sitemap/offers/"+offerFashionTypes[i]+"</loc>");
  writeToFile(fileName,"\n    <lastmod>"+ new Date().toISOString() + "</lastmod>");
  writeToFile(fileName,"\n  </sitemap>");
}
writeToFile(fileName,"\n</sitemapindex>");
  console.log('------ finished sitemap.xml --------');

var fileName = './sitemap/main.xml';
  writeToFile(fileName,'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
  console.log('------ generating main.xml --------');
  writeToFile(fileName,"\n  <url>");
  writeToFile(fileName,"\n    <loc>http://www.offercrunch.co.uk</loc>");
  writeToFile(fileName,"\n    <lastmod>" + new Date().toISOString() + "</lastmod>");
  writeToFile(fileName,"\n    <changefreq>weekly</changefreq>");
  writeToFile(fileName,"\n    <priority>0.5</priority>");
  writeToFile(fileName,"\n  </url>");
  for (var i=0;i<offerTypes.length;i++){
  writeToFile(fileName,"\n  <url>");
  writeToFile(fileName,"\n    <loc>http://www.offercrunch.co.uk/offers/"+offerTypes[i]+"</loc>"); 
  writeToFile(fileName,"\n    <lastmod>" + new Date().toISOString() + '</lastmod>');
  writeToFile(fileName,"\n    <changefreq>weekly</changefreq>");
  writeToFile(fileName,"\n    <priority>0.5</priority>");
  writeToFile(fileName,"\n  </url>");
  }
  for (var i=0;i<offerMenFashionTypes.length;i++){
  writeToFile(fileName,"\n  <url>");
  writeToFile(fileName,"\n    <loc>http://www.offercrunch.co.uk/offers/fashion/men/"+offerMenFashionTypes[i]+"s</loc>"); 
  writeToFile(fileName,"\n    <lastmod>" + new Date().toISOString() + '</lastmod>');
  writeToFile(fileName,"\n    <changefreq>weekly</changefreq>");
  writeToFile(fileName,"\n    <priority>0.5</priority>");
  writeToFile(fileName,"\n  </url>");
  }
  for (var i=0;i<offerWomenFashionTypes.length;i++){
  writeToFile(fileName,"\n  <url>");
  writeToFile(fileName,"\n    <loc>http://www.offercrunch.co.uk/offers/fashion/women/"+offerWomenFashionTypes[i]+"s</loc>"); 
  writeToFile(fileName,"\n    <lastmod>" + new Date().toISOString() + '</lastmod>');
  writeToFile(fileName,"\n    <changefreq>weekly</changefreq>");
  writeToFile(fileName,"\n    <priority>0.5</priority>");
  writeToFile(fileName,"\n  </url>");
  }
  writeToFile(fileName,"\n</urlset>");
  console.log('------ finished main.xml --------');



 console.log('------ generating indiv offer sitemaps  --------');

MongoClient.connect('mongodb://admin:af!9876@oceanic.mongohq.com:10041/app22752353', function(err, db) {

//MongoClient.connect('mongodb://localhost/mean-test', function(err, db) {
var collection = db.collection('offers');

 collection.find({}).toArray(function(err,offers){
 console.log(offers.length);
 writeToFile('./sitemap/offers/television.xml','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
 writeToFile('./sitemap/offers/laptop.xml','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
 writeToFile('./sitemap/offers/camera.xml','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
 writeToFile('./sitemap/offers/tablet.xml','<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
 
 var fileName = './sitemap/offers/television.xml';
 for (var i=0;i<televisionBrands.length;i++){
   writeToFile(fileName, "\n  <url>");
   writeToFile(fileName, "\n    <loc>http://www.offercrunch.co.uk/offers/television/"+televisionBrands[i] + "</loc>");
   writeToFile(fileName, "\n    <lastmod>"+new Date().toISOString()+"</lastmod>");
   writeToFile(fileName, "\n    <changefreq>weekly</changefreq>");
   writeToFile(fileName, "\n    <priority>0.6</priority>");
   writeToFile(fileName, "\n  </url>");
 }
 var fileName = './sitemap/offers/laptop.xml';
 for (var i=0;i<laptopBrands.length;i++){
   writeToFile(fileName, "\n  <url>");
   writeToFile(fileName, "\n    <loc>http://www.offercrunch.co.uk/offers/laptop/"+laptopBrands[i] + "</loc>");
   writeToFile(fileName, "\n    <lastmod>"+new Date().toISOString()+"</lastmod>");
   writeToFile(fileName, "\n    <changefreq>weekly</changefreq>");
   writeToFile(fileName, "\n    <priority>0.6</priority>");
   writeToFile(fileName, "\n  </url>");
 }
 var fileName = './sitemap/offers/tablet.xml';
 for (var i=0;i<tabletBrands.length;i++){
   writeToFile(fileName, "\n  <url>");
   writeToFile(fileName, "\n    <loc>http://www.offercrunch.co.uk/offers/tablet/"+tabletBrands[i] + "</loc>");
   writeToFile(fileName, "\n    <lastmod>"+new Date().toISOString()+"</lastmod>");
   writeToFile(fileName, "\n    <changefreq>weekly</changefreq>");
   writeToFile(fileName, "\n    <priority>0.6</priority>");
   writeToFile(fileName, "\n  </url>");
 }
 var fileName = './sitemap/offers/camera.xml';
 for (var i=0;i<cameraBrands.length;i++){
   writeToFile(fileName, "\n  <url>");
   writeToFile(fileName, "\n    <loc>http://www.offercrunch.co.uk/offers/camera/"+cameraBrands[i] + "</loc>");
   writeToFile(fileName, "\n    <lastmod>"+new Date().toISOString()+"</lastmod>");
   writeToFile(fileName, "\n    <changefreq>weekly</changefreq>");
   writeToFile(fileName, "\n    <priority>0.6</priority>");
   writeToFile(fileName, "\n  </url>");
 }



  for(var i=0;i<offers.length;i++){
    if (offers[i].type == null){
      continue;
    }
    var brand = offers[i].brand;
    if (brand == ''){
      continue;
    }
    // var multipleBrandWords = brand.split(' ');
    // if (multipleBrandWords.length > 0){
    //   var brandAppender = '';
    //   for (var i=0;i<multipleBrandWords.length;i++){
    //     if (i==0){
    //       brandAppender = multipleBrandWords[i];
    //     }else{
    //       brandAppender = brandAppender + "-" + multipleBrandWords[i];
    //     }
    //   }
    //   brand = brandAppender;
    // }

    
    if (offers[i].type != 'shoe' && offers[i].type !='shirt' && offers[i].type != 'top'){
    var fileName = "./sitemap/offers/"+offers[i].type + ".xml";
    writeToFile(fileName, "\n  <url>");
    writeToFile(fileName, "\n    <loc>http://www.offercrunch.co.uk/offers/" + offers[i].type + '/' + brand + '/' + offers[i].urlDesc + '</loc>');
    writeToFile(fileName, "\n    <lastmod>" + new Date().toISOString()+ "</lastmod>");
    writeToFile(fileName, "\n    <changefreq>weekly</changefreq>");
    writeToFile(fileName, "\n    <priority>0.4</priority>");
    writeToFile(fileName, "\n  </url>");
    if (i == offers.length-1){
    console.log('------ last offer  --------');
    writeToFile('./sitemap/offers/television.xml', "\n</urlset>");
    writeToFile('./sitemap/offers/camera.xml', "\n</urlset>");
    writeToFile('./sitemap/offers/tablet.xml', "\n</urlset>");
    writeToFile('./sitemap/offers/laptop.xml', "\n</urlset>");
    }
 }else{
   var fileName = "./sitemap/offers/"+offers[i].type + ".xml";
    var gender = offers[i].gender;
    writeToFile(fileName, "\n  <url>");
    writeToFile(fileName, "\n    <loc>http://www.offercrunch.co.uk/offers/fashion/"+ gender + "/" + offers[i].type + 's/' + brand + '/' + offers[i].urlDesc + '</loc>');
    writeToFile(fileName, "\n    <lastmod>" + new Date().toISOString()+ "</lastmod>");
    writeToFile(fileName, "\n    <changefreq>weekly</changefreq>");
    writeToFile(fileName, "\n    <priority>0.4</priority>");
    writeToFile(fileName, "\n  </url>");
    if (i == offers.length-1){
    console.log('------ last offer  --------');
    writeToFile('./sitemap/offers/television.xml', "\n</urlset>");
    writeToFile('./sitemap/offers/camera.xml', "\n</urlset>");
    writeToFile('./sitemap/offers/tablet.xml', "\n</urlset>");
    writeToFile('./sitemap/offers/laptop.xml', "\n</urlset>");
    writeToFile('./sitemap/offers/shoe.xml', "\n</urlset>");
    writeToFile('./sitemap/offers/shirt.xml', "\n</urlset>");
    writeToFile('./sitemap/offers/top.xml', "\n</urlset>");
    }
 }
}

});
});
