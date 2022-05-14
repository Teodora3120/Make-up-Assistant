const http = require('http');
const Todo = require("../api/controller");
const { getReqData } = require("../api/utils");
const PORT = 5000;
const service = require('../api/service');
const server = http.createServer(async (req, res) => {
    await service(req, res);
});


server.listen(PORT, () => {
    console.log(`server started on port: ${PORT}`);
});