import { randomUUID } from "node:crypto"
import Database from "./db/database.js";
import routePathBuilder from "./utils/route-path-builder.js";

const database = new Database();

export const routes = [
    {
        method: "GET",
        path: routePathBuilder("/users"),
        handler: (req, res) => {

            const { search } = req.query;

            return res.end(JSON.stringify(database.select("users", search ? {
                name: search,
                email: search
            } : null)));
        }
    },
    {
        method: "POST",
        path: routePathBuilder("/users"),
        handler: (req, res) => {
            const { name, surname, age, email, description } = req.body;

            database.insert("users", {
                id: randomUUID(),
                email,
                name,
                surname,
                age,
                description
            });

            return res.writeHead(201).end();
        }
    },
    {
        method: "PUT",
        path: routePathBuilder("/users/:id"),
        handler: (req, res) => {
            const { id } = req.params;
            const { name, surname, email, age, description } = req.body;

            try {
                database.update("users", id, { name, surname, email, age, description });
            } catch (error) {

                console.log("Houve um erro ao atualizar o usuário", error);

                if (error instanceof RangeError) {
                    res.writeHead(404);
                } else if (error instanceof TypeError) {
                    res.writeHead(400);
                } else {
                    res.writeHead(500);
                }

                res.end(JSON.stringify({ message: error.message }));

                return;
            }

            res.writeHead(200).end(JSON.stringify({ message: "Usuário atualizado com sucesso!" }));
        }
    },
    {
        method: "DELETE",
        path: routePathBuilder("/users/:id"),
        handler: (req, res) => {
            const { id } = req.params;

            try {
                database.delete("users", id);
            } catch (error) {

                console.log("Houve um erro ao deletar o usuário", error);

                if (error instanceof RangeError) {
                    res.writeHead(404);
                } else if (error instanceof TypeError) {
                    res.writeHead(400);
                } else {
                    res.writeHead(500);
                }

                res.end(JSON.stringify({ message: error.message }));

                return;
            }

            res.writeHead(200).end(JSON.stringify({ message: "Usuário deletado com sucesso!" }));
        }
    }
]