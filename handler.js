"use-strict";

const uuidv1 = require("uuid");
const AWS = require("aws-sdk");

var sqs = new AWS.SQS({
  region: process.env.PENDING_ORDER_QUEUE,
});

const QUEUE_URL = process.env.PENDING_ORDER_QUEUE;

module.exports.hacerPedido = async (event, context, callback) => {
  console.log(`hacerPedido fue llamado`);

  const orderId = uuidv1.v1();

  const params = {
    MessageBody: JSON.stringify({ orderId }),
    QueueUrl: QUEUE_URL,
  };

  sqs.sendMessage(params, function (err, data) {
    if (err) {
      sendResponse(500, err, callback);
    } else {
      const message = {
        orderId,
        messageId: data.messageId,
      };
      sendResponse(200, message, callback);
    }
  });
};

function sendResponse(statusCode, message, callback) {
  const response = {
    statusCode,
    body: JSON.stringify(message),
  };
  callback(null, response);
}
