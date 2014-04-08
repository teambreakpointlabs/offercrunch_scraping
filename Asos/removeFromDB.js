var mongodb = require('mongodb')
  , MongoClient = mongodb.MongoClient;

 var retailer = process.argv[2];
 var offer = process.argv[3];

console.log(retailer);
 console.log(offer);

MongoClient.connect('mongodb://admin:af!9876@oceanic.mongohq.com:10041/app22752353',function(err, db) {
  mongodb://admin:password123@paulo.mongohq.com:10081/app18428320', function(err, db) {

//MongoClient.connect('mongodb://localhost/mean-test', function(err, db) {

var collection = db.collection('offers');

collection.remove(
   {retailer: retailer, type: offer}
    //{isValid:false}
   ,function(err, res){
    if (err){
      console.log('');
    }else{
      console.log(res);
    }
   }
);
});
