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
  writeToFile(fileName,"\n</urlset>");
  console.log('------ finished main.xml --------');



 console.log('------ generating indiv offer sitemaps  --------');

MongoClient.connect('mongodb://admin:af!9876@oceanic.mongohq.com:10041/app22752353', function(err, db) {

//MongoClient.connect('mongodb://localhost/mean-test', function(err, db) {
var collection = db.collection('offers');

 collection.find({isValid:true}).toArray(function(err,offers){
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
    var fileName = "./sitemap/offers/"+offers[i].type + ".xml";
    writeToFile(fileName, "\n  <url>");
    writeToFile(fileName, "\n    <loc>http://www.offercrunch.co.uk/offers/" + offers[i].type + '/' + offers[i].brand + '/' + offers[i].urlDesc + '</loc>');
    writeToFile(fileName, "\n    <lastmod>" + new Date().toISOString()+ "</lastmod>");
    writeToFile(fileName, "\n    <changefreq>weekly</changefreq>");
    writeToFile(fileName, "\n    <priority>0.4</priority>");
    writeToFile(fileName, "\n  </url>");
    if (i == offers.length-1){
    writeToFile('./sitemap/offers/television.xml', "\n</urlset>");
    writeToFile('./sitemap/offers/camera.xml', "\n</urlset>");
    writeToFile('./sitemap/offers/tablet.xml', "\n</urlset>");
    writeToFile('./sitemap/offers/laptop.xml', "\n</urlset>");
    }
 }

});
   
    console.log('------ finished indiv offer sitemaps  --------');


// collection.update(
//    {retailer: retailer, type: productType},
//    { $set: { 'isValid': false} },
//    { multi: true },function(err, res){
//     if (err){
//       console.log('');
//     }else{
//       console.log(res);
//     }
//    }
// );

// console.log('set valid to false');

// new lazy(fs.createReadStream(fileString))
//   .lines
//   .forEach(function(line){
     
// var jsonOffer = JSON.parse(line.toString());
// console.log(jsonOffer);
// var find = {
//   pricing: jsonOffer.pricing,
//   details: jsonOffer.details,
//   retailer: jsonOffer.retailer,
//   brand: jsonOffer.brand,
//   type: jsonOffer.type,
//   url: jsonOffer.url,
//   description: jsonOffer.description,
//   urlDesc : jsonOffer.urlDesc
// }


      
// collection.update(
//   find, 
//   { $set: {'isValid': true } },{upsert:true},
//   function (err, result) {
//     if (err) throw err;
//       console.log(result);
//   });
//  });

   // });
  // remove all records in collection (if any)
//   console.log('removing documents...')
   // collection.remove(function(err, result) {
   //   if (err) {
   //     return console.error(err)
   //   }
   //   console.log('collection cleared!')
   //   });
   //   });
//     // insert two documents
 //     console.log('inserting new documents...');
 //    collection.insert(docsToInsert, function(err, docs) {
 //      if (err) {
 //        return console.error(err)
 //      }
 //      console.log('just inserted ', docs.length, ' new documents!');
 //      })
 //      });

         // collection.find({}).toArray(function(err, docs) {
         //  if (err) {
         //    return console.error(err)
         //  }
         //  docs.forEach(function(doc) {
         //   console.log('here');
         //   console.log(doc);

          //doc.last_updated = ISODate(doc.last_updated);
          //collection.save(doc);
          // if (doc.brand=='Samsung'){
            // print(doc.brand);
           // }
          //console.log('found document: ', doc)
          // );
        // });
         //db.close();
        });



     // db.close();
     // process.exit();
     // });

   // });
      // });

//MongoClient.connect('mongodb://admin:password123@paulo.mongohq.com:10081/app18428320', function(err, db) {

 // fs = require('fs');
 // var docsToInsert;
 // fs.readFile('./argosTelevisions.txt', 'utf8', function (err,data) {
  // if (err) {
    // return console.log(err);
  // }
// console.log(data);

// //console.log(data);
// docsToInsert = data;
// });
//})

// collection.find({}).forEach(function(element){
//   element.last_updated = ISODate(element.last_updated);
//   collection.save(element);
// });
  //var string = 'brand":"Bush","details":{"screenSize":22,"screenType":"LED"},"pricing":{"offer":119.99,"original":129.99,"pctSavings":8,"savings":10},"retailer":"Argos","type":"television","url":{"image":"http://argos.scene7.com/is/image/Argos/1284564_R_SET?$Listers$","product":"http://www.argos.co.uk/static/Product/partNumber/1284564.htm"}'
  // v

  // var obj = JSON.parse(string);

// collection.insert(docsToInsert, function(err, docs) {
//       if (err) {
//          return console.error(err)
//        }
//        console.log('just inserted ', docs.length, ' new documents!');
//        });
  // collection.findOne(obj,function(err, doc) {
        // if (doc){
            // console.log(doc._id);
        // } else if (err) {
            // console.log(err);
        // }
    // });
     //console.log(t+1);
      // console.log(line.toString());
      // var string = line.toString().substring(1);
      // var finalString = string.substring(1,string.length-1);
      // console.log(finalString);
// "2014-01-22T14:30:04.000Z
//2014-01-22T14:30:04.000Z

 //console.log(find);
       
      //console.log(jObj.last_updated);

       // jObj.last_updated = new Date(jObj.last_updated);
       // console.log(jObj);
       // collection.insert(jObj, function(err, doc){
       // if (err){
       //  return console.log(err);
       // }else{
       //  console.log('inserted ' + doc.brand);
       // }
       // });

//       collection.findOne(find, function(err, obj){
//         if (err) { return next(err); }
//         obj.isValid = true;
//          collection.save(obj,function(err) {
//           if (err) { return next(err); }
//         });
// });