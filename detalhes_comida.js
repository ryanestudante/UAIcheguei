const id = Number(new URLSearchParams(window.location.search).get("id"));
const produto = window.produtosUai.find(function(item){return item.id === id});
if (!produto) {
    document.getElementById("detalhe-produto").innerHTML = '<div class="detalhe-erro"><h1>Comida não encontrada</h1><p>Escolha um produto na página de ofertas.</p><a class="botao-primario" href="ofertas.html">Voltar para ofertas</a></div>';
} else {
    document.title = produto.nome + " | UAIcheguei";
    document.getElementById("detalhe-imagem").src = produto.imagem;
    document.getElementById("detalhe-imagem").alt = produto.nome;
    document.getElementById("detalhe-categoria").textContent = produto.categoria.toUpperCase();
    document.getElementById("detalhe-nome").textContent = produto.nome;
    document.getElementById("detalhe-resumo").textContent = produto.resumo;
    document.getElementById("detalhe-anterior").textContent = "R$ " + produto.anterior;
    document.getElementById("detalhe-preco").textContent = "R$ " + produto.preco;
    document.getElementById("detalhe-desconto").textContent = "-" + produto.desconto + "%";
    document.getElementById("detalhe-descricao").textContent = produto.descricao;
}
