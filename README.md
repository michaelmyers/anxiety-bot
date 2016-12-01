## Background

In a podcast episode of [Reply All](https://gimletmedia.com/episode/the-anxiety-box/), host PJ Vogt interviews [Paul Ford](https://twitter.com/ftrain) about a project of his that helped him cope with his anxiety, a website called [Anxiety Box](http://anxietybox.com/).  The way the website works is you enter you name, email and what you are anxious about.  The site would then randomly send you an email with your anxiety.  The process of putting your anxiety out there, then reading it at a later time sometimes shows you how silly or trivial they are.  Responding to them or deleting them is empowering.

I was inspired by Paul's project and thought it would also fit perfectly on the Alexa platform.  Alexa is not only convenient but also turns the interaction into a conversation, makes the bot aspect a bit more tangible.  

## Design

Anxiety Bot is a Lambda function that uses DynamoDB to remember the user's phone number and verification status.  It uses the [Alexa Skills Kit SDK](https://github.com/alexa/alexa-skills-kit-sdk-for-nodejs) for interacting with Alexa Skills Kit, the [Bespoken Tools SDK](https://github.com/bespoken/bst) for logging, and [Twilio](https://www.twilio.com/) for SMS.     

## Requirements

* node.js & npm
* bst cli installed
* bespoken tools secret keey (http://bespoken.tools)
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
