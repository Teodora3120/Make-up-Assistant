// const products = require("../models/products.js")
// const {database, client} = require("../models/db.js")

// client.connect().then(res => {
//     console.log(res, res.json())
//     console.log(database)
//     products.getFilters().then(filters => {
//         console.log(filters)
//     })

//     products.findByFilter(["Vegan"], undefined, "lip_liner", undefined).then(filtered_products => {
//         console.log(filtered_products.length)
//     })
//     //products.findByFilter(["Vegan"], undefined, "pencil", undefined).then(filtered_products => {
//     //    console.log(filtered_products.toArray())
//     //})
// })
