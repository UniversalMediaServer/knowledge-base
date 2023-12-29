---
sidebar_position: 2
---

# Novidades na v14

## Visão Geral

A v14 contém novos recursos importantes, baseados no que nossos usuários pediram.

As maiores mudanças envolvem a capacidade de controlar o acesso ao seu conteúdo. Isto inclui melhorias para contas de usuários como códigos de PIN, avatares e grupos de pastas compartilhados. assim como a capacidade de exibir conteúdo diferente para diferentes dispositivos.

Também houve muitas atualizações nas configurações da web e na interface do player, incluindo a adição da capacidade de marcar conjuntos de arquivos (por exemplo, uma série de TV) como totalmente reproduzida, e detecção automática de sua preferência do modo claro / escuro.

Também aproveitamos a oportunidade para incrementar as versões principais de algumas de nossas dependências, incluindo [Mantine v7](https://mantine.dev/), [NSIS v3](https\://nsis. ourceforge.io/Download), [Yarn v4](https://yarnpkg.com/) e o gerador desta Base de Conhecimento, [Docusaurus v3](https://docusaurus.io/).

Por último, incluimos centenas de correções de erros e melhorias no desempenho, e recriamos muito código para ser mais fácil de trabalhar, bem como melhoramos nossos frameworks de teste para evitar erros futuros.

## Novos Recursos

### Bloquear/permitir renderizadores e dispositivos de rede

Agora você pode bloquear e permitir o acesso com base no renderizador ou no dispositivo de rede, a partir da Tela inicial na área de configurações.

![Exemplo de como bloquear um renderizador](@site/docs/img/whats-new-in-v14-block-renderer.png)

### Permitir ou bloquear renderizadores ou dispositivos de rede por padrão:

Agora você pode escolher a estratégia padrão para renderizadores e dispositivos de rede. Anteriormente, só havia uma estratégia possível - ou permitia tudo, ou negar tudo com uma lista de permissões. Agora você pode permitir ou negar por padrão, com listas de negação ou de permissão, para controle completo.

Isto torna o UMS muito mais flexível para situações de vida partilhada ou de redes locais muito grandes ou baixa confiabilidade. Também é útil para quem usa adaptadores de linha elétrica para a sua rede, já que isso pode resultar em acesso indesejado dos vizinhos.

![Exemplo de como configurar a preferência "permitir rede"](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Exemplo de como configurar a preferência de "permitir renderer"](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

### Vincular pessoa ao renderizador

Agora você pode vincular contas de usuário a renderizações / dispositivos, possibilitando que você tenha um rastreamento de reprodução independente. Por exemplo, se você tiver uma TV na sala e outra em seu quarto, a TV da sala não precisa ser afetada por aquilo que você assiste no seu quarto.

![Exemplo de como atribuir uma conta a um renderizador](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

### Restringir conteúdo compartilhado a certos grupos

Agora você pode optar por compartilhar diretórios ou conteúdo on-line com determinados grupos. Por exemplo, se você tem uma pessoa (ou um dispositivo que é atribuído a uma pessoa) que é uma criança, você pode atribuí-la para o grupo "Crianças", e dar acesso desse grupo ao diretório "Família", mas não aos diretórios "Horror" ou "Somente Adulto". Ou dar-lhe acesso ao feed de internet de Kurzgesagt, mas não aos podcasts da história.

![Exemplo de grupos de conteúdo compartilhado](@site/docs/img/whats-new-in-v14-shared-content-group.png)

### Avatares

As pessoas podem ter avatares para facilitar uma visualização rápida. Você pode configurá-los na página de configurações do usuário, juntamente com os grupos de usuários

![Exemplo de como editar configurações do usuário](@site/docs/img/whats-new-in-v14-user-avatar.png)

### Integração direta TMDB

Agora você pode vincular sua conta TMDB com o UMS na área de Configurações Gerais.

Fazer isso permite que você edite metadados com base nos resultados de pesquisa do TMDB:

![Exemplo de como atribuir uma conta a um renderizador](@site/docs/img/whats-new-in-v14-tmdb-edit-metadata.png)

### Mais

Para obter uma lista completa de todas as alterações na v14, consulte o changelog completo (https\://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md).

## Migração

Não há instruções especiais de migração para ir da v13 para a v14.

Como qualquer atualização principal, se você quiser ter a capacidade de voltar à sua versão atual antes de atualizar, você pode fazer um backup do seu diretório de perfil, que contém sua configuração e o banco de dados local. Você pode encontrar a localização desse diretório perto do topo dos seus logs do programa. Procure por `Profile directory: `[número de página]`/UMS`.
