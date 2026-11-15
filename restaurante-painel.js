(()=>{const key="uaicheguei_restaurante_pedidos_demo_v1";let saved={};try{saved=JSON.parse(localStorage.getItem(key))||{}}catch{}document.querySelectorAll(".rp-select").forEach(select=>{if(saved[select.dataset.pedido])select.value=saved[select.dataset.pedido];select.addEventListener("change",()=>{saved[select.dataset.pedido]=select.value;try{localStorage.setItem(key,JSON.stringify(saved))}catch{}document.getElementById("rp-feedback").textContent="Status do pedido #"+select.dataset.pedido+" atualizado nesta demonstração."})})})();

/* Preferências locais do painel do restaurante */
(()=>{
const form=document.getElementById("rp-form");
if(!form)return;
const key="uaicheguei_restaurante_config_v1";
try{
const dados=JSON.parse(localStorage.getItem(key)||"null");
if(dados){
for(const campo of form.elements){
if(campo.name&&Object.prototype.hasOwnProperty.call(dados,campo.name)){
if(campo.type==="checkbox")campo.checked=!!dados[campo.name];
else campo.value=dados[campo.name];
}}
}
}catch(e){}
form.addEventListener("submit",e=>{
e.preventDefault();
const dados={};
for(const campo of form.elements){
if(!campo.name)continue;
dados[campo.name]=campo.type==="checkbox"?campo.checked:campo.value;
}
const aviso=document.getElementById("rp-config-feedback");
try{
localStorage.setItem(key,JSON.stringify(dados));
aviso.textContent="Configurações salvas neste navegador. A publicação para clientes exige integração com o sistema.";
}catch(e){aviso.textContent="Não foi possível salvar as configurações neste navegador.";}
});
})();
