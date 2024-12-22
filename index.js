// index.js
// Load the AWS SDK for Node.js
var AWS = require("aws-sdk");

const REGION = process.env.REGION || "us-east-1";
const QUEUE_URL = process.env.QUEUE_URL || "SQS_QUEUE_URL";

AWS.config.update({ region: REGION });

// Create an SQS service object
var sqs = new AWS.SQS({ apiVersion: "2012-11-05" });

function sendRandomMessage() {
    // Generate some random data
    const randomTitle = `Book-${Math.floor(Math.random() * 1000)}`;
    const randomAuthor = `Author-${Math.floor(Math.random() * 1000)}`;
    const randomWeeksOn = Math.floor(Math.random() * 52).toString();
    const randomMessageBody = `Information about a random bestseller: ${randomTitle} by ${randomAuthor}, on list for ${randomWeeksOn} weeks.`;

    var params = {
        DelaySeconds: 10,
        MessageAttributes: {
            Title: {
                DataType: "String",
                StringValue: randomTitle,
            },
            Author: {
                DataType: "String",
                StringValue: randomAuthor,
            },
            WeeksOn: {
                DataType: "Number",
                StringValue: randomWeeksOn,
            },
        },
        MessageBody: randomMessageBody,
        QueueUrl: QUEUE_URL,
    };

    sqs.sendMessage(params, function (err, data) {
        if (err) {
            console.error("Error sending message", err);
        } else {
            console.log("Success, message sent. MessageId:", data.MessageId);
        }
    });
}

// Send a random message every 30 seconds
setInterval(sendRandomMessage, 30000);

// Optionally, send one immediately when the application starts
sendRandomMessage();