const { MongoClient } = require("mongodb");
// Replace the uri string with your MongoDB deployment's connection string.
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);

async function run() {
try {
client.connect();

const database = client.db('MakeupProductsDatabase');
const products = database.collection('Products');
    const options = { upsert: true };
    const updateDoc = { $set: {skintypes: "", skinage: ""}};
    await products.updateMany({ product_type :  "nail_polish"  }, updateDoc, options);

  } finally {
    client.close();
  }
}
run().catch(console.dir);
