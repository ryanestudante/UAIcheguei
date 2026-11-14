/* Carrosseis: rolagem continua, controles e pausa ao interagir. */
document.querySelectorAll("[data-carrossel]").forEach(function(faixa) {
    const cartoes = Array.from(faixa.children);
    if (cartoes.length < 2) return;
    const secao = faixa.closest("section");
    const anterior = secao && secao.querySelector("[data-anterior]");
    const proximo = secao && secao.querySelector("[data-proximo]");
    function largura() {
        return cartoes[0].getBoundingClientRect().width + (parseFloat(getComputedStyle(faixa).gap) || 16);
    }
    function mover(direcao) {
        const passo = largura();
        const fim = faixa.scrollWidth - faixa.clientWidth;
        if (direcao > 0 && faixa.scrollLeft >= fim - 8) faixa.scrollTo({left:0,behavior:"smooth"});
        else if (direcao < 0 && faixa.scrollLeft <= 8) faixa.scrollTo({left:fim,behavior:"smooth"});
        else faixa.scrollBy({left:passo * direcao,behavior:"smooth"});
    }
    if (anterior) anterior.addEventListener("click",function(){mover(-1)});
    if (proximo) proximo.addEventListener("click",function(){mover(1)});
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let pausa = false;
    faixa.addEventListener("mouseenter",function(){pausa=true});
    faixa.addEventListener("mouseleave",function(){pausa=false});
    faixa.addEventListener("focusin",function(){pausa=true});
    faixa.addEventListener("focusout",function(){pausa=false});
    faixa.addEventListener("touchstart",function(){pausa=true},{passive:true});
    faixa.addEventListener("touchend",function(){setTimeout(function(){pausa=false},3000)},{passive:true});
    setInterval(function(){if(!pausa && !document.hidden)mover(1)},4200);
});
