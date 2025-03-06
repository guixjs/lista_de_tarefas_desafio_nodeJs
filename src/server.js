import http from 'node:http'

const server = http.createServer((req, res)=>{
    return res.end('Ola mundo!')
})

server.listen(3030)