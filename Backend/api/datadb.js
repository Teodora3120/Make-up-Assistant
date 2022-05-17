const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri =
  "mongodb://localhost:27017";
const client = new MongoClient(uri);

const run = async (targetTable, callback) => {
  const tables = ["Products", "Users"];
  const table = tables.find(item => item === targetTable);
  try {
    await client.connect();
    console.log("Database connection successful");
    try {
      const database = client.db('MakeupProductsDatabase');
      const foundTable = database.collection(table);
      const results = await callback(foundTable);
      console.log("Database callback succesful")
      return results;
    } catch (err) {
      console.log(err);
    }
  } finally {
    // Ensures that the client will close when you finish/error
    console.log("Database connection closed")
    await client.close();
  }
}
// run().catch(console.dir);

module.exports = {
  run
}
