import { randomUUID } from 'node:crypto'
import http from 'node:http'
import { json } from './middlewares/json.js'

const arrayTasks= []

const server = http.createServer(async(req, res)=>{
    const {method, url} = req //daqui eu retiro o metodo e o caminho da requisicao
    
    await json(req,res)

    if(method === "GET" && url === "/tasks"){
        
        return res.end(JSON.stringify(arrayTasks))
    }

    if(method === "POST" && url === "/tasks"){
        const task = {
            id: randomUUID(),
            title: "Tarefa teste",
            description: "uma tarefa imaginária pra testar",
            completed_at: null,
            created_at: new Date().toISOString().split('T')[0],
            updated_at: null,
        }

        arrayTasks.push(task)
        return res.writeHead(201).end('Task Adicionada')
    }
    return res.end('Ola mundo!')
})

server.listen(3030)