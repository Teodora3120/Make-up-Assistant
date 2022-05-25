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
                console.log(body);
                console.log(typeof body);
                // send back the data
                if (typeof body === 'string' && body != "") {
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