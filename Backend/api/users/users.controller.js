const assignReqToBody = require("../utils");
const { run } = require("../database-connection");
const { findbyUsername, insert, checkLoginUsername, login, register } = require("./users.service");

const usersController = async (req, res) => {
    if (req.method === "POST") {
        if (req.url === "/api/users/register") {
            try {
                const body = await assignReqToBody(req);
                const response = await run("Users", (collection) => register(collection, body));
                if (response.statusCode === 401) {
                    writeErrorHead(res, response.message);
                } else {
                    writeSuccessHead(res, response);
                }
            } catch (error) {
                writeErrorHead(res, error);
            }
        }
        if (req.url === "/api/users/login") {
            try {
                const body = await assignReqToBody(req);
                const response = await run("Users", (collection) => login(collection, body));
                if (response.statusCode === 401 || response.statusCode === 404) {
                    writeErrorHead(res, response.message);
                } else {
                    writeSuccessHead(res, response);
                }
            } catch (error) {
                writeErrorHead(res, error);
            }
        }
        if (req.url === "/api/users/logout") {

        }
    }

    // if (req.url === "/api/users/login" && req.method === "POST") {
    //     try {
    //         const body = await assignReqToBody(req);
    //         const parsedBody = JSON.parse(body);
    //         const product = await run("Products", (data) => insert(data, parsedBody));
    //         writeSuccessHead(res, product);
    //     } catch (error) {
    //         writeErrorHead(res, error);
    //     }
    // }
    // if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "DELETE") {
    //     try {
    //         const id = req.url.split("/")[3];
    //         const idInt = parseInt(id);
    //         const message = await run("Products", (data) => deleteById(data, idInt));
    //         writeSuccessHead(res, message);
    //     } catch (error) {
    //         writeErrorHead(res, error);
    //     }
    // }
    // if (req.url.match(/\/api\/products\/([0-9]+)/) && req.method === "PATCH") {
    //     try {
    //         const id = req.url.split("/")[3];
    //         const idInt = parseInt(id);
    //         const body = await assignReqToBody(req);
    //         const product = await run("Products", (data) => updateOneById(data, idInt, body));
    //         writeSuccessHead(res, product);
    //     } catch (error) {
    //         writeErrorHead(res, error);
    //     }
    // }
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
module.exports = usersController;