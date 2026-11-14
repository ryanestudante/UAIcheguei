const baseRestaurantes=["Cantinho Mineiro","Pizzaria da Vila","Estação do Hambúrguer","Sabor da Massa","Doce Trem","Tempero da Casa"];const baseProdutos=[{nome:"X-Bacon especial",preco:29.90},{nome:"Pizza de calabresa",preco:39.90},{nome:"Massa especial",preco:25.90}];function lista(chave,padrao){const v=UAI.ler(chave,null);if(v!==null)return v;UAI.salvar(chave,padrao);return padrao}function tabela(cab,linhas){return '<div style="overflow-x:auto"><table class="uai-tabela"><thead><tr>'+cab.map(x=>'<th>'+x+'</th>').join("")+'</tr></thead><tbody>'+linhas.join("")+'</tbody></table></div>'}function desenhar(){const pedidos=UAI.pedidos();const total=pedidos.reduce((s,p)=>s+p.total,0);document.getElementById("estatisticas").innerHTML=[["Pedidos",pedidos.length],["Vendas simuladas",UAI.moeda(total)],["Restaurantes",lista("restaurantes",baseRestaurantes).length],["Produtos",lista("produtos",baseProdutos).length]].map(x=>'<div class="uai-card"><small>'+x[0]+'</small><strong>'+x[1]+'</strong></div>').join("");document.getElementById("pedidos-admin").innerHTML=pedidos.length?tabela(["Pedido","Cliente","Total","Status","Alterar"],pedidos.map(p=>'<tr><td>'+UAI.seguro(p.id)+'</td><td>'+UAI.seguro(p.nome)+'</td><td>'+UAI.moeda(p.total)+'</td><td><span class="uai-status">'+UAI.seguro(p.status)+'</span></td><td><select data-pedido="'+UAI.seguro(p.id)+'">'+["Recebido","Em preparo","Pronto para entrega","Saiu para entrega","Entregue","Cancelado"].map(x=>'<option '+(x===p.status?'selected':'')+'>'+x+'</option>').join("")+'</select></td></tr>')):'<p>Nenhum pedido criado neste navegador.</p>';const clientes=[...new Set(pedidos.map(p=>p.nome))];document.getElementById("clientes-admin").innerHTML=clientes.length?clientes.map(x=>'<p>'+UAI.seguro(x)+'</p>').join(""):'<p>Nenhum cliente de demonstração ainda.</p>';document.getElementById("restaurantes-admin").innerHTML=tabela(["Restaurante","Ação"],lista("restaurantes",baseRestaurantes).map((n,i)=>'<tr><td>'+UAI.seguro(n)+'</td><td><button data-remove="restaurantes" data-i="'+i+'">Remover</button></td></tr>'));document.getElementById("produtos-admin").innerHTML=tabela(["Produto","Preço","Ação"],lista("produtos",baseProdutos).map((p,i)=>'<tr><td>'+UAI.seguro(p.nome)+'</td><td>'+UAI.moeda(p.preco)+'</td><td><button data-remove="produtos" data-i="'+i+'">Remover</button></td></tr>'));document.getElementById("cupons-admin").innerHTML=tabela(["Cupom","Desconto","Ação"],lista("cupons",[]).map((p,i)=>'<tr><td>'+UAI.seguro(p.codigo)+'</td><td>'+p.desconto+'%</td><td><button data-remove="cupons" data-i="'+i+'">Remover</button></td></tr>'));document.getElementById("relatorios-admin").innerHTML='<p>Pedidos totais: <strong>'+pedidos.length+'</strong></p><p>Pedidos entregues: <strong>'+pedidos.filter(p=>p.status==="Entregue").length+'</strong></p><p>Valor total demonstrativo: <strong>'+UAI.moeda(total)+'</strong></p><p>Estes valores não representam vendas reais.</p>'}document.addEventListener("change",e=>{if(!e.target.matches("[data-pedido]"))return;const pedidos=UAI.pedidos();const p=pedidos.find(x=>x.id===e.target.dataset.pedido);if(p){p.status=e.target.value;UAI.salvar("pedidos",pedidos);desenhar()}});document.addEventListener("click",e=>{const b=e.target.closest("[data-remove]");if(!b)return;const key=b.dataset.remove;const v=lista(key,[]);v.splice(Number(b.dataset.i),1);UAI.salvar(key,v);desenhar()});[["form-restaurante","restaurantes"],["form-produto","produtos"],["form-cupom","cupons"]].forEach(([id,key])=>{document.getElementById(id).addEventListener("submit",e=>{e.preventDefault();const f=new FormData(e.target);const v=lista(key,[]);if(key==="restaurantes")v.push(String(f.get("nome")).trim());if(key==="produtos")v.push({nome:String(f.get("nome")).trim(),preco:Number(f.get("preco"))});if(key==="cupons")v.push({codigo:String(f.get("codigo")).trim().toUpperCase(),desconto:Number(f.get("desconto"))});UAI.salvar(key,v);e.target.reset();desenhar()})});desenhar();

