
const { toXML } = require('jstoxml');
 async function printRSS(body) {
        const products=body;
       // const feed = new Feed(products);
        const content = {TopProducts:[products]};
        const config = {
            indent: ' ',
            header:true, 
            contentReplacements: {
                '<': '&lt;', 
                '>': '&gt;',
                '"': '&quot;',
                '\'': '&apos;',
                '&': '&amp;',
                '&trade;':''
            }
        };
       const rss=toXML(content, config);
        return rss;
} 

async function filter(data, body) {
    const brands = body.brands.split(",");
    const skin = { skintypes: body.skintypes, skinage: body.skinage };
    const makeup = { outfitcolors: body.outfitcolors, event: body.event, eyecolor: body.eyecolor, haircolor: body.haircolor, vegan: body.vegan };
    const options = {
        sort: { name: 1 },
        projection: { id: 1, brand: 1, name: 1, price: 1, price_sign: 1, product_link: 1, description: 1, rating: 1, category: 1, product_type: 1, api_featured_image: 1 },
    };
    let products = await data.find({ $or: [skin, makeup] }, options).toArray();
    if (brands[0] !== '') {
        return products.filter(item => brands.includes(item.brand));
    }
    return products;
}

async function topFilter(data, body) {
    const options = {
        sort: { name: 1 },
        projection: { id: 1, brand: 1, name: 1, price: 1, price_sign: 1, product_link: 1, description: 1, rating: 1, category: 1, product_type: 1, api_featured_image: 1 },
    };
    if(body.product_type !== "all"){
        let products = await data.find({product_type : body.product_type}, options).toArray();
        console.log(products.sort((a, b) => a.rating < b.rating ? 1 : -1).slice(0, 10));
        if(products.length <= 10){
            return products.sort((a, b) => a.rating < b.rating ? 1 : -1);
        } 
        return products.sort((a, b) => a.rating < b.rating ? 1 : -1).slice(0, 10);
    }
    let products = await data.find({}, options).toArray();
    console.log(products.sort((a, b) => a.rating < b.rating ? 1 : -1).slice(0, 10));
    return products.sort((a, b) => a.rating < b.rating ? 1 : -1).slice(0, 10);
}


async function findById(data, id) {
    return await data.findOne({ "id": id });
}

async function getAll(data) {
    const results = await data.find({}).toArray();
    return results;
}

async function insert(data, object) {
    const response = await data.insertOne(object);
    return response;
}

async function deleteById(data, id) {
    const results = await data.deleteOne({ "id": id });
    console.log(results);
    return results;
}

async function updateOneById(data, id) {
    const result = await data.updateOne(
        { id: id },
        { $inc: { rating: 1 } }
     )
    return result;
}

module.exports = { findById, getAll, deleteById, updateOneById, insert, filter , topFilter, printRSS};