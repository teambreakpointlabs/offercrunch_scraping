var mongodb = require('mongodb')
  , MongoClient = mongodb.MongoClient;

var lazy = require("lazy"),
        fs  = require("fs");

var writeToFile = function(file, string){
  fs.appendFileSync(file, string);
}


//can get these from database in future




// var fileName = './sitemap/sitemap.xml';
// writeToFile(fileName,'<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
// console.log('------ generating sitemap.xml --------');
// writeToFile(fileName,"\n  <sitemap>");
// writeToFile(fileName,"\n    <loc>http://www.offercrunch.co.uk/sitemap/main</loc>");
// writeToFile(fileName,"\n    <lastmod>"+ new Date().toISOString() + "</lastmod>");
// writeToFile(fileName,"\n  </sitemap>");




MongoClient.connect('mongodb://admin:af!9876@oceanic.mongohq.com:10041/app22752353', function(err, db) {

//MongoClient.connect('mongodb://localhost/mean-test', function(err, db) {
var collection = db.collection('offers');

var laptopBrands = [];

collection.distinct('brand',{type:'laptop',isValid:true},function(err,brands){
  for (var j=0;j<brands.length;j++){
    if ((brands[j]!=null)&&(brands[j] != 'ex')&&(brands[j]!='')){
        laptopBrands.push(brands[j]);   
    }
  }
console.log(laptopBrands);
});

});