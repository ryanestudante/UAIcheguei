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

As contas deste projeto são locais ao navegador. A página de recuperação apenas leva ao login e não muda a senha. Esta implementação não equivale a uma autenticação com servidor; não utilize dados pessoais ou senhas reais para testes.
