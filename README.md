🍔 UAI CHEGUEI — Cardápio & Delivery
UAI CHEGUEI é uma aplicação web completa (Single Page Application - SPA) desenvolvida em arquivo único (HTML/CSS/JS) que simula um ecossistema completo de delivery de comida. O sistema possui diferentes níveis de acesso, oferecendo funcionalidades específicas para Clientes, Restaurantes e Administradores.

🚀 Funcionalidades
O sistema baseia-se em um controle de perfis de usuário, em que cada tipo de conta tem acesso a uma "intranet" diferente após o login.

🔐 Sistema de Autenticação Geral
Cadastro de Usuários: Criação de contas com persistência no localStorage do navegador.

Login/Logout: Validação de credenciais e direcionamento automático para o painel correto segundo o perfil.

Recuperação de Senha: Interface de simulação para redefinição de credenciais.

🛒 Painel do Cliente
Cardápio Dinâmico: Visualização dos pratos disponíveis na região.

Favoritos (❤️): Sistema de marcação de pratos favoritos.

Carrinho de Compras: Adição/remoção de pratos com cálculo automático de subtotal, taxa de entrega e total.

Checkout: Finalização de pedidos que são enviados em tempo real para o painel do restaurante.

🏪 Painel do Restaurante (Gestão Interativa)
Fila de Pedidos: Visualização em tempo real dos pedidos recebidos com acompanhamento de status (Em Produção, Enviado, Entregue).

Gestão de Cardápio: Adição de novos pratos (com URL de imagem, nome e preço) e remoção de itens do catálogo.

⚙️ Painel Administrativo (Backoffice)
Dashboard (KPIs): Indicadores de desempenho automáticos mostrando faturamento total, volume de pedidos, pratos cadastrados e alertas de estoque crítico.

Controle de Estoque: Gestão de insumos com botões de entrada/saída (+/-) e alertas visuais de reposição (cores dinâmicas baseadas na quantidade mínima).

Emissão de NF-e: Módulo para gerar Notas Fiscais a partir dos pedidos registrados no sistema, com histórico de notas emitidas.

Recursos Humanos (RH): Listagem de funcionários, cargos, salários base e status de pagamento.

🛠️ Tecnologias Utilizadas
O projeto foi construído sem o uso de frameworks externos, focando nos fundamentos da web:

HTML5: Estruturação semântica da aplicação.

CSS3: Estilização baseada em variáveis (:root), Flexbox e CSS Grid para responsividade.

Vanilla JavaScript (ES6+): Lógica de negócios, manipulação dinâmica do DOM (DOM API) e gerenciamento de estado da aplicação.

LocalStorage: Utilizado para persistência de dados das contas de usuário.

⚙️ Como Executar o Projeto
Como o projeto é totalmente Client-Side e contido em um único arquivo, não é necessária nenhuma instalação ou configuração de servidor.

Faça o download ou clone o código do projeto.

Salve o código em um arquivo chamado index.html.

Dê um duplo clique no arquivo index.html para abri-lo no seu navegador padrão (Google Chrome, Firefox, Edge, Safari, etc.).

Para testar:

Na tela de login, clique em "Não tem uma conta?".

Crie uma conta escolhendo o perfil desejado (Cliente, Restaurante ou Administrador).

Faça o login para explorar as funcionalidades do painel escolhido!

Nota: Para alternar entre as visões, basta clicar em "Sair" no canto superior direito e logar com uma conta de perfil diferente.

🗃️ Estrutura de Dados (Mock)
A aplicação utiliza um objeto central chamado DADOS no JavaScript para armazenar temporariamente na memória as informações da sessão. Ao recarregar a página, os seguintes dados padrão (mock) são restaurados:

Pratos e imagens de exemplo.

Pedidos iniciais.

Tabela de insumos (Massa, Queijo, etc.) para controle de estoque.

Lista de funcionários.

Obs: Apenas as contas de usuário criadas na tela de cadastro permanecem salvas ao atualizar a página, graças ao localStorage.

🔮 Melhorias Futuras Planejadas
Caso deseje expandir o projeto, aqui estão algumas ideias de evolução:

[ ] Integrar persistência completa (salvar pedidos, cardápio e estoque no localStorage ou banco de dados via API).

[ ] Implementar responsividade mobile aprimorada no Backoffice.

[ ] Adicionar sistema de busca e filtros de categorias no painel do cliente.

[ ] Criar modal de confirmação antes de excluir pratos ou aprovar a emissão de NF-e.
