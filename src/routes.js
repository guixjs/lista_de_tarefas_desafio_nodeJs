import { randomUUID } from "node:crypto"
import { Database } from "../database.js"

const arrayTasks= []
const database = new Database
export const routes = [
    {
        method:'GET',
        url: '/tasks',
        handler:(req, res)=>{
            const tasks = database.metodoSelect('tasks')

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method:'POST',
        url: '/tasks',
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
]