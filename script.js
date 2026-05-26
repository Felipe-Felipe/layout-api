const pesquisa = document.getElementById("pesquisa"); //INPUT DO FORM
const descricao = document.getElementById("marca");
const categoria = document.getElementById("categoria");
const preco = document.getElementById("preco");
const quantidade = document.getElementById("quantidade");
const resultadodapesquisa = document.getElementById("resultadodapesquisa");
const imgresultado = document.getElementById("imgresultado");
let pos_produto = 0;
let max_itens = 0;

function pesquisar() {
  pos_produto = 0;
  pesquisar_eletrodomestico(pesquisa.value, pos_produto);
}

async function pesquisar_eletrodomestico(termoBusca, pos) {
  let pesquisaConcluida = termoBusca;
  let url = "";
  if (!isNaN(pesquisaConcluida) && pesquisaConcluida.trim() !== "") {
    url = `https://dummyjson.com/products/${pesquisaConcluida}`;
  } else {
    url = `https://dummyjson.com/products/search?q=${pesquisaConcluida}`;
  }

  try {
    const resposta = await fetch(url);
    let dados = await resposta.json();

    if (!dados.products) {
      dados = { products: [dados] };
    }

    resultadodapesquisa.innerHTML = `item: ${dados.products[pos].title}`;
    descricao.innerHTML = `marca: ${dados.products[pos].brand || "Sem Marca"}`;
    categoria.innerHTML = ` ${dados.products[pos].category}`;
    preco.innerHTML = `R$: ${dados.products[pos].price}`;
    quantidade.innerHTML = `quantidade: ${dados.products[pos].availabilityStatus}`;
    imgresultado.src = dados.products[pos].images[0];
    max_itens = dados.products.length;
  } catch (erro) {
    alert("Produto não encontrado, exibindo resultados para 'phone'");
    pos_produto = 0;
    pesquisar_eletrodomestico("phone", 0);
  }
}

pesquisar_eletrodomestico("phone", pos_produto);

function avancar() {
  pos_produto < max_itens - 1 ? (pos_produto += 1) : pos_produto;
  if (pesquisa.value) {
    pesquisar_eletrodomestico(pesquisa.value, pos_produto);
  } else {
    pesquisar_eletrodomestico("phone", pos_produto);
  }
  console.log(pos_produto);
}

function voltar() {
  pos_produto > 0 ? (pos_produto -= 1) : 0;
  if (pesquisa.value) {
    pesquisar_eletrodomestico(pesquisa.value, pos_produto);
  } else {
    pesquisar_eletrodomestico("phone", pos_produto);
  }
}

pesquisa.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    pesquisar_eletrodomestico(pesquisa.value, pos_produto);
  }
});
