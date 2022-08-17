import AWS from 'aws-sdk';
import { v4 as uuidv4 } from 'uuid';
AWS.config.update({
    region: "eu-central-1",
    accessKeyId: "",
    secretAccessKey: "",
  });

const dynamoClient = new AWS.DynamoDB.DocumentClient();

  // CREATE OR UPDATE USER
  const createOrUpdate = async (data = {}) => {
    data.item.id = uuidv4();
    const params = {
      TableName: data.table,
      Item: data.item
    }
    try {
      await dynamoClient.put(params).promise()
      return { success: true }
    } catch(error) {
        console.log(error)
      return { success: false }
    }
  }

  // READ ALL USERS
  const getAll = async () => {
    const params = {
      TableName: TABLE_NAME,
    }
    try {
      const { Items = [] } = await dynamoClient.scan(params).promise()
      return { success: true, data: Items }
    } catch(error) {
      return { success: false, data: null }
    }
  }

  // READ SINGLE USER ON KEY(id)
  const getOne = async (value, key = 'id') => {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        [key]: value,
      },
    }
    try {
      const { Item = {} } = await dynamoClient.get(params).promise()
      return { success: true, data: Item }
    } catch(error) {
      return { success: false, data: null }
    }
  }

  // Delete Existing User
  const deleteOne = async (value, key = "id") => {
    const params = {
      TableName: TABLE_NAME,
      Key: {
        [key]: value,
      },
    }
    try {
      await dynamoClient.delete(params).promise()
      return { success: true }
    } catch(error) {
      return { success: false }
    }
  }

export {
  createOrUpdate,
  getAll,
  getOne,
  deleteOne
}