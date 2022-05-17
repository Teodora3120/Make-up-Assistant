const { MongoClient, Double } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'make-up_test';

DB = client.db(dbName)

module.exports = {
  DB, client
}