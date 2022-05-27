
//filtreaza datele dupa un query specificat
async function filter(data, body) {
    const skin = {skintypes: body.skintypes, skinage: body.skinage};
    const makeup = {outfitcolors : body.outfitcolors, event: body.event, eyecolor: body.eyecolor, haircolor: body.haircolor, vegan: body.vegan};
    const options = {
        // sort returned documents in ascending order by title (A->Z)
        sort: { name: 1 },
        // Include only the `title` and `imdb` fields in each returned document
        projection: { brand: 1, name: 1, price: 1, price_sign: 1, product_link: 1 , description: 1, rating: 1, category: 1, product_type: 1, api_featured_image: 1 },
    };
    // const skinproducts = data.find(skin, options).toArray();
    const products = data.find(body, options).toArray();
    // const brands = data.find({$or: [{ brand: "nyx" }, { brand: "colourpop"}]}, options).toArray();
    // console.log(skinproducts);
    console.log(products);
    // console.log(brands);
    return await products;
}


//filtreaza dupa id
async function findById(data, id) {
    return await data.findOne({ "id": id });
}

//ia toate documentele din colectie
async function getAll(data) {
    const results = data.find({}).toArray();
    return await results;
}

async function insert(data, object) {
    const response = await data.insertOne(object);
    console.log(response);
    return response;
}

async function deleteById(data, id) {
    const results = data.deleteOne({ "id": id });
    console.log(results);
    return await results;
}

async function updateOneById(data, id, query) {
    const filter = { "id": id };
    const options = { upsert: true };
    const updateDoc = { $set: query };
    const result = data.updateOne(filter, updateDoc, options);
    return await result;
}

module.exports = { findById, getAll, deleteById, updateOneById, insert, filter }