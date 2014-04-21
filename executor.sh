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
casperjs ebuyerTelevisionScrape.js
casperjs ebuyerLaptopScrape.js
casperjs jessopsCameraScrape.js
casperjs jlewis_scrape.js
casperjs littlewoodsCameraScrape.js
casperjs littlewoodsLaptopScrape.js
casperjs littlewoodsTabletScrape.js
casperjs littlewoodsTelevisionScrape.js
casperjs prcDirectTelevisionScrape.js
casperjs selfridgesTelevisionScrape.js
casperjs tescoTelevisionScrape.js
 
echo '--- finished scraping ---'