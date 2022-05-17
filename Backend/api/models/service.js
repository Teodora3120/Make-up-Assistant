

const collection = [];
//filtreaza datele dupa un query specificat
function find(query) {
    return collection.find(query).toArray()
}

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
    const results = data.insert(object);
    console.log(results);
    return results;
}

function deleteById(data, id) {
    const results = data.deleteOne({"id": id});
    console.log(results);
    return results;
}

function updateOneById(data, id, query) {
    const result = data.updateOne({"id": id}, query);
    console.log(result);
    return result;
}

//isi creeaza un filtru custom dupa mai multi parametrii
//de folosit in search (field-urile definite aici nu-s neaparat batute in piatra)
function findByFilter(tag_filter, name_filter, product_type_filter, color_filter) {
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
    return collection.find(query).toArray()
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

module.exports = { find, findById, findByFilter, getAll, deleteById, updateOneById, insert, getFilters }