
const pesquisa = document.getElementById("pesquisa") //INPUT DO FORM
const descricao = document.getElementById("marca")
const categoria = document.getElementById("categoria")
const preco = document.getElementById("preco")
const quantidade = document.getElementById("quantidade")
const resultadodapesquisa = document.getElementById("resultadodapesquisa")
const imgresultado = document.getElementById("imgresultado")
let pos_produto = 0
let max_itens = 0
function pesquisar() {
    pos_produto=0
    pesquisar_eletrodomestico(pesquisa.value,pos_produto)

}

async function pesquisar_eletrodomestico(pesquisa, pos) {
    const url = await ( await fetch(`https://dummyjson.com/products/search?q=${pesquisa}`)).json()
    
    // console.log(url);
    resultadodapesquisa.innerHTML=`item: ${url.products[pos].title}`
    descricao.innerHTML=`marca: ${ url.products[pos].brand}`
    categoria.innerHTML=` ${ url.products[pos].category}`
    preco.innerHTML=`R$: ${ url.products[pos].price}`
    quantidade.innerHTML=`quantidade: ${ url.products[pos].availabilityStatus}`
    // console.log(url.products)
    imgresultado.src = url.products[pos].images[0]
    // console.log(url.products.length);
    max_itens = url.products.length
}

pesquisar_eletrodomestico("phone",pos_produto)

function avancar()
{
    
    
    pos_produto < max_itens-1? pos_produto+=1 : max_itens
    if(pesquisa.value)
    {
        pesquisar_eletrodomestico(pesquisa.value,pos_produto)
    }
    else
    {
        pesquisar_eletrodomestico("phone",pos_produto)
    }
    console.log(pos_produto);
}
function voltar()
{
    pos_produto > 0 ? pos_produto -= 1 : 0
    if(pesquisa.value)
    {
        pesquisar_eletrodomestico(pesquisa.value,pos_produto)
    }
    else
    {
        pesquisar_eletrodomestico("phone",pos_produto)
    }
}