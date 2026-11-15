const CHAVE_CONTAS = "uaicheguei_contas_demo_v2";
const CHAVE_SESSAO = "uaicheguei_sessao_demo_v2";

if (document.getElementById("form-login") && new URLSearchParams(window.location.search).has("logout")) {
    sessionStorage.removeItem(CHAVE_SESSAO);
}

const CONTAS_PADRAO = [
    {
        cpf: "12345678900",
        email: "cliente@gmail.com",
        senha: "123456",
        nome: "Cliente",
        pagina: "cliente.html"
    },
    {
        cpf: "98765432100",
        email: "dono@gmail.com",
        senha: "123456",
        nome: "Restaurante",
        pagina: "restaurante.html"
    },
    {
        cpf: "11122233344",
        email: "entregador@gmail.com",
        senha: "123456",
        nome: "Entregador",
        pagina: "entregador.html"
    },
    {
        cpf: "12312312312",
        email: "admin@gmail.com",
        senha: "123456",
        nome: "Administrador",
        pagina: "admin.html"
    }
];

function somenteNumeros(valor) {
    return String(valor || "").replace(/\D/g, "");
}

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

    mostrarAviso("Abra o site em HTTPS, em um navegador atualizado, para usar o login e o cadastro.");
    return false;
}

const formularioCadastro = document.getElementById("form-cadastro");

if (formularioCadastro) {
    formularioCadastro.addEventListener("submit", async evento => {
        evento.preventDefault();
        if (!validarAmbiente()) return;

        const nome = document.getElementById("nome").value.trim();
        const cpf = somenteNumeros(document.getElementById("cpf").value);
        const email = document.getElementById("email").value.trim().toLowerCase();
        const senha = document.getElementById("senha").value;
        const confirmar = document.getElementById("confirmar-senha").value;
        const botao = formularioCadastro.querySelector("button[type='submit']");

        if (nome.length < 2) {
            mostrarAviso("Digite seu nome para continuar.");
            return;
        }
        if (cpf.length !== 11) {
            mostrarAviso("Digite um CPF com 11 números.");
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
        if (contas.some(conta => conta.email === email) || CONTAS_PADRAO.some(conta => conta.email === email)) {
            mostrarAviso("Esse e-mail já foi cadastrado neste navegador. Faça login.");
            return;
        }

        if (CONTAS_PADRAO.some(conta => conta.cpf === cpf)) {
            mostrarAviso("Este CPF já está vinculado a outra conta.");
            return;
        }

        botao.disabled = true;
        try {
            for (const conta of contas) {
                if (conta.salCpf && conta.hashCpf && await protegerSegredo(cpf, conta.salCpf) === conta.hashCpf) {
                    mostrarAviso("Este CPF já está cadastrado.");
                    return;
                }
            }
            const salCpf = criarCodigo(16);
            const hashCpf = await protegerSegredo(cpf, salCpf);
            const sal = criarCodigo(16);
            const hashSenha = await protegerSegredo(senha, sal);

            contas.push({
                nome,
                email,
                salCpf,
                hashCpf,
                sal,
                hashSenha
            });
            localStorage.setItem(CHAVE_CONTAS, JSON.stringify(contas));
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

        const cpf = somenteNumeros(document.getElementById("cpf").value);
        const email = document.getElementById("email").value.trim().toLowerCase();
        const senha = document.getElementById("senha").value;
        const botao = formularioLogin.querySelector("button[type='submit']");

        if (cpf.length !== 11) {
            mostrarAviso("Digite um CPF com 11 números.");
            return;
        }

        const contaPadrao = CONTAS_PADRAO.find(conta =>
            conta.cpf === cpf && conta.email === email && conta.senha === senha
        );

        if (contaPadrao) {
            sessionStorage.setItem(CHAVE_SESSAO, JSON.stringify({
                nome: contaPadrao.nome,
                email: contaPadrao.email,
                entrada: Date.now()
            }));
            window.location.href = contaPadrao.pagina;
            return;
        }

        const contas = lerContas();
        const conta = contas.find(item => item.email === email);

        if (!conta) {
            mostrarAviso("CPF, e-mail ou senha não conferem.");
            return;
        }

        botao.disabled = true;
        try {
            const hash = await protegerSegredo(senha, conta.sal);
            if (hash !== conta.hashSenha) {
                mostrarAviso("CPF, e-mail ou senha não conferem.");
                return;
            }

            if (conta.salCpf && conta.hashCpf) {
                const cpfInformado = await protegerSegredo(cpf, conta.salCpf);
                if (cpfInformado !== conta.hashCpf) {
                    mostrarAviso("CPF, e-mail ou senha não conferem.");
                    return;
                }
            } else {
                const cpfJaUsado = CONTAS_PADRAO.some(item => item.cpf === cpf);
                if (cpfJaUsado) {
                    mostrarAviso("CPF já vinculado a outra conta.");
                    return;
                }
                conta.salCpf = criarCodigo(16);
                conta.hashCpf = await protegerSegredo(cpf, conta.salCpf);
                localStorage.setItem(CHAVE_CONTAS, JSON.stringify(contas));
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
