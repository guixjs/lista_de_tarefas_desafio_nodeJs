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

    metodoSelect(tabela,search){
        let data = this.#database[tabela] ?? []

        if(search){
            data = data.filter(linha=>{
                return Object.entries(search).some(([key,value])=>{
                    return linha[key].toLowerCase().includes(value.toLowerCase())
                })
            })
        }
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
        const data = this.#database[tabela] ?? [];
        const index = data.findIndex(item => item.id === id);

        if (index === -1) {
            return null; // Retorna null se a tarefa não for encontrada
        }
    
        // Mantém a data de criação original e só atualiza os campos recebidos
        this.#database[tabela][index] = {
            ...data[index], // Mantém os dados antigos
            ...novosDados,  // Atualiza apenas os novos dados recebidos
            updated_at: new Date().toISOString().split('T')[0] // Atualiza a data de modificação
        };
    
        this.#gravarNoArquivo();
        return this.#database[tabela][index]; // Retorna a tarefa atualizada
    }
}