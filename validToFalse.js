var mongodb = require('mongodb')
  , MongoClient = mongodb.MongoClient;

process.argv.forEach(function (fileString, index, array) {
  if(index>=2){
    console.log(fileString);

    var retailer = fileString.split('-')[0];
    var productType = fileString.split('-')[1].split('.')[0];

    console.log(retailer);
    console.log(productType);

var lazy = require("lazy"),
        fs  = require("fs");

MongoClient.connect('mongodb://admin:af!9876@oceanic.mongohq.com:10041/app22752353', function(err, db) {

//MongoClient.connect('mongodb://localhost/mean-test', function(err, db) {

var collection = db.collection('offers');

collection.update(
   {retailer: retailer, type: productType},
   { $set: { 'isValid': false} },
   { multi: true },function(err, res){
    if (err){
      console.log('');
    }else{
      console.log(res);
    }
   }
);

console.log('set valid to false');


        });
}
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