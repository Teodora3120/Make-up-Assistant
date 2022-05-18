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
    const newQuery = JSON.parse(query);
    const filter = { "id": id };
    const options = { upsert: true };
    const updateDoc = { $set: newQuery };
    const result = data.updateOne(filter, updateDoc, options);
    return result;
}

//isi creeaza un filtru custom dupa mai multi parametrii
//de folosit in search (field-urile definite aici nu-s neaparat batute in piatra)
/* function findByFilter(data, tag_filter, name_filter, product_type_filter, color_filter) {
    var query = {}
    if (tag_filter !== undefined) {
        if (!Array.isArray(tag_filter)) {
            tag_filter = [tag_filter]
        }
        query["tag_list"] = {
            "$in": tag_filter
        }
    }

    if (name_filter !== undefined) {
        query["name"] = name_filter
    }

    if (product_type_filter !== undefined) {
        query["product_type"] = product_type_filter
    }

    if (color_filter !== undefined) {
        query["product_colors"] = {
            "$in": color_filter
        }
    }
    return data.find(query).toArray()
}



//obtine un set de valori unice pentru fiecare camp
//de folosit pentru formular, in conjunctie cu findByFilter pentru cautari (just a proof of concept)
async function getFilters() {
    const filter_fields = ["brand", "rating", "category", "tag_list", "product_colors"]
    const fields = {}
    for (const field of filter_fields) {
        fields[field] = await collection.distinct(field, {})
    }
    return fields
}
 */
module.exports = { filter, findById, getAll, deleteById, updateOneById, insert }