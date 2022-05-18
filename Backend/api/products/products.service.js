const { run } = require("../database-connection");

//filtreaza datele dupa un query specificat
function filter(data, query) {
    const options = {
        // sort returned documents in ascending order by title (A->Z)
        sort: { name: 1 },
        // Include only the `title` and `imdb` fields in each returned document
        projection: { _id: 0, id: 1, brand: 1, name: 1 },
    };
    return data.find(query, options).toArray();
}
async function findbyFilter() {
    const products = await run("Products", (data) => filter(data, { brand: "colourpop" }));
    console.log(products);
}
findbyFilter();

//filtreaza dupa id
async function findById(data, id) {
    return await data.findOne({ "id": id });
}

//ia toate documentele din colectie
function getAll(data) {
    const results = data.find({}).toArray();
    return results;
}

function insert(data, object) {
    const response = data.insertOne(object);
    console.log(response);
    return response;
}

function deleteById(data, id) {
    const results = data.deleteOne({ "id": id });
    console.log(results);
    return results;
}

function updateOneById(data, id, query) {
    const filter = { "id": id };
    const options = { upsert: true };
    const updateDoc = { $set: query };
    const result = data.updateOne(filter, updateDoc, options);
    return result;
}

module.exports = { filter, findById, getAll, deleteById, updateOneById, insert }