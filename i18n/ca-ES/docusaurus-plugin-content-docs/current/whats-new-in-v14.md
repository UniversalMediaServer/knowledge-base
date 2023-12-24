---
sidebar_position: 2
---

# Que hi ha de nou a la v14

## Resum

La V14 conté funcions noves importants basades en el que han demanat els nostres usuaris.

Els canvis més importants impliquen la possibilitat de controlar l'accés al vostre contingut. Això inclou millores als comptes d'usuari, com ara codis PIN, avatars i grups de carpetes compartides, així com la possibilitat de mostrar contingut diferent a diferents dispositius.

També hi han hagut moltes actualitzacions a la configuració web i a les interfícies del reproductor, inclosa l'addició de la possibilitat de marcar conjunts de fitxers (per exemple, sèries de televisió) com a reproduïts completament i la detecció automàtica de la preferència del mode fosc/clar del vostre sistema.

També vam aprofitar per crear versions principals d'algunes de les nostres dependències, com ara [Mantine v7](https://mantine.dev/), [NSIS v3](https://nsis.sourceforge.io/Download), [ Yarn v4](https://yarnpkg.com/) i el generador d'aquesta base de coneixement, [Docusaurus v3](https://docusaurus.io/).

Finalment, hem introduït centenars de correccions d'errors i millores de rendiment, i hem refactoritzat molt de codi perquè sigui més fàcil de treballar, així com hem millorat els nostres marcs de prova per evitar errors futurs.

## Noves funcionalitats

### Bloqueja/permet renderitzadors i dispositius de xarxa

Ara podeu bloquejar i permetre l'accés en funció del renderitzador o del dispositiu de xarxa, des de la pantalla d'inici de l'àrea de configuració.

![Exemple de com bloquejar un renderitzador](@site/docs/img/whats-new-in-v14-block-renderer.png)

### Permet o bloqueja els renderitzadors o els dispositius de xarxa de manera predeterminada:

Ara podeu triar l'estratègia predeterminada per a renderitzadors i dispositius de xarxa. Anteriorment, només hi havia una estratègia possible: permetre-ho tot o negar-ho tot amb una llista de permisos. Ara podeu permetre o denegar de manera predeterminada, amb llista de denegació i llista de permisos, per a un control complet.
​

Això fa que UMS sigui molt més flexible per a situacions de vida compartida o xarxes locals àmplies o de poca confiança.
​ També és útil per a aquells que utilitzeu adaptadors de línia elèctrica per a la vostra xarxa, ja que això pot provocar un accés no desitjat dels veïns.

![Exemple de com establir la preferència de permetre la xarxa](@site/docs/img/what's-new-in-v14-network-allow block-preference.png)

![Exemple de com configurar la preferència de permetre el renderitzador](@site/docs/img/whats-new-in-v14-renderer-allow-preference.png)

### Enllaça la persona al renderitzador

Ara podeu enllaçar comptes d'usuari amb renderitzadors/dispositius, la qual cosa us permetrà tenir un seguiment de reproducció independent. Per exemple, si teniu un televisor a la sala d'estar i un altre al vostre dormitori, el televisor de la sala d'estar no s'ha de veure afectat pel que mireu al vostre dormitori.

![Exemple de com assignar un compte a un renderitzador](@site/docs/img/whats-new-in-v14-assign-account-to-renderer.png)

### Restringeix el contingut compartit a determinats grups

Ara podeu triar compartir directoris o contingut en línia amb determinats grups. Per exemple, si teniu una persona (o un dispositiu assignat a una persona) que és un nen, podeu assignar-lo al grup "Nens" i donar-li accés al directori "Família", però no al "Horror" o "Només per a adults". O doneu-los accés al canal web de Kurzgesagt, però no als podcasts de la història.

![Exemple de grups de contingut compartit](@site/docs/img/whats-new-in-v14-shared-content-group.png)

###

Les persones poden tenir avatars perquè siguin més fàcils de veure d'un cop d'ull. Podeu configurar-los a la pàgina de configuració d'usuari juntament amb els grups d'usuaris

![Exemple de com editar la configuració de l'usuari](@site/docs/img/whats-new-in-v14-user-avatar.png)

### Integració directa de TMDB

Ara podeu enllaçar el vostre compte de TMDB amb UMS a l'àrea de configuració general.

En fer-ho, podeu editar metadades basades en els resultats de la cerca de TMDB:

![Exemple de com assignar un compte a un renderitzador](@site/docs/img/whats-new-in-v14-tmdb-edit-metadata.png)

### Més

Per obtenir una llista completa de tots els canvis de la v14, consulteu [el registre de canvis complet](https://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md).

## Migració

No hi han instruccions especials de migració per passar de la v13 a la v14.

Com amb qualsevol actualització important, si voleu tenir la possibilitat de tornar a la vostra versió actual abans d'actualitzar, podeu fer una còpia de seguretat del directori del vostre perfil, que conté la vostra configuració i la vostra base de dades local. Podeu trobar la ubicació d'aquest directori a prop de la part superior dels registres del vostre programa.
​ Cerqueu `Directori de perfils: [alguna pàgina]/UMS`.
