"use-strict";

const uuidv1 = require("uuid");
const AWS = require("aws-sdk");

const orderMetadataManager = require("./orderMetadataManager");

var sqs = new AWS.SQS({
  region: process.env.REGION,
});

const QUEUE_URL = process.env.PENDING_ORDER_QUEUE;

module.exports.hacerPedido = (event, _, callback) => {
  console.log(`hacerPedido fue llamado`);

  const body = JSON.parse(event.body);

  const orderId = uuidv1.v1();

  const order = {
    orderId: orderId,
    name: body.name,
    address: body.address,
    pizzas: body.pizzas,
    timestamp: Date.now(),
  };

  const params = {
    MessageBody: JSON.stringify(order),
    QueueUrl: QUEUE_URL,
  };

  sqs.sendMessage(params, function (err, data) {
    if (err) {
      sendResponse(500, err, callback);
    } else {
      const message = {
        orderId: orderId,
        messageId: data.messageId,
      };
      sendResponse(200, message, callback);
    }
  });
};

module.exports.prepararPedido = (event, _, callback) => {
  console.log(`prepararPedido fue llamado`);

  const order = JSON.parse(event.Records[0].body);

  orderMetadataManager
    .saveCompletedOrder(order)
    .then((_) => {
      console.log(`Con data`);
      callback();
    })
    .catch((error) => {
      console.log(`Sin data, error >> ${error}`);
      callback(error);
    });
};

function sendResponse(statusCode, message, callback) {
  const response = {
    statusCode: statusCode,
    body: JSON.stringify(message),
  };
  callback(null, response);
}
