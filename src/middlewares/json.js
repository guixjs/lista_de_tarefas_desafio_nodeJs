//middlewares são "mediadores", que fazem funções intermediarias entre as requisicoes 
export async function json(req, res){
    const buffer = []
    for await(const chunk of req ){
        buffer.push(chunk)
    }
    try{
        req.body = JSON.parse(Buffer.concat(buffer).toString())
    }catch{
        req.body = null
    }

    res.setHeader("Content-type", "aplicattion/json")
}