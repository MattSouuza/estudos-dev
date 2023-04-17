 import http from "node:http";
 import { handleJson } from "./middlewares/handle-json.js";
import { handleEndpoint } from "./middlewares/handle-endpoint.js";

 const server = http.createServer(async (req, res) => {
    await handleJson(req, res);

    const endpoint = handleEndpoint(req, res);

    return endpoint(req, res);
 });

 server.listen(4000);