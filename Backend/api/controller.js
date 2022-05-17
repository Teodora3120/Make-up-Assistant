const getReqData = require("./utils");
const Todo = require("./Backend-service");
const { run } = require("./datadb");
const { getAll, findById, insert, deleteById, updateOneById } = require("./models/service");
// const {getAll} = require('../api/models/service');

const controller = async (req, res) => {
    if (req.url === "/api/todos" && req.method === "POST") {
        // get the data sent along
        // let todo_data = await getReqData(req);
        // // create the todo
        // let todo = await new Todo().createTodo(JSON.parse(todo_data));
        const query = {id: 1050, "name": "Ddadada"};
        const product = await run("Products", (data) => insert(data, query ));
        console.log("Query: " + query.name);
        // set the status code and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        //send the todo
        res.end(JSON.stringify(product));

    } else if (req.url === "/api/todos" && req.method === "GET") {
        // get the todos.
        const products = await run("Products", (data) => getAll(data));
        // set the status code, and content-type
        res.writeHead(200, { "Content-Type": "application/json" });
        // send the data
        res.end(JSON.stringify(products));
        // handleSuccessResponse(todos);
    }
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "GET") {
        try {
            // get id from url
            const id = req.url.split("/")[3];
            const idInt = parseInt(id);
            console.log("URL ID: " + idInt);
            // get todo
            // const todo = await new Todo().getTodo(id);
            // console.log("To do: " + todo);
            const product = await run("Products", (data) => findById(data, idInt));
            // console.log(product);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the data
            res.end(JSON.stringify(product));
        } catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
            //handleErrorResponse(error);
        }
    }

    // /api/todos/:id : DELETE
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "DELETE") {
        try {
            // get the id from url
            const id = req.url.split("/")[3];
            const idInt = parseInt(id);
            console.log("URL ID: " + idInt);
            // delete todo
            const product = await run("Products", (data) => deleteById(data, idInt));
            console.log(product);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the message
            res.end(JSON.stringify({ message }));
        } catch (error) {
            // set the status code and content-type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
           // handleErrorResponse(error);
        }
    }

    // /api/todos/:id : UPDATE
    else if (req.url.match(/\/api\/todos\/([0-9]+)/) && req.method === "PATCH") {
        try {
            // get the id from the url
            const id = req.url.split("/")[3];
            const idInt = parseInt(id);
            console.log("URL ID: " + idInt);
            // update todo
            query = {$set:{"name": "Teodora"}};
            const product = await run("Products", (data) => updateOneById(data, idInt, query));
            console.log(query.name);
            // set the status code and content-type
            res.writeHead(200, { "Content-Type": "application/json" });
            // send the message
            res.end(JSON.stringify(updated_todo));
        } catch (error) {
           // set the status code and content type
            res.writeHead(404, { "Content-Type": "application/json" });
            // send the error
            res.end(JSON.stringify({ message: error }));
           // handleErrorResponse(error);
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

module.exports = controller;