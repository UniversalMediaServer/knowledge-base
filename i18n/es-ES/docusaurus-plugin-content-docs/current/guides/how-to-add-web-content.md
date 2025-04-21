# Cómo añadir contenido web

Este artículo explica como añadir contenido web

## Transmisiones de video

Puedes suscribirte a transmisiones/canales de video agregando el link RSS, o para el caso de YouTube, simplemente incluir el link del canal de YouTube.

### Ir a la sección de Contenido Compartido

En la configuración de UMS en tu navegador web, abre el menú y selecciona "Contenido Compartido"![Menú configuración  ](@site/docs/guides/img/how-to-add-web-content-1-shared-content.png)

### Abre la ventana "Añadir nuevo contenido compartido"

Cuando selecciones el botón "Añadir nuevo contenido compartido", abrirá una ventana que te permitirá añadir cualquier tipo de medio. El primer paso es elegir el tipo de "Transmisión de Video"![Ventana de opciones de nuevo contenido compartido](@site/docs/guides/img/how-to-add-web-content-2-add-modal.png)

### Añade tu transmisión

Aquí puedes añadir tu transmisión

#### Nombre

El campo "Nombre" está deshabilitado para las transmisiones de video porque esas transmisiones definen sus propios nombres.

#### Ruta

El campo "Ruta" define la estructura de directorios que será mostrado en UMS. Por ejemplo, si ingresas `Web/YouTube Channels`, tu fuente estará dentro del directorio `YouTube Channels`, alojado dentro del directorio `Web`. Esto te permite organizar tu contenido de la forma que tú quieras, es especialmente útil si tienes varios proveedores de transmisiones y quieres utilizar UMS para poder manejarlas todas desde un único lugar.

#### Fuente/URL

Esto es el enlace a la transmisión de video. Normalmente acabado en `.xml`, aunque manejamos YouTube de una forma diferente para aceptar la URL de un canal directamente. Por ejemplo: `https://www.youtube.com/@kurzgesagt`

#### Grupos autorizados

El campo "Grupos Autorizados" te permite hacer que esta transmisión sólo esté disponible para ciertos grupos definidos en UMS que estén asociados con diferentes usuarios y/o dispositivos. Ver [Seguridad y Privacidad](../configuration/security-and-privacy.md#link-person-to-renderer) para más detalles.

Cuando estés satisfecho con las opciones que has introducido, selecciona el botón "Añadir".

### Orden de la transmisión

Si el link de la transmisión fue válido, debes ahora comprobar si el campo "Nombre" ha sido rellenado

### Guardar cambios

Puedes repetir los pasos previos para añadir/editar más contenidos, y cuando estés satisfecho con los cambios, selecciona el botón "Guardar" en la parte inferior de la página. Ahora puedes ver tu contenido en tus dispositivos:\
![Ejemplo de una fuente de vídeo en el reproductor web](@site/docs/guides/img/how-to-add-web-content-4-feed-player.png)