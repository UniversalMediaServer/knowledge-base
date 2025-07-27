# Cómo reproducir contenido multimedia

Este artículo explica las cuatro formas principales de reproducir vídeo, audio e imágenes mediante UMS.

## Reproducir desde una interfaz de renderizado

Cuando su renderizador está conectado a UMS a través de DLNA/UPnP, a menudo se mostrará un menú llamado "Servidores multimedia" o algo similar, dependiendo del renderizador. Desde allí, puedes acceder a UMS y buscar el medio al que deseas acceder.

La implementación de esto varía mucho según el renderizador, pero la funcionalidad principal es la misma: navegue hasta el medio elegido y selecciónelo para reproducirlo.

## Enviar desde la interfaz UMS a un renderizador

La propia interfaz UMS tiene la capacidad de "enviar" medios a los renderizadores si admiten la función UPnP. Es un concepto similar al casting.

1. Abra la interfaz de usuario de UMS e identifique el renderizador al que desea enviar los archivos multimedia. En este caso se trata del televisor Panasonic Serie VIERA VT60.  
   ![Abrir la GUI](@site/docs/guides/img/how-to-play-media-1.png)
2. Haga clic en la imagen del renderizador para abrir el panel de control  
   ![Control de renderizador](@site/docs/guides/img/how-to-play-media-2.png)
3. Seleccione el archivo que desea enviar haciendo clic en el ícono de la carpeta en la parte inferior derecha y se completará en la parte inferior izquierda. Si no ve los controles del reproductor en esta ventana, su renderizador no admite esta funcionalidad. Asegúrese de verificar si hay actualizaciones de firmware/software para su renderizador, ya que es posible que hayan agregado soporte para él.  
   ![Archivo seleccionado](@site/docs/guides/img/how-to-play-media-3.png)
4. Ahora puede crear una lista de reproducción haciendo clic en el ícono más a la derecha del cuadro de entrada, o puede enviar el archivo a su renderizador haciendo clic en el ícono de reproducción justo arriba del medio del cuadro de entrada, lo que iniciará la reproducción en su renderizador.

## Reproducir en la interfaz web

Se puede acceder a la interfaz web desde cualquier lugar dentro de su red local, incluso en computadoras y renderizadores. En muchos sentidos, nuestra interfaz de usuario ofrece funciones más avanzadas.

1. Abra la interfaz web. Si conoce la dirección, puede ir allí; de lo contrario, una forma fácil es hacer clic en el botón de interfaz web en nuestra UI.  
   ![Abra la interfaz web.](@site/docs/guides/img/how-to-play-media-4.png)
2. Al hacer clic aquí, se abrirá la interfaz web en su navegador predeterminado. Desde allí puedes navegar hasta tu archivo y hacer clic para reproducirlo.  
   ![Video en la interfaz web](@site/docs/guides/img/how-to-play-media-5.png)

## Enviar desde la interfaz web a un renderizador

De manera similar a lo anterior en la opción 2, puede enviar sus archivos multimedia a un renderizador a través de nuestra interfaz web.

1. Hacer clic en el pequeño ícono de un archivo al explorar un directorio. Está en la parte inferior derecha de la miniatura.  
   ![Emitir icono](@site/docs/guides/img/how-to-play-media-6.png)
2. Esto hará que aparezca un mini panel de control flotante, que puedes usar para controlar la reproducción del archivo y administrar listas de reproducción dinámicas si lo deseas.  
   ![Panel de control flotante](@site/docs/guides/img/how-to-play-media-7.png)
