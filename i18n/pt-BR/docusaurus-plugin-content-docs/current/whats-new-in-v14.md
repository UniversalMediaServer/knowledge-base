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

![Exemplo de como configurar as preferências de rede](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Example of how to set renderer allow preference](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

### Link person to renderer

You can now link user accounts to renderers/devices, allowing you to have independent playback tracking. For example, if you have a TV in the living room and another in your bedroom, the living room TV doesn't need to be affected by what you watch in your bedroom.

![Example of how to assign an account to a renderer](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

### Restrict shared content to certain groups

You can now choose to share directories or online content with certain groups. For example, if you have a person (or a device that is assigned to a person) who is a child, you can assign them to the "Kids" group, and give that group access to the "Family" directory, but not the "Horror" or "Adult Only" ones. Or give them access to the Kurzgesagt web feed, but not the history podcasts.

![Example of shared content groups](@site/docs/img/whats-new-in-v14-shared-content-group.png)

### Avatars

People can have avatars to make them easier to see at a glance. You can set them on the user settings page along with the user groups

![Example of how to edit user settings](@site/docs/img/whats-new-in-v14-user-avatar.png)

### Direct TMDB integration

You can now link your TMDB account with UMS in the General Settings area.

Doing this allows you to edit metadata based on search results from TMDB:

![Example of how to assign an account to a renderer](@site/docs/img/whats-new-in-v14-tmdb-edit-metadata.png)

### More

For a full list of all changes in v14, see [the full changelog](https://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md).

## Migration

There are no special migration instructions for going from v13 to v14.

As with any major update, if you want to have the ability to go back to your current version before updating, you can make a backup of your profile directory, which contains your configuration and local database. You can find the location of that directory near the top of your program logs. Look for `Profile directory: [some page]/UMS`.
