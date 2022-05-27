const assignReqToBody = require("../utils");
const { run } = require("../database-connection");
const auth = require("../../middleware/auth");
const { getAll, findById, insert, deleteById, updateOneById } = require("./products.service");

const productsController = async (req, res) => {
    if (req.method === "GET") {
        if (req.url === "/api/products") {
            try {
                await auth(req, res);
                const products = await run("Products", (data) => getAll(data));
                writeSuccessHead(res, products);
            } catch (error) {
                writeErrorHead(res, error);
            }
        }
        if (req.url.match(/\/api\/products\/([0-9]+)/)) {
            try {
                await auth(req, res);
                console.log("req.user" + req.user);
                const id = req.url.split("/")[3];
                const idInt = parseInt(id);
                const product = await run("Products", (data) => findById(data, idInt));
                writeSuccessHead(res, product);
            } catch (error) {
                writeErrorHead(res, error);
            }
        }
    }
    if (req.url === "/api/products" && req.method === "POST") {
        try {
            console.log("POST");
            const body = await auth(req, res);
            // const body = await assignReqToBody(req);
            console.log("body" + body);
            const products = await run("Products", (data) => getAll(data));
            // const product = await run("Products", (data) => insert(data, body));
            writeSuccessHead(res, products);
        } catch (error) {
            writeErrorHead(res, error);
        }
    }
    if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "DELETE") {
        try {
            console.log("DELETE");
            await auth(req, res);
            const id = req.url.split("/")[3];
            const idInt = parseInt(id);
            const message = await run("Products", (data) => deleteById(data, idInt));
            writeSuccessHead(res, message);
        } catch (error) {
            writeErrorHead(res, error);
        }
    }
    if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "PATCH") {
        try {
            console.log("PATCH");
            const body =  await auth(req, res);
            const id = req.url.split("/")[3];
            const idInt = parseInt(id);
            const product = await run("Products", (data) => updateOneById(data, idInt, body));
            writeSuccessHead(res, product);
        } catch (error) {
            writeErrorHead(res, error);
        }
    }
}

const writeSuccessHead = (res, data) => {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(data));
}

const writeErrorHead = (res, error) => {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: error }));
}

console.log("products controller mounted");
module.exports = productsController;