# Security and Privacy

## Introdução

O UMS serve a mídia de duas maneiras principais - via DLNA/UPnP para ser consumido através de aplicativos de mídia, e via HTTP(S) para serem consumidos através de navegadores.

Navegadores têm controle de segurança e privacidade fácil através de contas de usuário com logins.

Os aplicativos de mídia geralmente não suportam o conceito de um "usuário", então geralmente todos os dispositivos têm o mesmo conteúdo. Isso pode não ser o que você quer. Por exemplo, se você tiver duas pastas - seguro_crianças e inseguro_crianças, pode ser que se queira restringir que os renderizadores na sala de crianças só tenham acesso à pasta seguro_crianças. Outra situação comum é que você está na mesma rede que pessoas que você não quer tenham acesso à sua mídia, como colegas de quarto, então você pode querer bloquear completamente certos renderizadores.

O UMS fornece uma série de métodos para controlar o acesso nessas situações.

## Permitir ou bloquear renderizadores ou dispositivos de rede por padrão:
Você pode escolher a estratégia padrão para renderizadores e dispositivos de rede. Você pode permitir ou negar por padrão, com listas de permissão ou negação, para controle completo.

Isto é útil para situações de vida compartilhadas ou redes locais de baixa confiança. Também é útil para quem usa adaptadores de linha elétrica para a sua rede, já que isso pode resultar em acesso indesejado dos vizinhos.

![Exemplo de como configurar a preferência de permissão de rede](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Exemplo de como configurar a preferência de permissão de renderizadores](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

## Bloquear/permitir renderizadores e dispositivos de rede

Se você escolheu permitir ou bloquear renderizadores desconhecidos por padrão você pode construir sua lista de permissão ou lista de negação da tela inicial na área de configurações.

![Exemplo de como bloquear um renderizador](@site/docs/img/whats-new-in-v14-block-renderer.png)

## Vincular pessoa ao renderizador

Agora você pode vincular contas de usuário a renderizações / dispositivos, possibilitando que você tenha um rastreamento de reprodução independente. Por exemplo, se você tiver uma TV na sala e outra em seu quarto, a TV da sala não precisa ser afetada por aquilo que você assiste no seu quarto.

![Exemplo de como atribuir uma conta a um renderizador](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

## Restringir conteúdo compartilhado a grupos específicos

Agora você pode optar por compartilhar diretórios ou conteúdo on-line com determinados grupos. Por exemplo, se você tem uma pessoa (ou um dispositivo que é atribuído a uma pessoa) que é uma criança, você pode atribuí-la para o grupo "Crianças", e dar acesso desse grupo ao diretório "Família", mas não aos diretórios "Horror" ou "Somente Adulto". Ou dar-lhe acesso ao feed de internet de Kurzgesagt, mas não aos podcasts de história.

![Exemplo de grupos de conteúdo compartilhados](@site/docs/img/whats-new-in-v14-shared-content-group.png)

## Hiding folders

Control the visibility of the virtual folders. These settings can be found in UMS.conf file. To hide some folders while browsing, just set their value to true or tick them in the Navigation/Share Settings tab from the advanced GUI mode.

```
hide_recently_played_folder =true
hide_new_media_folder =true
hide_video_settings =true
hide_transcode_folder =true
hide_empty_folders =true
hide_media_library_folder =true
hide_live_subtitles_folder =true
```

To hide the Web folder, you will need to untick Enable external network in General Configuration tab from the advanced GUI mode or change the `external_network =' value to false in your UMS.conf file. This will have the side effect that the automatic updater won't work. The change(s) made from the GUI will be effective after a restart.

## PIN code

All the above methods restricts access from various renderers. But if you can get access to a render that is allowed to see a folder those methods will not help you (if the kids has access to the living room tv which have access to all media then they have access to that media). The PIN code solves this issue. It allows you to hide folders/media behind a PIN code which you must enter FROM the render. By default the input is a sequence of digits (0-9) just like an ATM code. I strongly suggests that you use digit based codes as it becomes hard to type in from the renderer. But if you are extra paranoid you can add letters. It works as follows: Add a file called UMS.code to the same directory as your UMS.conf and to that file add regexp,code where regexp is a regular expression just like in "UMS.deny" file and code is the code that will grant access to the folder/media. There is no length regulation on the code. For example:
```
.*private.*,1234
```

Will force you to enter a code if the folder/media contains the word "private" and the correct code is 1234. The code then stays valid for 4 hours (if you don't change that time).

## Custom Device Configuration

Any configuration property can also be set on a per-device basis by creating a custom device configuration to override the default UMS settings (for full details see Creating a Custom Device Configuration).

For example, to customize the kids' TV:
- Click the 'Customize this device' button in the top right of the renderer's GUI popup panel and specify a name for the configuration.
- In the new conf file that opens up add any settings you wish to override for the TV, e.g. to change the server name and specify different folders:
```
#----------------------------------------------------------------------------
# Custom Device profile
# See DefaultRenderer.conf for descriptions of all possible renderer options
# and UMS.conf for program options.

# Options in this file override the default settings for the specific Sony Bravia EX device(s) listed below.
# Specify devices by uuid (or address if no uuid), separated by commas if more than one.

device = uuid:7744ff6c-541f-48a8-0878-05fdebf240db
server_name = Kid Stuff
folders = c:\kids\stuff, c:\kids\otherstuff
```
