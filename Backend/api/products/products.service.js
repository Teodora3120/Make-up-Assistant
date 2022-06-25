
const { toXML } = require('jstoxml');
 async function printRSS(body) {
        const products = body;
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
    const result=await data.findOne({ "id": id });
    console.log(result);
    if(result===null)
        return -1;
    return result;
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
    await data.updateMany({ "id": { $gt: id-1 } }, {$inc:{id:-1}});
    console.log(results);
    return results;
}

async function checkFilter(data, body) {
    var projection={};
    if(body.brand!="choose")
        projection=Object.assign(projection, {brand:body.brand});
    if(body.product_type!="choose")
        projection=Object.assign(projection, {product_type:body.product_type});
    if(body.outfitcolors!="choose")
        projection=Object.assign(projection, {outfitcolors:body.outfitcolors});
    if(body.event!="choose")
        projection=Object.assign(projection, {event:body.event});
    if(body.eyecolor!="choose")
        projection=Object.assign(projection, {eyecolor:body.eyecolor});
    if(body.haircolor!="choose")
        projection=Object(projection, {haircolor:body.haircolor});
    if(body.vegan!="choose")
        projection=Object.assign(projection, {vegan:body.vegan});
    if(body.skinage!="choose")
        projection=Object.assign(projection,{skinage:body.skinage});
    if(body.skintypes!="choose")
        projection=Object.assign(projection, {skintypes:body.skintypes});
    
    const options = {
        sort: { id: 1 },
        projection: { id: 1, brand: 1, name: 1, price: 1, price_sign: 1, product_link: 1, description: 1,
             rating: 1, category: 1, product_type: 1, api_featured_image: 1, outfitcolors:1, event:1, eyecolor:1,
            haircolor:1, vegan:1, skinage:1, skintypes:1},
    };
    let products = await data.find(projection, options).toArray();
    return products;
}

 async function updateIds(data, id){
    console.log("");
} 
async function updateOneById(data, id) {
    const result = await data.updateOne(
        { id: id },
        { $inc: { rating: 1 } }
     )
    return result;
}

async function updateProduct(data, body){
    const oldproduct={id:body.id};
    if(body.product_type==='lip_liner' || body.product_type==='lipstick' || body.product_type==='eyeliner' || body.product_type==='eyeshadow' || body.product_type==='blush' || body.product_type==='bronzer' || body.product_type==='mascara')
    {
        body.skintypes="";
        body.skinage="";
    }
    const newproduct={$set:{name:body.name, price:body.price, price_sign:body.price_sign,
    product_link:body.product_link, description:body.description, rating:body.rating,
     product_type:body.product_type, api_featured_image:body.api_featured_image, 
     outfitcolors:body.outfitcolors, event:body.event, eyecolor:body.eyecolor, haircolor:body.haircolor,
    vegan:body.vegan, skinage:body.skinage, skintypes:body.skintypes}};
    const result= await data.updateOne(oldproduct, newproduct);
    return result;
}
async function getMaxId(data){
    return await data.find({}).sort({id: -1}).limit(1).toArray()
}
module.exports = { findById, getAll, deleteById, updateOneById, insert, filter , topFilter, printRSS, updateProduct, updateIds, checkFilter, getMaxId};

