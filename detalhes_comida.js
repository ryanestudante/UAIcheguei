const id = Number(new URLSearchParams(window.location.search).get("id"));
const produtos = Array.isArray(window.produtosUai) ? window.produtosUai : [];
const produto = produtos.find(function(item){ return item.id === id; });
const porcoes = {Pizzas:"Pizza para compartilhar",Lanches:"1 lanche",Massas:"1 prato",Sobremesas:"1 sobremesa",Porções:"1 porção",Japonesa:"1 combinado",Saudáveis:"1 prato",Refeições:"1 refeição"};
function texto(id, valor) { const el = document.getElementById(id); if(el) el.textContent = valor; }
function dinheiro(valor) { return Number(valor.replace(",", ".")); }
if (!produto) {
    document.getElementById("detalhe-produto").innerHTML = '<div class="detalhe-erro"><h1>Comida não encontrada</h1><p>Escolha um produto na página de ofertas.</p><a class="botao-primario" href="ofertas.html">← Voltar para ofertas</a></div>';
    document.querySelector(".mais-opcoes").hidden = true;
} else {
    document.title = produto.nome + " | UAIcheguei";
    document.getElementById("detalhe-imagem").src = produto.imagem;
    document.getElementById("detalhe-imagem").alt = produto.nome;
    texto("nome-trilha",produto.nome);
    texto("detalhe-categoria",produto.categoria.toUpperCase());
    texto("detalhe-nome",produto.nome);
    texto("detalhe-resumo",produto.resumo);
    texto("detalhe-anterior","De R$ " + produto.anterior);
    texto("detalhe-preco","R$ " + produto.preco);
    texto("detalhe-desconto","-" + produto.desconto + "%");
    texto("detalhe-descricao",produto.descricao);
    texto("detalhe-ingredientes",produto.descricao);
    texto("detalhe-porcao",porcoes[produto.categoria] || "1 porção");
    const economia = Math.max(0,dinheiro(produto.anterior)-dinheiro(produto.preco));
    texto("detalhe-economia","Economize R$ " + economia.toFixed(2).replace(".", ",") + " nesta oferta");
    const sugestoes = produtos.filter(function(p){return p.id !== produto.id}).sort(function(a,b){
        return Number(b.categoria === produto.categoria) - Number(a.categoria === produto.categoria);
    }).slice(0,3);
    const lista = document.getElementById("sugestoes-comidas");
    sugestoes.forEach(function(p){
        const link = document.createElement("a");
        link.className = "card-produto card-link sugestao-link";
        link.href = "detalhes_comida.html?id=" + p.id;
        const img = document.createElement("img");
        img.src = p.imagem; img.alt = p.nome; img.loading = "lazy";
        const corpo = document.createElement("div"); corpo.className = "card-corpo";
        const tipo = document.createElement("span"); tipo.className = "mini-label"; tipo.textContent = p.categoria.toUpperCase();
        const nome = document.createElement("h3"); nome.textContent = p.nome;
        const preco = document.createElement("strong"); preco.className = "sugestao-preco"; preco.textContent = "R$ " + p.preco;
        const ver = document.createElement("span"); ver.className = "sugestao-ver"; ver.textContent = "Ver detalhes →";
        corpo.append(tipo,nome,preco,ver); link.append(img,corpo); lista.append(link);
    });
}

const botaoAdicionar=document.getElementById("adicionar-carrinho");if(botaoAdicionar&&produto){botaoAdicionar.addEventListener("click",()=>{if(UAI.add(produto.id))window.location.href="carrinho.html"})}
