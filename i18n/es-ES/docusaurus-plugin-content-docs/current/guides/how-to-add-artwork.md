# Cómo agregar ilustraciones

Puedes añadir tus propios diseños de carpetas y listas de reproducción para que la interfaz muestre miniaturas personalizadas en lugar de imágenes genéricas predeterminadas.

Esta guía explica:

- qué formatos de imagen son compatibles
- cómo nombrar archivos de ilustraciones
- dónde colocar esos archivos
- qué sucede cuando falta la imagen de una lista de reproducción

## Formatos de imagen compatibles

Los siguientes tipos de archivo son compatibles y se comprueban en este orden. Se utiliza el primer archivo de imagen que coincida:

- `webp`
- `png`
- `jpeg`
- `jpg`
- `bmp`
- `gif`

Puedes utilizar cualquiera de estos formatos tanto para la ilustración de la carpeta como para la ilustración de la lista de reproducción.

## Carpeta

Para asignar una ilustración a una carpeta, coloque un archivo de imagen llamado `carpeta.ext` dentro de esa carpeta.

Reemplace `.ext` con una de las extensiones compatibles.

Ejemplos:

- `carpeta.webp`
- `carpeta.jpg`
- `carpeta.png`

## Listas de reproducción

Para asignar una ilustración a una lista de reproducción, utilice el mismo nombre de archivo base que el archivo de la lista de reproducción.

Ejemplos:

- Archivo de lista de reproducción: `Jazz.m3u8`
- Archivo de ilustración: `Jazz.jpg` (o `Jazz.webp`, `Jazz.png`, etc.)

Si no se encuentra un archivo de ilustración de lista de reproducción que coincida, se utiliza la ilustración de la carpeta como alternativa.

## Ejemplo de estructura de carpeta

Utilice esto como referencia:

```text
Música/
|-- carpeta.jpg
|-- Jazz/
|   |-- carpeta.png
|   |-- Jazz.m3u8
|   |-- Jazz.jpg
|   |-- Smooth.m3u8
|   `-- smooth-track01.mp3
`-- Rock/
    |-- carpeta.webp
    |-- RockHits.m3u8
    `-- track01.mp3
```

En este ejemplo:

- `Música/carpeta.jpg` es la ilustración de la carpeta principal `Música`.
- `Música/Jazz/carpeta.png` es la ilustración de la carpeta `Jazz`.
- `Music/Jazz/Jazz.jpg` is used for the `Jazz.m3u8` playlist.
- `Music/Jazz/Smooth.m3u8` has no matching `Smooth.*` image, so the `Jazz` folder artwork is used.

