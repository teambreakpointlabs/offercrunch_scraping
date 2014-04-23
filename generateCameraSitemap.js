var mongodb = require('mongodb')
  , MongoClient = mongodb.MongoClient;

var lazy = require("lazy"),
        fs  = require("fs");

var writeToFile = function(file, string){
  fs.appendFileSync(file, string);
}


//can get these from database below
var fileName = './sitemap.xml';
var cameraBrands = ['panasonic','fujifilm','vivitar','nikon','samsung','pentax','sony','canon','olympus','ricoh'];

for (var i=0;i<cameraBrands.length;i++){
	writeToFile(fileName,"\n  <url>");
	writeToFile(fileName,"\n    <loc>http://www.offercrunch.co.uk/offers/camera/"+cameraBrands[i] +"</loc>");
	writeToFile(fileName,"\n    <lastmod>"+new Date().toISOString()+"</lastmod>");
	writeToFile(fileName,"\n    <changefreq>weekly</changefreq>");
	writeToFile(fileName,"\n    <priority>0.8</priority>");
	writeToFile(fileName,'\n  </url>');
}

	// MongoClient.connect('mongodb://admin:af!9876@oceanic.mongohq.com:10041/app22752353', function(err, db) {

	// //MongoClient.connect('mongodb://localhost/mean-test', function(err, db) {
	// var collection = db.collection('offers');

	// var cameraBrands = [];

	// collection.distinct('brand',{type:'camera',isValid:true},function(err,brands){
	//   for (var j=0;j<brands.length;j++){
	//     if ((brands[j]!=null)&&(brands[j] != 'ex')&&(brands[j]!='') && brands[j]!='fuji'){
	//         cameraBrands.push(brands[j]);   
	//     }
	//   }
	// console.log(cameraBrands);
	// });

	// });