
import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'



const server = http.createServer(async(req, res)=>{
    const {method, url} = req //daqui eu retiro o metodo e o caminho da requisicao
    
    await json(req,res)

    const rota = routes.find(rota=>{
        return rota.method === method && rota.url === url
    })

    if(rota){
        return rota.handler(req,res)
    }

    // if(method === "POST" && url === "/tasks"){
        
    //     return res.writeHead(201).end('Task Adicionada')
    // }
    // return res.end('Ola mundo!')
})

server.listen(3030)