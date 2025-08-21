# Sistema de Consulta Clim�tica
Sistema web para consulta de condi��es clim�ticas em tempo real com armazenamento de hist�rico de consultas.

![Demonstra��o](ezgif-3fcb9b7bc359c5.gif)


## Tecnologias Utilizadas

### Backend
- PHP 8.4
- MySQL 8
- Nginx
- Composer

### Frontend
- React
- Node.js 20
- NPM

## Requisitos

- Docker Engine
- Docker Compose
- Git

## Instala��o e Execu��o

1. Clone o reposit�rio
```bash
  git clone https://github.com/Angelo-Luiz/consultar-clima.git
  cd consultar-clima
```

2. Fa�a o build do ambiente com as depend�ncias do projeto
``` bash
  docker compose up -d --build
```

3. Instale as depend�ncias do composer no container php
```bash
  docker compose exec php-84-fpm composer install
```

4. Se tudo ocorreu com sucesso a aplica�a� poder� ser acessada em `http://localhost:3000`


## Estrutura do Projeto

## 1. Ponto de Entrada

**`/public/index.php`**  
Arquivo principal que inicializa a aplica��o PHP, carrega as depend�ncias e direciona as requisi��es para os controladores apropriados.

---

## 2. Conex�o com o Banco de Dados

**`/src/Database/Impl/Database.php`**  
Classe respons�vel pela conex�o com o banco de dados.

- Implementada como **Singleton**, garantindo que exista apenas uma inst�ncia ativa de conex�o durante todo o ciclo da aplica��o.
- Essa abordagem evita m�ltiplas conex�es desnecess�rias, melhora a performance e centraliza a configura��o de acesso ao banco.

---

## 3. Arquitetura e Organiza��o

A aplica��o segue um modelo de **mon�lito modular**, utilizando **inje��o de depend�ncias com PHP-DI** para garantir baixo acoplamento e facilitar a manuten��o.

### Camadas principais

#### `/src/Controller`
- Camada de apresenta��o e orquestra��o.
- Recebe as requisi��es externas (ex.: HTTP).
- Invoca os servi�os adequados.
- Retorna a resposta (JSON, HTML, etc.).

#### `/src/Service`
- Camada de regras de neg�cio.
- Cont�m a l�gica central da aplica��o.
- Define fluxos e valida��es.
- Interage com os reposit�rios para obter ou persistir dados.

#### `/src/Repository`
- Camada de persist�ncia.
- Isola a l�gica de acesso a dados.
- Respons�vel por intera��es com o banco de dados.
- Fornece m�todos de consulta e manipula��o de entidades.  
