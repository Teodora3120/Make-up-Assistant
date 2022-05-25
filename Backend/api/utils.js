async function assignReqToBody(req) {
    return await new Promise((resolve, reject) => {
        try {
            let body = "";
            // listen to data sent by client
            req.on("data", (chunk) => {
                // append the string version to the body
                body += chunk.toString();
            });
            // listen till the end
            req.on("end", () => {
                // send back the data
                if (typeof body === 'string') {
                    resolve(JSON.parse(body));
                } else {
                    resolve(body);
                }
            });
        } catch (error) {
            reject(error);
        }
    });
}
module.exports = assignReqToBody;