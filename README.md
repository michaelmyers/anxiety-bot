## Background

Inspired by [Paul Ford's](https://twitter.com/ftrain) [AnxietyBox](http://anxietybox.com/), Anxiety Bot explores his concept on Alexa.  Read more at [hackster.io](https://www.hackster.io/michael-myers/anxiety-bot-let-a-robot-take-care-of-them-for-you-8f915d).
  
## Design

Anxiety Bot is a Lambda function that uses DynamoDB to remember the user's phone number and verification status.  It uses the [Alexa Skills Kit SDK](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs) for interacting with Alexa Skills Kit, the [Logless SDK](https://bespoken.tools/logless) for logging, and [Twilio](https://www.twilio.com/) for SMS.     

## Requirements

* node.js & npm
* bst cli installed
  * `$ npm install -g bespoken-tools`
* bespoken tools secret key https://bespoken.tools/dashboard
* Twilio Account https://twilio.com
* AWS Credentials for deploy (you can still run bst proxy)

## Setup

Install dependencies:
```bash
cd src && npm install
```

You will need to copy and paste the JSON below to a `config.json` file within the `/src` directory with your credentials.

```json
{
    "bst" : {
        "secretKey": ""
    },
    "twilio" : {
        "accountSid": "",
        "authToken": "",
        "fromNumber" : ""
    },
    "applicationId": ""
}
```

## Commands

Proxy for Local Development:

```
$ bst proxy lambda src/index.js
```

Deploy:
```
$ bst deploy lambda src/ --lambdaName anxietybot
```
