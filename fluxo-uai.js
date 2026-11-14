/* UAIcheguei: dados locais demonstrativos; não há servidor nem cobrança real. */
(function(){
const prefixo="uai-demo-";
const exemplo=[{id:1,nome:"X-Bacon especial",preco:29.90,qtd:1,imagem:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=240"},{id:7,nome:"Batata frita",preco:18.90,qtd:1,imagem:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=240"}];
function ler(k,padrao){try{const v=localStorage.getItem(prefixo+k);return v?JSON.parse(v):padrao}catch(e){return padrao}}
function salvar(k,v){try{localStorage.setItem(prefixo+k,JSON.stringify(v))}catch(e){}}
function carrinho(){return ler("carrinho",[])}
function pedidos(){return ler("pedidos",[])}
function moeda(n){return Number(n).toLocaleString("pt-BR",{style:"currency",currency:"BRL"})}
function seguro(s){return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]))}
function subtotal(){return carrinho().reduce((s,p)=>s+p.preco*p.qtd,0)}
function taxa(){return carrinho().length?9.99:0}
function total(){return subtotal()+taxa()}
function add(id){const p=(window.produtosUai||[]).find(x=>x.id===id);if(!p)return false;const lista=carrinho();const achado=lista.find(x=>x.id===id);if(achado)achado.qtd++;else lista.push({id:p.id,nome:p.nome,preco:Number(p.preco.replace(",",".")),qtd:1,imagem:p.imagem});salvar("carrinho",lista);return true}
function alterar(id,d){const lista=carrinho();const p=lista.find(x=>x.id===id);if(!p)return;p.qtd+=d;salvar("carrinho",lista.filter(x=>x.qtd>0))}
function iniciarExemplo(){if(!ler("inicializado",false)){salvar("carrinho",exemplo);salvar("inicializado",true)}}
window.UAI={ler,salvar,carrinho,pedidos,moeda,seguro,subtotal,taxa,total,add,alterar,iniciarExemplo};
})();
