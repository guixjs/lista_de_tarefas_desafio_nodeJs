import fs from 'node:fs/promises'
const caminhoDB = new URL('../db.json', import.meta.url)


export class Database{
    
    #database = {}

    constructor(){
        fs.readFile(caminhoDB,'utf8').then(data=>{
            this.#database = JSON.parse(data)
        })
        .catch(()=>{
            this.#gravarNoArquivo()
        })
    }

    #gravarNoArquivo(){
        fs.writeFile(caminhoDB,JSON.stringify(this.#database))
    }

    metodoSelect(tabela){
        let data = this.#database[tabela] ?? []
        return data
    }

    metodoInsert(tabela,data){
        if(Array.isArray(this.#database[tabela])){
                this.#database[tabela].push(data)
            }else{
                this.#database[tabela] = [data]
            }
    
            this.#gravarNoArquivo()
            return data;
        }
    metodoDelete(tabela, id){
        const indexEncontrado = this.#database[tabela].findIndex(linha=>linha.id === id)

        if(indexEncontrado> -1){
            this.#database[tabela].splice(indexEncontrado)
            this.#gravarNoArquivo
        }
    }
    
    metodoUpdate(tabela, id, novosDados){
        const indexEncontrado = this.#database[tabela].findIndex(linha=>linha.id === id)

        if(indexEncontrado> -1){
            this.#database[tabela][indexEncontrado] = {id, ...novosDados}
            this.#gravarNoArquivo
        }
    }
}