const AWS = require('aws-sdk');
const { v4: uuidv4 } = require('uuid');
AWS.config.update({
  region: "eu-central-1",
  accessKeyId: process.env.ACCESS_KEY,
  secretAccessKey: process.env.SECRET_KEY,
});

const dynamoClient = new AWS.DynamoDB.DocumentClient();

// CREATE OR UPDATE USER
exports.createOrUpdate = async (data) => {
  data.item.id = uuidv4();
  const params = {
    TableName: data.table,
    Item: data.item
  }
  try {
    const item = await dynamoClient.put(params).promise();
    return { success: true, data:data.item }
  } catch (error) {
    return { success: false }
  }
}

// READ ALL USERS
exports.getAll = async (data) => {
  const params = {
    TableName: data.table,
  }
  try {
    const { Items = [] } = await dynamoClient.scan(params).promise()
    return { success: true, data: Items }
  } catch (error) {
    return { success: false, data: null }
  }
}

// READ SINGLE USER ON KEY(id)
exports.getOne = async (data) => {
  const params = {
    TableName: data.table,
    Key: {
      [data.key]: data.value,
    },
  }
  try {
    const { Item = {} } = await dynamoClient.get(params).promise()
    return { success: true, data: Item }
  } catch (error) {
    return { success: false, data: null }
  }
}

// Delete Existing User
exports.deleteOne = async (value, key = "id") => {
  const params = {
    TableName: TABLE_NAME,
    Key: {
      [key]: value,
    },
  }
  try {
    await dynamoClient.delete(params).promise()
    return { success: true }
  } catch (error) {
    return { success: false }
  }
}

