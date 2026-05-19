
const pesquisa = document.getElementById("pesquisa") //INPUT DO FORM
const descricao = document.getElementById("descricao")
const resultadodapesquisa = document.getElementById("resultadodapesquisa")

function pesquisar() {
    
    pesquisar_eletrodomestico(pesquisa.value)

}

async function pesquisar_eletrodomestico(pesquisa) {
    const url = await ( await fetch(`https://dummyjson.com/products/search?q=${pesquisa}`)).json()
   
    console.log(url);
    resultadodapesquisa.innerHTML=`item: ${url.products[0].title}`
    descricao.innerHTML=`preço ${ url.products[0].price}`
}

