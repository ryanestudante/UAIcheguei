const fundoLogin = document.getElementById("fundo-login");
const fecharLogin = document.getElementById("fechar-login");
let ultimoLink = null;

function abrirLogin(evento) {
    evento.preventDefault();
    ultimoLink = evento.currentTarget;
    fundoLogin.hidden = false;
    document.body.classList.add("login-aberto");
    document.getElementById("login-cpf").focus();
}
function esconderLogin() {
    fundoLogin.hidden = true;
    document.body.classList.remove("login-aberto");
    if (ultimoLink) ultimoLink.focus();
}
document.querySelectorAll("[data-abrir-login]").forEach(function(link) {
    link.addEventListener("click", abrirLogin);
});
fecharLogin.addEventListener("click", esconderLogin);
fundoLogin.addEventListener("click", function(evento) {
    if (evento.target === fundoLogin) esconderLogin();
});
document.addEventListener("keydown", function(evento) {
    if (evento.key === "Escape" && !fundoLogin.hidden) esconderLogin();
});
document.getElementById("form-login").addEventListener("submit", function(evento) {
    evento.preventDefault();
    document.getElementById("erro-login").textContent = "Para continuar o login demonstrativo, use a página de login.";
    window.location.href = "login.html";
});
