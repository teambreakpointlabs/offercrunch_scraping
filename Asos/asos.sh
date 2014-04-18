#!/bin/sh

echo '--- started Asos scraping ---'

casperjs asosMensShirtsScrape.js
casperjs asosMensShoes.js
casperjs asosWomensShoes.js
casperjs asosWomensTops.js

echo '--- finished Asos scraping ---'