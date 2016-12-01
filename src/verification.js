
var verification = require("./verification.json");

module.exports = {
    code: function () {
        var adjective = verification.adjectives[Math.floor(Math.random() * verification.adjectives.length)];
        var noun = verification.nouns[Math.floor(Math.random() * verification.nouns.length)];
        return adjective + " " + noun;
    }
}