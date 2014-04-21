var mongodb = require('mongodb')
  , MongoClient = mongodb.MongoClient;

var lazy = require("lazy"),
        fs  = require("fs");

var writeToFile = function(file, string){
  fs.appendFileSync(file, string);
}


//can get these from database below
var laptopBrands = [ 'toshiba','hp','acer','lenovo','sony','samsung','dell','apple','asus','packard-bell','advent','fujitsu'];
var fileName = './sitemap.xml';
// writeToFile(fileName,'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');


for (var i=0;i<laptopBrands.length;i++){
	writeToFile(fileName,"\n  <url>");
	writeToFile(fileName,"\n    <loc>http://www.offercrunch.co.uk/offers/laptop/"+laptopBrands[i] +"</loc>");
	writeToFile(fileName,"\n    <lastmod>"+new Date().toISOString()+"</lastmod>");
	writeToFile(fileName,"\n    <changefreq>weekly</changefreq>");
	writeToFile(fileName,"\n    <priority>0.8</priority>");
	writeToFile(fileName,'\n  </url>');
}

// writeToFile(fileName,"\n  </urlset>");



// MongoClient.connect('mongodb://admin:af!9876@oceanic.mongohq.com:10041/app22752353', function(err, db) {

// //MongoClient.connect('mongodb://localhost/mean-test', function(err, db) {
// var collection = db.collection('offers');

// var laptopBrands = [];

// collection.distinct('brand',{type:'laptop',isValid:true},function(err,brands){
//   for (var j=0;j<brands.length;j++){
//     if ((brands[j]!=null)&&(brands[j] != 'ex')&&(brands[j]!=''&&(brands[j]!='15.6'))){
//         laptopBrands.push(brands[j]);   
//     }
//   }
// console.log(laptopBrands);
// });

// });