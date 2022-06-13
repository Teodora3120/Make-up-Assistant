const jwt = require("jsonwebtoken");
const assignReqToBody = require('../api/utils');

const config = 'jwttokenkey';

const verifyToken = async (req, res) => {
    const body = await assignReqToBody(req);
    let token = null;
    if (body && body.token) {
        token = body.token;
    }
    if (req && req.query && req.query.token) {
        token = req.query.token;
    }
    if (req && req.headers && req.headers["x-access-token"]) {
        token = req.headers["x-access-token"];
    }
    if (!token) {
        res.writeHead(403, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "A token is required for authentication" }));
    }
    try {
        const decoded = jwt.verify(token, config);
        req.user = decoded;
        return body;
    } catch (err) {
        res.writeHead(401, { "Content-Type": "application/json" });
        return res.end(JSON.stringify({ message: "Invalid Token" }));
    }
};
module.exports = verifyToken;