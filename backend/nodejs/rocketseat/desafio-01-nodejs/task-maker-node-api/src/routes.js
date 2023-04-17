import { randomUUID } from "node:crypto";
import routePathBuilder from "./utils/route-path-builder.js";
import Context from "./db/context.js";
import { TaskNotFound } from "./utils/error-models/task-not-found.js";

const context = new Context();

export const routes = [
    {
        method: "GET",
        path: routePathBuilder("/task"),
        handler: (req, res) => {
            const { search } = req.query;

            try {
                return res.end(JSON.stringify(context.select(search ? { title: search } : null)))
            } catch (error) {
                return res.writeHead(400).end(JSON.stringify({ errorMessage: `A error has occoured while trying to list all tasks: ${error}` }))
            }
        }
    },
    {
        method: "POST",
        path: routePathBuilder("/task"),
        handler: (req, res) => {
            const { title, description } = req.body;

            try {
                context.insert({
                    id: randomUUID(),
                    title,
                    description,
                    completed_at: null,
                    created_at: new Date(),
                    updated_at: null,
                });
            } catch (error) {
                console.log("A error has occoured while trying to create a task!", error);

                return res.writeHead(400).end(JSON.stringify({ errorMessage: `A error has occoured while trying to create a task: ${error}` }));
            }

            return res.writeHead(201).end();
        }
    },
    {
        method: "PUT",
        path: routePathBuilder("/task/:id"),
        handler: (req, res) => {
            const { id } = req.params;
            const { title, description } = req.body;

            if (!id) {
                return res.writeHead(400).end(JSON.stringify({ errorMessage: `The task ID must be provided to continue this operation!` }));
            }

            try {
                context.update(id, {
                    title,
                    description
                })
            } catch (error) {
                if (error instanceof TaskNotFound) {
                    return res.writeHead(404).end(JSON.stringify({ errorMessage: error.message }));
                }

                return res.writeHead(400).end(JSON.stringify({ errorMessage: `The following error occoured while trying to update the task with ID '${id}': ${error}`}));
            }

            return res.writeHead(200).end(JSON.stringify({ message: "Task successfully updated!"}));
        }
    },
    {
        method: "DELETE",
        path: routePathBuilder("/task/:id"),
        handler: (req, res) => {

        }
    },
    {
        method: "PATCH",
        path: routePathBuilder("/task/:id/complete"),
        handler: (req, res) => {

        }
    },
]