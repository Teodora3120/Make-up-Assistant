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


// function uniqueUsername(data) {
//     return data.createIndex({ "username": 1 }, {unique: true});
// }
// async function username(){
//     const Users = await run("Users", (data) => uniqueUsername(data));
//     console.log(Users);
// }
// username();


const register = async (data, credentials) => {
    let response = { statusCode: 200, message: "OK" };
    const existingUser = await data.findOne({ "username": credentials.username });
    if (existingUser && existingUser.username && existingUser.username === credentials.username) {
        response.statusCode = 401;
        response.message = "This username is already taken!";
        return response;
    }
    const newUser = await data.insertOne(credentials);
    return newUser;
}



async function login(data, credentials) {
    let response = {};
    const existingUser = await data.findOne({ "username": credentials.username });
    if (!existingUser) {
        response.statusCode = 404;
        response.message = "This username does not exist in our database."
        return response;
    }

    if (existingUser.password === credentials.password) {
        response.statusCode = 200;
        response.message = "You are now logged in.";
        const result = { ...response, token: "120bdbxbjhbdcjsjb", ...existingUser };
        return result;
    }

    return { statusCode: 401, message: "Wrong password!" };
}

//ia toate documentele din colectie
function getAll(data) {
    const results = data.find({}).toArray();
    return results;
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

module.exports = { filter, getAll, deleteByUsername, updateOneByUsername, register, login }