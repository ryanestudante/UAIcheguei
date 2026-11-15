const formularioLogin = document.getElementById("form-login");

if (formularioLogin) {
    formularioLogin.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const cpf = document.getElementById("cpf").value.replace(/\D/g, "");
        const email = document.getElementById("email").value.trim().toLowerCase();
        const senha = document.getElementById("senha").value;

        if (cpf === "12345678900" && email === "cliente@gmail.com" && senha === "123456") {
            window.location.href = "cliente.html";
        } else if (cpf === "98765432100" && email === "dono@gmail.com" && senha === "123456") {
            window.location.href = "restaurante.html";
        } else if (cpf === "11122233344" && email === "entregador@gmail.com" && senha === "123456") {
            window.location.href = "entregador.html";
        } else if (cpf === "12312312312" && email === "admin@gmail.com" && senha === "123456") {
            window.location.href = "admin.html";
        } else {
            document.getElementById("mensagem").textContent = "CPF, e-mail ou senha não conferem.";
        }
    });
}

const formularioCadastro = document.getElementById("form-cadastro");

if (formularioCadastro) {
    formularioCadastro.addEventListener("submit", function (evento) {
        evento.preventDefault();

        const senha = document.getElementById("senha").value;
        const confirmarSenha = document.getElementById("confirmar-senha").value;

        if (senha !== confirmarSenha) {
            document.getElementById("mensagem").textContent = "As senhas não conferem.";
        } else {
            document.getElementById("mensagem").textContent = "O cadastro de novas contas requer integração com um servidor.";
        }
    });
}
