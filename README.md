# UAIcheguei

Site de delivery com identidade mineira, desenvolvido com HTML e CSS. O JavaScript é utilizado somente nas telas de login e cadastro.

## Estrutura

- `index.html`: página inicial para visitantes.
- `login.html` e `cadastro.html`: acesso e criação de conta.
- `senha.html`: página estática que direciona de volta ao login, sem redefinir a senha.
- `cliente.html`: página principal do cliente.
- `admin.html`, `restaurante.html` e `entregador.html`: painéis.
- Demais arquivos `.html` na raiz: categorias, produtos e fluxo de pedidos.
- `css/global/`: estilos compartilhados, cabeçalhos, rodapés e responsividade.
- `css/paginas/`: estilos específicos das páginas.
- `css/paineis/`: estilos dos painéis de administração, restaurante e entregador.
- `js/acesso-local.js`: lógica local das telas de acesso.
- `img/`: imagens e logotipo.

## Edição

Abra `index.html` ou acesse o site pelo GitHub Pages. Os arquivos HTML continuam na raiz para manter as URLs simples.

Ao alterar o visual, edite os CSS existentes. **A ordem dos links para folhas de estilo no HTML importa**: não mude essa ordem sem testar o resultado. Mantenha os links entre páginas como caminhos relativos e não duplique ações nos menus.

## Sobre as contas

O login utiliza apenas condições simples (`if` e `else if`) para direcionar as quatro contas predefinidas às respectivas páginas. Não existe sessão, autorização no servidor ou cadastro persistente nessa implementação. A página de cadastro valida a confirmação da senha e informa que a criação de novas contas requer um servidor. A recuperação apenas retorna ao login, sem redefinir senhas. **Não use dados pessoais ou senhas reais nesse fluxo.**
