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
 var fileName = './television-email.html';
// writeToFile(fileName,'<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
writeToFile(fileName,'<html>');
writeToFile(fileName,'<style>');
writeToFile(fileName,'body{font-family:sans-serif,color:blue;text-align:center}');
writeToFile(fileName,'</style>');


MongoClient.connect('mongodb://admin:af!9876@oceanic.mongohq.com:10041/app22752353', function(err, db) {

//MongoClient.connect('mongodb://localhost/mean-test', function(err, db) {
var collection = db.collection('offers');

var laptopBrands = [];


collection.find({type:'television',isValid:true,'pricing.pctSavings': {$gte:40}}).sort('pricing.pctSavings:desc').limit(20).toArray(function(err,offers){

//generate html
for (var j=0;j<offers.length;j++){
  writeToFile(fileName,'<section style="padding-bottom:20px;margin-bottom:10px;border-bottom:1px solid #afafaf;">');
  writeToFile(fileName,'<img style="width:150px;height:150px;" src="'+offers[j].url.image+'">');
  writeToFile(fileName,'<p>'+offers[j].description+'</p>');
  writeToFile(fileName,'<p><del>Was '+offers[j].pricing.original+'</del></p>');
  writeToFile(fileName,'<p>Now '+offers[j].pricing.offer+'</p>');
  writeToFile(fileName,'<p>Save '+offers[j].pricing.pctSavings+'%!</p>');
  writeToFile(fileName,"<a href='"+offers[j].url.skimlinks+"'>View This Offer</a>");
  writeToFile(fileName,'</section>');
}

 writeToFile(fileName,'</body>');
 writeToFile(fileName,'</html>');
});


});