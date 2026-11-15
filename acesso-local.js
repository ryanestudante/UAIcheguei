const CHAVE_CONTAS = "uaicheguei_contas_demo_v2";
const CHAVE_SESSAO = "uaicheguei_sessao_demo_v2";

function lerContas() {
    try {
        const contas = JSON.parse(localStorage.getItem(CHAVE_CONTAS) || "[]");
        return Array.isArray(contas) ? contas : [];
    } catch {
        return [];
    }
}

function mostrarAviso(texto, sucesso = false) {
    const aviso = document.getElementById("mensagem");
    if (!aviso) return;
    aviso.textContent = texto;
    aviso.classList.toggle("sucesso", sucesso);
}

function converterHex(bytes) {
    return Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
}

function criarCodigo(tamanho) {
    const bytes = new Uint8Array(tamanho);
    crypto.getRandomValues(bytes);
    return converterHex(bytes);
}

async function protegerSegredo(segredo, sal) {
    const codificador = new TextEncoder();
    const chave = await crypto.subtle.importKey(
        "raw",
        codificador.encode(segredo),
        "PBKDF2",
        false,
        ["deriveBits"]
    );
    const bytesSal = new Uint8Array(sal.match(/.{2}/g).map(parte => parseInt(parte, 16)));
    const hash = await crypto.subtle.deriveBits(
        { name: "PBKDF2", hash: "SHA-256", salt: bytesSal, iterations: 120000 },
        chave,
        256
    );
    return converterHex(new Uint8Array(hash));
}

function validarAmbiente() {
    if (window.crypto && crypto.subtle && window.localStorage) return true;
    mostrarAviso("Abra o site em HTTPS, em um navegador atualizado, para usar o acesso demonstrativo.");
    return false;
}

const formularioCadastro = document.getElementById("form-cadastro");

if (formularioCadastro) {
    formularioCadastro.addEventListener("submit", async evento => {
        evento.preventDefault();
        if (!validarAmbiente()) return;

        const nome = document.getElementById("nome").value.trim();
        const email = document.getElementById("email").value.trim().toLowerCase();
        const senha = document.getElementById("senha").value;
        const confirmar = document.getElementById("confirmar-senha").value;
        const botao = formularioCadastro.querySelector("button[type='submit']");

        if (nome.length < 2) {
            mostrarAviso("Digite seu nome para continuar.");
            return;
        }
        if (senha.length < 8) {
            mostrarAviso("Crie uma senha de pelo menos 8 caracteres.");
            return;
        }
        if (senha !== confirmar) {
            mostrarAviso("As duas senhas não são iguais.");
            return;
        }

        const contas = lerContas();
        if (contas.some(conta => conta.email === email)) {
            mostrarAviso("Esse e-mail já foi cadastrado neste navegador. Faça login.");
            return;
        }

        botao.disabled = true;
        try {
            const sal = criarCodigo(16);
            const salRecuperacao = criarCodigo(16);
            const codigo = criarCodigo(12).toUpperCase();
            const hashSenha = await protegerSegredo(senha, sal);
            const hashRecuperacao = await protegerSegredo(codigo, salRecuperacao);

            contas.push({
                nome,
                email,
                sal,
                hashSenha,
                salRecuperacao,
                hashRecuperacao
            });
            localStorage.setItem(CHAVE_CONTAS, JSON.stringify(contas));
            document.getElementById("codigo-recuperacao").textContent = codigo.match(/.{1,4}/g).join("-");
            formularioCadastro.hidden = true;
            document.getElementById("cadastro-concluido").hidden = false;
            mostrarAviso("");
        } catch {
            mostrarAviso("Não foi possível salvar a conta neste navegador. Confira o armazenamento do site.");
        } finally {
            botao.disabled = false;
        }
    });
}

const formularioLogin = document.getElementById("form-login");

if (formularioLogin) {
    formularioLogin.addEventListener("submit", async evento => {
        evento.preventDefault();
        if (!validarAmbiente()) return;

        const email = document.getElementById("email").value.trim().toLowerCase();
        const senha = document.getElementById("senha").value;
        const botao = formularioLogin.querySelector("button[type='submit']");
        const conta = lerContas().find(item => item.email === email);

        if (!conta) {
            mostrarAviso("Conta não encontrada neste navegador. Crie uma conta primeiro.");
            return;
        }

        botao.disabled = true;
        try {
            const hash = await protegerSegredo(senha, conta.sal);
            if (hash !== conta.hashSenha) {
                mostrarAviso("Senha incorreta. Tente novamente.");
                return;
            }

            sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify({
                nome: conta.nome,
                email: conta.email,
                entrada: Date.now()
            }));
            window.location.href = "cliente.html";
        } catch {
            mostrarAviso("Não foi possível entrar. Tente novamente.");
        } finally {
            botao.disabled = false;
        }
    });
}

const formularioRecuperacao = document.getElementById("form-recuperacao");

if (formularioRecuperacao) {
    formularioRecuperacao.addEventListener("submit", async evento => {
        evento.preventDefault();
        if (!validarAmbiente()) return;

        const email = document.getElementById("email").value.trim().toLowerCase();
        const codigo = document.getElementById("codigo").value.replace(/[^a-fA-F0-9]/g, "").toUpperCase();
        const novaSenha = document.getElementById("senha").value;
        const confirmar = document.getElementById("confirmar-senha").value;
        const contas = lerContas();
        const conta = contas.find(item => item.email === email);
        const botao = formularioRecuperacao.querySelector("button[type='submit']");

        if (novaSenha.length < 8) {
            mostrarAviso("A nova senha precisa ter pelo menos 8 caracteres.");
            return;
        }
        if (novaSenha !== confirmar) {
            mostrarAviso("As duas senhas não são iguais.");
            return;
        }
        if (!conta || codigo.length !== 24) {
            mostrarAviso("Conta ou código de recuperação inválido.");
            return;
        }

        botao.disabled = true;
        try {
            const hashCodigo = await protegerSegredo(codigo, conta.salRecuperacao);
            if (hashCodigo !== conta.hashRecuperacao) {
                mostrarAviso("Código de recuperação incorreto.");
                return;
            }

            conta.sal = criarCodigo(16);
            conta.hashSenha = await protegerSegredo(novaSenha, conta.sal);
            localStorage.setItem(CHAVE_CONTAS, JSON.stringify(contas));
            formularioRecuperacao.reset();
            mostrarAviso("Senha alterada neste navegador. Volte para o login.", true);
        } catch {
            mostrarAviso("Não foi possível redefinir a senha neste navegador.");
        } finally {
            botao.disabled = false;
        }
    });
}

const painelSessao = document.getElementById("sessao-conta");

if (painelSessao) {
    try {
        const sessao = JSON.parse(sessionStorage.getItem(CHAVE_SESSAO) || "null");
        if (sessao && sessao.nome) {
            document.getElementById("nome-sessao").textContent = sessao.nome;
            painelSessao.hidden = false;
        }
    } catch {
        painelSessao.hidden = true;
    }

    const sair = document.getElementById("sair-conta");
    sair.addEventListener("click", () => {
        sessionStorage.removeItem(CHAVE_SESSAO);
        window.location.href = "principal.html";
    });
}
