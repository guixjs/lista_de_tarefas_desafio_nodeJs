export function construirRota(path){
    const parametrosDaRota = /:([a-zA-Z]+)/g
    const caminhoComParametros = path.replaceAll(parametrosDaRota, '(?<$1>[a-z0-9\-_]+)')
    const caminhoFormatado = new RegExp(`^${caminhoComParametros}(?<query>\\?(.*))?$`)
    return caminhoFormatado
}