const assignReqToBody = require("../utils");
const { run } = require("../database-connection");
const { getAll, findById, insert, deleteById, updateOneById } = require("./products.service");

const productsController = async (req, res) => {
    if (req.url === "/api/products" && req.method === "POST") {
        try {
            const body = await assignReqToBody(req);
            const parsedBody = JSON.parse(body);
            const product = await run("Products", (data) => insert(data, parsedBody));
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(product));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    } else if (req.url === "/api/products" && req.method === "GET") {
        try {
            const products = await run("Products", (data) => getAll(data));
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(products));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }
    else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "GET") {
        try {
            const id = req.url.split("/")[3];
            const idInt = parseInt(id);
            const product = await run("Products", (data) => findById(data, idInt));
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(product));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }
    else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "DELETE") {
        try {
            const id = req.url.split("/")[3];
            const idInt = parseInt(id);
            const message = await run("Products", (data) => deleteById(data, idInt));
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message }));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }
    else if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "PATCH") {
        try {
            const id = req.url.split("/")[3];
            const idInt = parseInt(id);
            const body = await assignReqToBody(req);
            const product = await run("Products", (data) => updateOneById(data, idInt, body));
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(product));
        } catch (error) {
            res.writeHead(404, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ message: error }));
        }
    }
}

// const handleSuccessResponse = (data) =>{
//     res.writeHead(200, { "Content-Type": "application/json" });
//     // send the message
//     res.end(JSON.stringify(data));
// }


// const handleErrorResponse = (error) => {
//     res.writeHead(404, { "Content-Type": "application/json" });
//     // send the error
//     res.end(JSON.stringify({ message : error }));
// }
console.log("products controller mounted");
module.exports = productsController;