#!/bin/sh

echo '----Running insert script-----'

node ./insertScript.js argos-laptop.txt
node ./insertScript.js argos-tablet.txt
node ./insertScript.js argos-television.txt
node ./insertScript.js 'coop electrical-television.txt'
node ./insertScript.js 'coop electrical-laptop.txt'
node ./insertScript.js currys-laptop.txt
node ./insertScript.js currys-tablet.txt
node ./insertScript.js currys-television.txt
node ./insertScript.js currys-camera.txt
node ./insertScript.js 'direct tvs-television.txt'
node ./insertScript.js 'laptops direct-laptop.txt'
node ./insertScript.js 'john lewis-television.txt'
node ./insertScript.js jessops-camera.txt
node ./insertScript.js littlewoods-camera.txt
node ./insertScript.js littlewoods-laptop.txt
node ./insertScript.js littlewoods-tablet.txt
node ./insertScript.js littlewoods-television.txt
node ./insertScript.js selfridges-television.txt

echo '----Finished insert script-----'