---
sidebar_position: 2
---

# O que há de novo na versão 15

## Resumo

Os dois principais objetivos da V15 foram simplificar a nossa “interface”, com base nos comentários e avaliações dos utilizadores, e tornar as nossas contas de utilizador mais fáceis de usar.

Uma rápida visão geral das alterações nesta versão é:

- Um **seletor de utilizador** com suporte para **vários utilizadores com sessão iniciada**
- Um **seletor de modo** para alternar entre as duas áreas principais: **Jogador** e **Configurações**
- Inícios de sessão com **código PIN**
- Metadados dinâmicos da temporada televisiva
- Um botão **Informações sobre a “media”** do ficheiro
- Também reescrevemos o nosso código de notificação e tempo real, melhoramos a gestão da memória e fizemos muitas outras alterações para melhorar a usabilidade e reduzir o número de ações necessárias para fazer o que deseja.

## Novas funcionalidades

### Alternador de utilizadores

Agora pode estar ligado com vários utilizadores num navegador ao mesmo tempo e alternar entre eles.

Pode também ativar uma configuração para exibir os utilizadores disponíveis na página de início de sessão. Esta configuração é opcional por motivos de segurança, pois pode não ser desejável que todos vejam todas as contas de utilizador. Existe também uma configuração intercalar em que as contas de utilizador são guardadas no navegador após o “login”, numa base por conta.

![Exemplo do alternador de utilizadores](@site/docs/img/whats-new-in-v15-user-switcher.png)

### Seletor de modo

A “interface” “web” foi dividida em duas áreas: Leitor e Definições.

Isto deve tornar a “interface” “web” mais intuitiva e fácil de navegar, reduzindo o número de cliques necessários.

![Exemplo do seletor de modo](@site/docs/img/whats-new-in-v15-mode-switcher.png)

### Inícios de sessão com código PIN

Agora pode ativar os “logins” com código PIN nas configurações do servidor.

![Exemplo da visualização do código PIN](@site/docs/img/whats-new-in-v15-pin-code.png)

### Metadados de temporada dinâmicos

As temporadas das séries de TV às vezes têm os seus próprios dados, como títulos e imagens de capa, por isso agora exibimos isso nas páginas das temporadas.

![Exemplo de visualização da temporada](@site/docs/img/whats-new-in-v15-season-metadata.png)

### Mais

For a full list of all changes in v15, see [the full changelog](https://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md).

## Migração

Não há etapas específicas de migração a serem consideradas.

Tal como acontece com qualquer atualização importante, se quiser ter a possibilidade de voltar à sua versão atual antes de atualizar, pode fazer uma cópia de segurança do seu diretório de perfil, que contém a sua configuração e a base de dados local. Pode encontrar a localização desse diretório na parte superior dos registos do programa. Procure por «Diretório de perfil: [alguma página]/UMS».
