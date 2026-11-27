# Navigateur radio

Ajouter une station de radio internet à une playlist signifie normalement chasser son adresse de flux
quelque part sur le web et le coller dans un fichier. UMS peut prendre cette étape de vos mains : c'est
connecté à **RadioBrowser**, un annuaire de stations de radio Internet géré par la communauté, et peut
effectuer une recherche et ajouter une station pour vous.

Il n'y a rien à configurer. Le répertoire est utilisé à la demande, et uniquement lorsque vous le demandez.

## Trouver une station

Si votre point de contrôle propose une recherche de station, il demande UMS, et UMS demande RadioBrowser.
Les stations peuvent être réduites de

- Nom
- Pays
- langue
- , comme un genre ou un thème

Lequel de ces points de contrôle vous permet d'utiliser, et comment il les présente, dépend du point de contrôle
. UMS fournit également les valeurs possibles pour les filtres « pays », « langue » et « balise » ; ainsi, un tel
champ de recherche peut les proposer sous forme de liste plutôt que de vous obliger à les saisir manuellement.

Les listes de résultats longues sont extraites en portions, donc une recherche large ne doit pas être transférée en un seul
.

## Trouver une station

Lorsque vous choisissez une station, UMS écrit une entrée complète dans la playlist que vous avez choisie — pas seulement l'adresse
:

- l'adresse du **flux**
- le **nom de la station**, ou un titre propre si votre point de contrôle vous permet d'en saisir un
- le **logo de la station**, donc l'entrée a une image au lieu d'une icône par défaut
- le **identifiant de la station** du répertoire

La dernière est la partie intéressante. Il reste dans le fichier de playlist en tant que
[`#RADIOBROWSERUUID:` directive](./playlist-directives), ce qui signifie que l'entrée reste connectée à
l'entrée du répertoire d'où elle vient. UMS utilise cette connexion pour compléter les informations que le flux lui-même
ne fournit pas, telles que le genre et le débit binaire.

Le résultat est un fichier de liste de lecture qui continue de lire comme une liste de lecture simple et fonctionne dans n'importe quel autre lecteur:

```text
#EXTM3U
#EXTINF:-1,Jazz Radio
#EXTIMG:https://example.com/logos/jazzradio.png
#RADIOBROWSERUUID:962cf2e0-0601-11e8-ae97-52543be04c81
http://stream.example.com/jazz.mp3
```

Vous pouvez aussi écrire une telle entrée à la main si vous connaissez l'identifiant de la station. Laisser la directive
vous coûte seulement les détails supplémentaires ; la station elle-même joue dans les deux sens.

## Par la suite

La station se comporte comme toute autre entrée de la playlist à partir de ce moment-là. Vous pouvez l'évaluer, remplacer son image
et corriger la façon dont ses titres en direct sont lus ; voir
[radio Internet et titres en direct](./internet-radio).
