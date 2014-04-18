#!/bin/sh

echo '--- started HOF scraping ---'

casperjs houseOfFraserMensShirts1.js
casperjs houseOfFraserMensShirts2.js
casperjs houseOfFraserMensShirts3.js
casperjs houseOfFraserMensShirts4.js

casperjs houseOfFraserMensShoes.js

casperjs houseOfFraserWomensShoes1.js
casperjs houseOfFraserWomensShoes2.js
casperjs houseOfFraserWomensShoes3.js

casperjs houseOfFraserWomensTops1.js
casperjs houseOfFraserWomensTops2.js
casperjs houseOfFraserWomensTops3.js
casperjs houseOfFraserWomensTops4.js
casperjs houseOfFraserWomensTops5.js

echo '--- finished HOF scraping ---'