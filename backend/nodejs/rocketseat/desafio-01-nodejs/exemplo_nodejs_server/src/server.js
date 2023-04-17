import http from "node:http";
import json from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extractQueryParams } from "./utils/extract-query-params.js";


const server = http.createServer(async (req, res) => {
    // obtem o método http e a url do objeto da requisição feita
    const { method, url } = req;

    // chama este middleware que obtem o corpo da requisição (se houver)
    await json(req, res);

    // encontra a rota com base no método e url requisitados, se não encontrar retorna 'false'
    const route = routes.find(route => {
        return route.method === method && route.path.test(url);
    })

    if (!route) {
        return res.writeHead(404).end(JSON.stringify({ message: "URL não encontrado :(" }));
    }

    // obtem o 'objeto regex' que contem o 'route parameter' (se tiver parâmetros) 
    const routeParams = req.url.match(route.path);

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extractQueryParams(query) : {};

    return route.handler(req, res);
})

server.listen(3000);