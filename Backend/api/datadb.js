const { MongoClient, Double } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'make-up_test';

async function main() {
  // Use connect method to connect to the server
  await client.connect();
  console.log('Connected successfully to server');
  const db = client.db(dbName);
  const collection = db.collection('Production');
  var test_obj={id:000, brand:'Ruby Rose', product:'Lipstick'};
  db.collection('Production').insertOne(test_obj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted"); 
  });
  const findResult = await collection.find({}).toArray();
  console.log('Found documents =>', findResult);
  // the following code examples can be pasted here...

  return 'done.';
}

main()
  .then(console.log)
  .catch(console.error)
  .finally(() => client.close());
/*   async function findAll()
  {
    const findResult = await collection.find({}).toArray();
    console.log('Found documents =>', findResult);
}
findAll(); */