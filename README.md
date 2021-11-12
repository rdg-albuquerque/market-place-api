
# API - Market place 🏪

## Resumo da API
Rest API que fiz em um dos exercícios práticos no curso da Cubos Academy. Algumas das principais características:
* CRUD de usuários e produtos com banco de dados relacional(PostgreSQL), utilizando query builder(knex).
* Cadastro de usuários com criptografia de senha(bcrypt)
* Login de autenticação e geração de token(jwt)
* CRUD de produtos e atualizações do perfil do usuário com rotas protegidas por autênticação(Token requerido).
* Validações do body das requisições com a biblioteca YUP.
* Upload e delete de imagens no servidor de armazenamento da supabase, gerando url pública da imagem.
* Envio de e-mail no ato de cadastro de novos usuários com template .handlebars
* Variáveis de ambiente para ocultamento de informações sensíveis.
* Deployment e banco de dados na heroku.
### Quer consumir a API ? Tanto API quanto o banco de dados estão na nuvem ! Instruções das rotas 👇

## Rotas de aplicação

### Endpoints de usuário 

<b>[POST] https://market-place-cubos.herokuapp.com/usuarios</b>

Neste endpoint você poderá fazer o cadastro do usuário no sistema. A senha será criptografada antes de ser cadastrada no banco de dados.  

Exemplo do body JSON:
```json=
{
    "nome": "Rodrigo",
    "email": "rodrigo@gmail.com",
    "senha": "12345",
    "nome_loja": "The Best Store"
}
```
- Todas as propriedades são obrigatórias
---
<b>[POST] https://market-place-cubos.herokuapp.com/login</b>

Neste endpoint você poderá fazer a autenticação do usuário no sistema. 

Exemplo do body JSON :
```json=
{
    "nome": "Rodrigo",
    "senha": "12345"
}
```
- Todas as propriedades são obrigatórias

Exemplo de retorno bem sucedido:
```json=
{
  "usuario": {
    "id": 50,
    "nome": "Rodrigo",
    "nome_loja": "The Best Store",
    "email": "rodrigo@gmail.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTYzNjU2NzQ3MCwiZXhwIjoxNjM2NTk2MjcwfQ.RATspqn7PHSnWH-fpkfcgaKOB7TiRMVpnxM2LLba6tA"
}
```
---
### *ROTAS AUTENTICADAS*
A partir daqui todas as rotas exigirão autênticação. O token do tipo **Bearer** deverá ser passado no **header** da requisição para ter autorização.

Exemplo:
```js=
headers: {
	'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTAsImlhdCI6MTYzNjU2NzQ3MCwiZXhwIjoxNjM2NTk2MjcwfQ.RATspqn7PHSnWH-fpkfcgaKOB7TiRMVpnxM2LLba6tA'
}
```
---
<b>[GET] https://market-place-cubos.herokuapp.com/perfil</b>

Irá mostrar as informações do usuário logado(exceto a senha)

---
<b>[PUT] https://market-place-cubos.herokuapp.com/perfil</b>

O usuário logado poderá alterar algumas de suas informações.

Exemplo do body JSON:
```json=
{
    "nome": "Rodrigo A",
    "email": "rodrigo2@gmail.com",
    "senha": "123456",
    "nome_loja": "The Best Store 2"
}
```
- Pelo menos 1 dessas propriedades deverá ser informada.


### Endpoints de produtos

<b>[GET] https://market-place-cubos.herokuapp.com/produtos</b>

 Irá listar todos os produtos cadastrados no banco de dados referente ao usuário logado. 
- Caso o base64 da imagem do produto tenha sido informado do endpoint de atualização da imagem do produto, retornará uma informação adicional com a url pública da imagem.
---

<b>[GET] https://market-place-cubos.herokuapp.com/produtos/🆔</b>

Deverá informar o ID do produto no PATH para obter informações do produto específico.

---
<b>[POST] https://market-place-cubos.herokuapp.com/produtos</b>

Neste endpoint o usuário logado poderá fazer o cadastro de um produto no banco de dados. 

Exemplo do body JSON:
```json=
{
    "nome": "Camisa preta",
    "estoque": 1,
    "categoria": "camisa",
    "preco": 4990,
    "descricao": "Camisa de malha com acabamento fino."
}
```
- Apenas os campos nome, estoque e preco são obrigatórios. 
---

<b>[PUT] https://market-place-cubos.herokuapp.com/produto/🆔</b>

Deverá informar o ID do produto no PATH para alterar informações do produto específico.

Exemplo do body JSON:
```json=
{
    "nome": "Camisa preta",
    "estoque": 3,
    "categoria": "camisa",
    "preco": 4990,
    "descricao": "Camisa de malha com acabamento fino."
}
```
- Pelo menos 1 dessas propriedades deverá ser informada.

<b>[PUT] https://market-place-cubos.herokuapp.com/produto/🆔/img</b> 

Deverá informar o ID do produto no PATH para adicionar/alterar a **imagem** do produto específico.

Exemplo do body JSON:
```json=
{
	"nome_imagem" : "beststore/camisas/camisa-preta.png",
	"imagem" : "base64 da imagem aqui"
}
```
- Todas as propriedades são obrigatórias. 
- Será feito o upload da imagem em um bucket da supabase e o registro do caminho da imagem no banco de dados.
---
**[DELETE] https://market-place-cubos.herokuapp.com/produtos/🆔**

Deverá informar o ID do produto no PATH para exclusão do mesmo no banco de dados.
- A exclusão do produto também irá refletir na exclusão de sua imagem no storage bucket, caso haja uma.
---
**[DELETE] https://market-place-cubos.herokuapp.com/produtos/🆔/img** 

Deverá informar o ID do produto no PATH para exclusão apenas da **imagem** do produto.
- Tanto o registro do caminho da imagem no banco de dados quanto seu arquivo no storage bucket serão excluídos.
