---
sidebar_position: 2
---

# Novedades en v14

## Información general

V14 contiene nuevas características importantes basadas en lo que nuestros usuarios han pedido.

Los mayores cambios implican la capacidad de controlar el acceso a su contenido.

También ha habido muchas actualizaciones en la configuración web y en las interfaces del reproductor, incluyendo la posibilidad de marcar un conjunto de archivos (ej. una serie de TV) para poder reproducida completa, y la detección automática de su preferencia en modo oscuro/luz.

También aprovechamos la oportunidad para actualizar las versiones principales de algunas de nuestras dependencias, incluyendo [Mantine v7](https://mantine.dev/), [NSIS v3](https://nsis. ourceforge.io/Download), [Yarn v4](https://yarnpkg.com/), y el generador de esta Base de Conocimiento, [Docusaurus v3](https://docusaurus.io/).

Por último, hemos lanzado cientos de errores y mejoras de rendimiento, y se ha refactorizado un montón de código para que trabajar sea más fácil, así como mejoró nuestros frameworks de pruebas para prevenir futuros errores.

## Nuevas características

### Bloquear/permitir renderizadores y dispositivos de red

Ahora puede bloquear y permitir el acceso basado en el renderizador o el dispositivo de red, desde la pantalla de inicio en el área de configuración.

![Ejemplo de cómo bloquear un render](@site/docs/img/whats-new-in-v14-block-renderer.png)

### Permitir o bloquear renderizadores o dispositivos de red por defecto:

Ahora puede elegir la estrategia por defecto para renderizadores y dispositivos de red. Anteriormente, solo había una estrategia posible: permitir todo, o negar todo con una lista de permisos. Ahora puede permitir o denegar por defecto, con listas de denegación y listas permitidas, para un control completo.

Esto hace que UMS sea mucho más flexible para situaciones de vida compartidas o redes locales ampliadas o de baja confianza. También es útil para aquellos de ustedes que utilizan adaptadores de corriente para su red ya que esto puede resultar en un acceso no deseado por parte de sus vecinos.

![Ejemplo de cómo configurar las preferencias de permiso por red](@site/docs/img/whats-new-in-v14-network-allowblock-preference.png)

![Ejemplo de cómo configurar las preferencias de permiso por renderizador](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

### Vincular personas al renderizador

Ahora puedes vincular cuentas de usuario a renderizadores/dispositivos, permitiéndote tener seguimiento de reproducción independiente. Por ejemplo, si usted tiene un televisor en el salón y otro en su dormitorio, el televisor del salón no necesita verse afectado por lo que se está viendo desde su habitación.

![Ejemplo de cómo asignar una cuenta a un render](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

### Restringir contenido compartido a ciertos grupos

You can now choose to share directories or online content with certain groups. For example, if you have a person (or a device that is assigned to a person) who is a child, you can assign them to the "Kids" group, and give that group access to the "Family" directory, but not the "Horror" or "Adult Only" ones. Or give them access to the Kurzgesagt web feed, but not the history podcasts.

![Example of shared content groups](@site/docs/img/whats-new-in-v14-shared-content-group.png)

### Avatars

People can have avatars to make them easier to see at a glance. You can set them on the user settings page along with the user groups

![Example of how to edit user settings](@site/docs/img/whats-new-in-v14-user-avatar.png)

### Direct TMDB integration

You can now link your TMDB account with UMS in the General Settings area.

Doing this allows you to edit metadata based on search results from TMDB:

![Example of how to assign an account to a renderer](@site/docs/img/whats-new-in-v14-tmdb-edit-metadata.png)

### Mark TV series and videos as fully played

Now you can mark TV series and videos as fully played, in addition to the existing ability to do it by folder

![Example of how to edit user settings](@site/docs/img/whats-new-in-v14-mark-tv-series-fully-played.png)

### More

For a full list of all changes in v14, see [the full changelog](https://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md).

## Migration

The first time V14 runs, it will re-scan your shared folders, which can take some time. You can still use the server before this finishes, but it might respond more slowly and return incomplete results.

After updating, you might need to restart your device or media player app to clear its cache and make it properly recognize the new data we are sending it.

As with any major update, if you want to have the ability to go back to your current version before updating, you can make a backup of your profile directory, which contains your configuration and local database. You can find the location of that directory near the top of your program logs. Look for `Profile directory: [some page]/UMS`.
