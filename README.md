# UAIcheguei

Site de delivery com identidade mineira, desenvolvido com HTML e CSS. O JavaScript é utilizado somente nas telas de login e cadastro.

## Estrutura

```text
UAIcheguei/
├── index.html               Página inicial
├── *.html                   Demais páginas públicas e painéis
├── estilos/
│   ├── global/              Cabeçalhos, rodapés, cores e responsividade
│   ├── paginas/             Estilos específicos de cada página
│   └── paineis/             Estilos das intranets
├── imagens/                     Logo, pratos e marcas dos restaurantes
├── javascript/
│   └── acesso-local.js      Login e avisos do cadastro
├── .editorconfig            Padrões de formatação do editor
└── README.md                Documentação
```

A tela `cadastro.html` usa `estilos/telas/cadastro.css`. A página `senha.html` volta ao login, sem modificar senhas. Os painéis são `cliente.html`, `admin.html`, `restaurante.html` e `entregador.html`.

Os HTML permanecem na raiz para **preservar as URLs já usadas no GitHub Pages**, inclusive links diretos de categorias, produtos e intranets. Não existe pasta `pages/` porque a mudança exigiria alterar os endereços públicos.

Arquivos com nomes históricos, como `estilos/geral/dados-demo.css` e `estilos/telas/acesso-novo.css`, permanecem porque são carregados pelas páginas e podem influenciar o visual.

## Edição

Abra `index.html` ou acesse o site pelo GitHub Pages. Os arquivos HTML continuam na raiz para manter as URLs simples.

Ao alterar o visual, edite os CSS existentes. **A ordem dos links para folhas de estilo no HTML importa**: não mude essa ordem sem testar o resultado. Mantenha os links entre páginas como caminhos relativos e não duplique ações nos menus.

## Sobre as contas

O login utiliza apenas condições simples (`if` e `else if`) para direcionar as quatro contas predefinidas às respectivas páginas. Não existe sessão, autorização no servidor ou cadastro persistente nessa implementação. A página de cadastro valida a confirmação da senha e informa que a criação de novas contas requer um servidor. A recuperação apenas retorna ao login, sem redefinir senhas. **Não use dados pessoais ou senhas reais nesse fluxo.**
