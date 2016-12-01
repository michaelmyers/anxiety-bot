var config = require('./config.json');
var client = require('twilio')(config.twilio.accountSid, config.twilio.authToken);

module.exports = {
    validate: function(number) {
        // make sure the number is good, if it isn't provide an error with how to fix it
    },
    sendSMS: function(toNumber, fromNumber, body, callback) {
        client.messages.create({
            to: toNumber,
            from: fromNumber,
            body: body,
        }, function (err, message) {
            if (callback !== undefined) {
                callback(err, message);
            }
        });
    }
}