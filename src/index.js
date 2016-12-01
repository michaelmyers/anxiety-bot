'use strict';
var Alexa = require("alexa-sdk");
var bst = require('bespoken-tools');
var config = require('./config.json');
var phone = require("./phone");
var verification = require("./verification");

exports.handler = bst.Logless.capture(config.bst.secretKey, function (event, context) {
    var alexa = Alexa.handler(event, context);
    alexa.appId = config.applicationId;
    alexa.dynamoDBTableName = 'anxietyBot';
    alexa.registerHandlers(handlers);
    alexa.execute();
});

var handlers = {
    'LaunchRequest': function () {
        var welcomeMessage = "Hello, my name is Anxiety Bot, the place for all your anxieties.  You tell me your anxieties and I will text them to you randomly so you can delete them."

        // if they have a verified number, ask them for their anxiety
        if (this.attributes.numberVerified) {
            this.emit(":ask", welcomeMessage + " If you are feeling anxious about something and you want to share, I am here to listen", "If you want, let me know what you are anxious about.");
        } else {
            this.emit(":ask", welcomeMessage + " To get started, we first need to verify your phone number.  Please tell me your phone number.", "What is your phone number?")
        }
    },
    'AMAZON.HelpIntent': function () {
        this.emit(":tell", "Sure thing, you can tell me what you are anxious about.");
    },
    'VerifyPhoneNumberIntent': function () {
        var self = this;
        var verificationCode = self.event.request.intent.slots.Adjective.value + " " + self.event.request.intent.slots.Noun.value;

        if (self.attributes.verificationCode === verificationCode) {
            self.attributes.numberVerified = true;
            self.emit(":tell", "Ok, you are all set!");
        } else {
            self.emit(":tell", "We couldn't verify your number with that code");
        }
    },
    'PhoneNumberInputIntent': function () {
        var self = this;

        self.attributes.phoneNumber = self.event.request.intent.slots.PhoneNumber.value;
        self.attributes.verificationCode = verification.code();
        self.attributes.numberVerified = false;

        // send the text message 
        phone.sendSMS(self.attributes.phoneNumber,
            config.twilio.fromNumber,
            "Hi, this is Anxiety Bot!  To verify this number, just say 'Alexa, tell anxiety bot my verification code is " + self.attributes.verificationCode + "'",
            function (err, message) {
                if (err) {
                    console.error(err);
                    self.emit(":tell", "That didn't seem to work, what was your number again?");
                } else {
                    self.emit(":tell", "Got it, please check your text messages");
                }
            });
    },
    'GetPhoneNumberIntent': function () {
        this.emit(":ask", "Can you please tell me your phone number?", "Sorry, I missed that, can you repeat that again please?");
    },
    'NewAnxietyIntent': function () {
        var self = this;

        if (!self.attributes.numberVerified) {
            this.emit(":ask", "We haven't verified your phone number yet, please tell it to me again so I can send you another code", "What is your phone number?");
        } else {
            console.log(this.attributes);
            console.log(this.event.request.intent.slots.CatchAll);
            // setup a lambda to fire at a random time
            this.emit(":tell", "Don't worry, I have stored it away.");  // make this random
        }
    },
    'Unhandled': function () {
        console.error("Unhandled intent");
        this.emit(":tell", "I didn't understand what you said, I'm sorry");
    }
};