import { randomUUID } from "node:crypto"
import { Database } from "./database.js"
import { construirRota } from "./utils/construtorDeRota.js"

const database = new Database
export const routes = [
    {
        method:'GET',
        url: construirRota('/tasks'),
        handler:(req, res)=>{
            const tasks = database.metodoSelect('tasks')

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method:'POST',
        url: construirRota('/tasks'),
        handler:(req, res)=>{
            const {title, description} = req.body
            const newTask = {
                id: randomUUID(),
                title,
                description,
                completed_at: null,
                created_at: new Date().toISOString().split('T')[0],
                updated_at: null,
            }
            database.metodoInsert('tasks',newTask)
            return res.writeHead(201).end()
        }
    },
    {
        method:'DELETE',
        url: construirRota('/tasks/:id'),
        handler: (req, res)=>{
            const {id} = req.params
            database.metodoDelete('tasks',id)
            return res.writeHead(204).end()
        }
    },
    {
        method:'PUT',
        url: construirRota('/tasks/:id'),
        handler: (req, res)=>{
            const {id} = req.params
            const {title, description} = req.body

            database.metodoUpdate('tasks',id, {
                title,
                description,
                completed_at: null,
                created_at,
                updated_at: new Date().toISOString().split('T')[0],
            })
            return res.writeHead(204).end()
        }
    },
]