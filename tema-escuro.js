(function(){
    const chave="uaicheguei-tema";
    let tema="claro";
    try{tema=localStorage.getItem(chave)==="escuro"?"escuro":"claro"}catch(e){}
    document.documentElement.setAttribute("data-tema",tema);
    function iniciar(){
        if(document.getElementById("botao-tema-uai"))return;
        const botao=document.createElement("button");
        botao.type="button";botao.id="botao-tema-uai";botao.className="botao-tema-uai";
        function atualizar(){
            const escuro=document.documentElement.getAttribute("data-tema")==="escuro";
            botao.textContent=escuro?"☀️ Modo claro":"🌙 Modo escuro";
            botao.setAttribute("aria-label",escuro?"Ativar modo claro":"Ativar modo escuro");
            botao.setAttribute("aria-pressed",String(escuro));
        }
        botao.addEventListener("click",function(){
            const atual=document.documentElement.getAttribute("data-tema");
            const novo=atual==="escuro"?"claro":"escuro";
            document.documentElement.setAttribute("data-tema",novo);
            try{localStorage.setItem(chave,novo)}catch(e){}
            atualizar();
        });
        document.body.appendChild(botao);atualizar();
    }
    if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",iniciar);else iniciar();
})();
