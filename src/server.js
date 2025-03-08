
import http from 'node:http'
import { json } from './middlewares/json.js'
import { routes } from './routes.js'
import { extractQuery } from './utils/extratorDeQuery.js'



const server = http.createServer(async(req, res)=>{
    const {method, url} = req //daqui eu retiro o metodo e o caminho da requisicao
    
    await json(req,res)

    const rota = routes.find(rota=>{
        return rota.method === method && rota.url.test(url)
    })

    if(rota){
        const rotaParams = req.url.match(rota.url)
        const {query, ...params} = rotaParams.groups

        req.params = params
        req.query = query ? extractQuery(query) : {}
        return rota.handler(req,res)
    }
})

server.listen(3030)