/* Navegacao por abas, busca e resumo de pedidos */
function abrirAba(aba){
 const alvo=document.getElementById(aba);
 if(!alvo||!alvo.classList.contains("adm-secao"))aba="dashboard";
 document.querySelectorAll(".adm-secao").forEach(el=>el.hidden=el.id!==aba);
 document.querySelectorAll(".adm-nav a[data-aba]").forEach(el=>{
  const ativo=el.dataset.aba===aba;
  el.classList.toggle("ativo",ativo);
  if(ativo)el.setAttribute("aria-current","page");else el.removeAttribute("aria-current");
 });
}
document.querySelectorAll(".adm-nav a[data-aba]").forEach(a=>a.addEventListener("click",()=>abrirAba(a.dataset.aba)));
document.querySelectorAll("[data-navegar]").forEach(b=>b.addEventListener("click",()=>{location.hash=b.dataset.navegar;abrirAba(b.dataset.navegar)}));
window.addEventListener("hashchange",()=>abrirAba(location.hash.slice(1)));
function atualizarRecentes(){
 const pedidos=UAI.pedidos().slice(0,5);
 document.getElementById("pedidos-recentes").innerHTML=pedidos.length?
 tabela(["Pedido","Cliente","Valor","Status"],pedidos.map(p=>'<tr><td>'+UAI.seguro(p.id)+'</td><td>'+UAI.seguro(p.nome)+'</td><td>'+UAI.moeda(p.total)+'</td><td><span class="uai-status">'+UAI.seguro(p.status)+'</span></td></tr>')):
 '<p>Nenhum pedido por enquanto. Faça um pedido demonstrativo na área do cliente para vê-lo aqui.</p>';
}
const desenharOriginal=desenhar;
desenhar=function(){desenharOriginal();atualizarRecentes();filtrarPedidos()};
function filtrarPedidos(){
 const busca=document.getElementById("busca-pedidos").value.toLocaleLowerCase("pt-BR");
 const filtro=document.getElementById("filtro-pedidos").value;
 document.querySelectorAll("#pedidos-admin tbody tr").forEach(tr=>{
  const texto=tr.textContent.toLocaleLowerCase("pt-BR");
  const status=tr.querySelector(".uai-status")?.textContent||"";
  tr.hidden=!(texto.includes(busca)&&(!filtro||status===filtro));
 });
}
document.getElementById("busca-pedidos").addEventListener("input",filtrarPedidos);
document.getElementById("filtro-pedidos").addEventListener("change",filtrarPedidos);
document.addEventListener("click",e=>{
 const b=e.target.closest("button[data-remove]");
 if(b&&!confirm("Remover este registro fictício?")){e.stopImmediatePropagation();e.preventDefault()}
},true);
abrirAba(location.hash.slice(1)||"dashboard");
desenhar();
