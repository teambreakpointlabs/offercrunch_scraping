#!/bin/sh

echo '--- started generating sitemap ---'
node ./generateTelevisionSitemap.js
node ./generateLaptopSitemap.js
node ./generateTabletSitemap.js
node ./generateCameraSitemap.js
# node ./generateIndividualOffersSitemap.js
echo '--- finished generating sitemap ---'