var mongodb = require('mongodb')
  , MongoClient = mongodb.MongoClient;

var lazy = require("lazy"),
        fs  = require("fs");

var writeToFile = function(file, string){
  fs.appendFileSync(file, string);
}

//can get these from database below
var tvBrands = ['samsung','lg','sony','sharp','philips','panasonic','bush','toshiba','hitachi','alba','digihome','jvc','logik','sandstrom','luxor','jmb','cello'];

var fileName = './sitemap.xml';
writeToFile(fileName,'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');

    writeToFile(fileName,"\n  <url>");
	writeToFile(fileName,"\n    <loc>http://www.offercrunch.co.uk</loc>");
	writeToFile(fileName,"\n    <lastmod>"+new Date().toISOString()+"</lastmod>");
	writeToFile(fileName,"\n    <changefreq>weekly</changefreq>");
	writeToFile(fileName,"\n    <priority>1</priority>");
	writeToFile(fileName,'\n  </url>');
    writeToFile(fileName,"\n  <url>");
	writeToFile(fileName,"\n    <loc>http://www.offercrunch.co.uk/offers/television</loc>");
	writeToFile(fileName,"\n    <lastmod>"+new Date().toISOString()+"</lastmod>");
	writeToFile(fileName,"\n    <changefreq>weekly</changefreq>");
	writeToFile(fileName,"\n    <priority>1</priority>");
	writeToFile(fileName,'\n  </url>');
	writeToFile(fileName,"\n  <url>");
	writeToFile(fileName,"\n    <loc>http://www.offercrunch.co.uk/offers/laptop</loc>");
	writeToFile(fileName,"\n    <lastmod>"+new Date().toISOString()+"</lastmod>");
	writeToFile(fileName,"\n    <changefreq>weekly</changefreq>");
	writeToFile(fileName,"\n    <priority>1</priority>");
	writeToFile(fileName,'\n  </url>');
	writeToFile(fileName,"\n  <url>");
	writeToFile(fileName,"\n    <loc>http://www.offercrunch.co.uk/offers/tablet</loc>");
	writeToFile(fileName,"\n    <lastmod>"+new Date().toISOString()+"</lastmod>");
	writeToFile(fileName,"\n    <changefreq>weekly</changefreq>");
	writeToFile(fileName,"\n    <priority>1</priority>");
	writeToFile(fileName,'\n  </url>');
	writeToFile(fileName,"\n  <url>");
	writeToFile(fileName,"\n    <loc>http://www.offercrunch.co.uk/offers/camera</loc>");
	writeToFile(fileName,"\n    <lastmod>"+new Date().toISOString()+"</lastmod>");
	writeToFile(fileName,"\n    <changefreq>weekly</changefreq>");
	writeToFile(fileName,"\n    <priority>1</priority>");
	writeToFile(fileName,'\n  </url>');

for (var i=0;i<tvBrands.length;i++){
	writeToFile(fileName,"\n  <url>");
	writeToFile(fileName,"\n    <loc>http://www.offercrunch.co.uk/offers/television/"+tvBrands[i] +"</loc>");
	writeToFile(fileName,"\n    <lastmod>"+new Date().toISOString()+"</lastmod>");
	writeToFile(fileName,"\n    <changefreq>weekly</changefreq>");
	writeToFile(fileName,"\n    <priority>0.8</priority>");
	writeToFile(fileName,'\n  </url>');
}




// var fileName = './sitemap/sitemap.xml';
// writeToFile(fileName,'<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
// console.log('------ generating sitemap.xml --------');
// writeToFile(fileName,"\n  <sitemap>");
// writeToFile(fileName,"\n    <loc>http://www.offercrunch.co.uk/sitemap/main</loc>");
// writeToFile(fileName,"\n    <lastmod>"+ new Date().toISOString() + "</lastmod>");
// writeToFile(fileName,"\n  </sitemap>");




// MongoClient.connect('mongodb://admin:af!9876@oceanic.mongohq.com:10041/app22752353', function(err, db) {

// // MongoClient.connect('mongodb://localhost/mean-test', function(err, db) {
// var collection = db.collection('offers');

// var tvBrands = [];

// collection.distinct('brand',{type:'television',isValid:true},function(err,brands){
//   for (var j=0;j<brands.length;j++){
//     if ((brands[j]!=null)&&(brands[j] != 'ex')&&(brands[j]!='')){
//         tvBrands.push(brands[j]);   
//     }
//   }
//  console.log(tvBrands);
// });
// });