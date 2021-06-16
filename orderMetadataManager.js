"use strict";

const AWS = require("aws-sdk");
let dynamo = new AWS.DynamoDB.DocumentClient();

/**
 * estructura de la tabla
 * order: {
 * orderId: String,
 * name: String,
 * address: String,
 * pizzas: Array of Strings,
 * delivery_status: READY_FOR_DELIVERY / DELIVERED
 * timestamp: timestamp
 * }
 */

module.exports.saveCompletedOrder = (order) => {
  console.log(`saveCompletedOrder fue llamado`);

  order.delivery_status = "READY_FOR_DELIVERY";

  const params = {
    TableName: process.env.COMPLETED_ORDER_TABLE,
    Item: order,
  };

  return dynamo.put(params).promise();
};
