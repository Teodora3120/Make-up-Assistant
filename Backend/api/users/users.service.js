const { run } = require("../database-connection");

//filtreaza datele dupa un query specificat
function filter(data, query) {
    const options = {
        // sort returned documents in ascending order by title (A->Z)
        sort: { name: 1 },
        // Include only the `title` and `imdb` fields in each returned document
        projection: { _id: 0, username: 1, brand: 1, name: 1 },
    };
    return data.find(query, options).toArray();
}
// async function findbyFilter() {
//     const Users = await run("Users", (data) => filter(data, { username : "aba" }));
//     console.log(Users);
// }
// findbyFilter();


function insert1(data) {
    return data.insertOne({username: "calin", password : "mypass1"});
}
async function insertData(){
    const Users = await run("Users", (data) => insert1(data));
    console.log(Users);
}
insertData();



//filtreaza dupa username
async function findbyUsername(data, username) {
    return await data.findOne({ "username": username });
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

function deleteByUsername(data, username) {
    const results = data.deleteOne({ "username": username });
    console.log(results);
    return results;
}

function updateOneByUsername(data, username, query) {
    const newQuery = JSON.parse(query);
    const filter = { "username": username };
    const options = { upsert: true };
    const updateDoc = { $set: newQuery };
    const result = data.updateOne(filter, updateDoc, options);
    return result;
}

module.exports = { filter, findbyUsername, getAll, deleteByUsername, updateOneByUsername, insert }