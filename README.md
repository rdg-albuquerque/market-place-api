
# API - Market place 🏪

## Resumo da API
Rest API que fiz em um dos desafios no curso da Cubos Academy. Algumas das principais características:
* CRUD de usuários e produtos com banco de dados relacional(PostgreSQL), utilizando query builder(knex).
* Cadastro de usuários com criptografia de senha(bcrypt)
* Login de autenticação e geração de token(jwt)
* CRUD de produtos e atualizações do perfil do usuário com rotas protegidas por autênticação(Token requerido).
* Validações do body das requisições com a biblioteca YUP.
* Upload e delete de imagens no servidor de armazenamento da supabase, gerando url pública da imagem.
* Envio de e-mail no ato de cadastro de novos usuários com template .handlebars
* Variáveis de ambiente para ocultamento de informações sensíveis.
* Deployment e banco de dados na heroku.
### Quer consumir a API ? Fique a vontade para testar ! 👇

Documentação swagger: https://market-place-cubos.herokuapp.com/docs/
