#!/bin/sh

echo '--- started scraping ---'

casperjs argosLaptopScrape.js
casperjs argosTabletScrape.js
casperjs argosTelevisionScrape.js
casperjs coopTelevisionScrape.js
casperjs coopLaptopScrape.js
casperjs currysLaptopScrape.js
casperjs currysTabletScrape.js
casperjs currysCameraScrape.js
casperjs currysTelevisionLargeScrape.js
casperjs currysTelevisionSmallScrape.js
casperjs directTvsScrape.js
casperjs jessopsCameraScrape.js
casperjs jlewis_scrape.js
casperjs laptopsDirectLaptopScrape.js
casperjs littlewoodsCameraScrape.js
casperjs littlewoodsLaptopScrape.js
casperjs littlewoodsTabletScrape.js
casperjs littlewoodsTelevisionScrape.js
casperjs selfridgesTelevisionScrape.js
 
echo '--- finished scraping ---'