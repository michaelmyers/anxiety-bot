var verification = require("../src/verification.json");
var fs = require('fs');

var adjectives = "";
verification.adjectives.forEach(function(adjective) {
    adjectives += adjective + '\n';
});

fs.writeFile('./speechAssets/ADJECTIVE.txt', adjectives, function (err) {
  if (err) return console.log(err);
});

var nouns = "";
verification.nouns.forEach(function(noun) {
    nouns += noun + '\n';
});

fs.writeFile('./speechAssets/NOUN.txt', nouns, function (err) {
  if (err) return console.log(err);
});
