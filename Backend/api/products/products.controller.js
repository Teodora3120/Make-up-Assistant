const { run } = require("../database-connection");
const auth = require("../../middleware/auth");
const { getAll, findById, filter, deleteById, updateOneById, topFilter, printRSS, insert, getMaxId} = require("./products.service");

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

        if (req.url === "/api/products/csv") {
            try {
                await auth(req, res);
                const products = await run("Products", (data) => getAll(data));
                var keys = Object.keys(products[0])
                var csv = [keys.join(",")]
                for (const line of products) {
                    var csv_line = []
                    for(const k of keys){
                        if(k === "_id"){
                            csv_line.push('"'+line[k]+'"')
                            continue
                        }
                        if(typeof(line[k]) === "number"){
                            csv_line.push(line[k])
                            continue
                        }
                        if(line[k] === null){
                            csv_line.push('')
                            continue
                        }
                        csv_line.push('"'+line[k].replaceAll('"', '""').replaceAll('\n', '').trim() + '"')
                    }
                    csv.push(csv_line.join(","))
                }
                writeCSVSuccessHead(res, csv.join("\n"));
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
    if (req.method === "POST") {
        if (req.url === "/api/products/add") {
            try {
                var body = await auth(req, res)
                if(!body.hasOwnProperty('id')){
                    const last = await run("Products", (data) => getMaxId(data))
                    body["id"] = last[0]["id"] + 1;
                }
                if(body.hasOwnProperty("_id")){
                    delete body["_id"]
                }
                writeSuccessHead(res, await run("Products", (data) => insert(data, body)));
            } catch (error) {
                writeErrorHead(res, error);
            }
        }
         if (req.url === "/api/products/rss") {
            try {
                console.log("POST---RSS");
                const body = await auth(req, res);
                printRSS(body).then(rss => {
                    writeRssSuccessHead(res, rss);
                });
            } catch (error) {
                writeErrorHead(res, error);
            }
        } 
        if (req.url === "/api/products/filter") {
            try {
                console.log("POST---topProducts");
                const body = await auth(req, res);
                console.log("Body" + body);
                const products = await run("Products", (data) => topFilter(data, body));
                writeSuccessHead(res, products);
            } catch (error) {
                writeErrorHead(res, error);
            }
        }
        if (req.url === "/api/products") {
            try {
                console.log("POST---preferancePage");
                const body = await auth(req, res);
                console.log(body);
                const products = await run("Products", (data) => filter(data, body));
                writeSuccessHead(res, products);
            } catch (error) {
                writeErrorHead(res, error);
            }
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
            // const body =  await auth(req, res);
            const id = req.url.split("/")[3];
            const idInt = parseInt(id);
            // console.log(body);
            console.log(idInt);
            const product = await run("Products", (data) => updateOneById(data, idInt));
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
const writeRssSuccessHead = (res, rss) => {
    res.writeHead(200, {  'Content-Type': "text/html" });
    res.end(rss);
}

const writeCSVSuccessHead = (res, csv) => {
    res.writeHead(200, {"Content-Type": "text/csv", "Content-Disposition": "attachment;filename=products.csv"})
    res.end(csv)
}
                    

console.log("products controller mounted");
module.exports = productsController;