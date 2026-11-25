# Rechercher

Lorsqu'un point de contrôle offre une zone de recherche, il ne filtre pas la liste qu'il a déjà. Il envoie la recherche
à UMS en tant que critère UPnP tel que `dc:title contient "beatles`, et les réponses UMS avec les éléments
correspondants. Comment ce critère est transformé en requête est ce que les paramètres de cette page contrôle.

## Les deux moteurs de recherche

UMS peut répondre à une recherche de deux manières:

- **Index plein texte (par défaut).** UMS garde un index Lucene à côté de la base de données et recherche cela.
  Il est rapide même sur les grandes bibliothèques et c'est ce qui rend possible la tolérance des mots partiels et des typos.
- **Recherche simple dans une base de données.** Une requête SQL classique. Plus lent sur les grandes bibliothèques et il ne correspond qu'à
  ce qui est littéralement là, mais il n'a pas d'index pour être obsolète.

L'index en texte intégral couvre le nom du fichier de chaque fichier multimédia, et aussi le titre de la chanson,
album, artiste, artiste, compositeur, chef d'orchestre et genre.

UMS passe à la recherche de la base de données seul lorsqu'un point de contrôle envoie un critère, l'index
ne peut pas répondre, donc désactiver l'index est rarement nécessaire.

```
# Utiliser l'index en texte complet. FALSE revient à une recherche de base de données simple.
search_lucene_use_engine = TRUE
```

## Recherche d'une partie d'un mot

La plupart des boîtes de recherche envoient un critère `contains` pendant que vous tapez encore. UMS transforme chaque mot de
votre entrée en deux alternatives à la fois :

- un **préfixe** correspondant, donc `beat` trouve déjà _Beatles_ avant de terminer le mot
- une correspondance **floue** donc `beatlse` trouve encore _Beatles_ malgré la faute

```
# Tolérer les fautes de frappe en plus des préfixes correspondants.
search_lucene_contains_fuzzy = TRUE
```

Les deux paramètres correspondent aux préfixes. Ils diffèrent dans ce qu'ils correspondent d'autre:

|                                          | `TRUE` (par défaut) | `FALSE` |
| ---------------------------------------- | ------------------- | ------- |
| `beat` trouve _Beatles_                  | oui                 | oui     |
| `beat` trouve _Beatles_                  | oui                 | Non     |
| résultats non liés sur une entrée courte | possible            | Non     |

La dernière ligne est la raison pour laquelle le paramètre existe. La tolérance type permet jusqu'à deux erreurs, manquantes ou
lettres supplémentaires, et sur un mot court qui atteint étonnamment loin : la recherche de `ranz` renvoie aussi
tout ce que l'on appelle _Jazz_, parce que deux substitutions vous amènent de l'une à l'autre. Si ce bruit
vous ennuie plus que la tolérance de la faute de frappe vous aide, définissez-le à `FALSE`.

Deux détails qui valent la peine d'être connus :

- Un préfixe n'est utilisé qu'à partir de **trois caractères** activé. Une ou deux lettres correspondent à une grande partie de
  la bibliothèque sans vous dire quoi que ce soit que la tolérance de la faute de frappe ne trouve pas déjà.
- Mettre votre entrée entre guillemets recherche les **mots à côté des uns des autres** à la place, qui
  est utile lorsque les mots individuels sont communs mais que la combinaison ne l'est pas.

## Recherche d'une valeur exacte

Certains critères demandent une valeur exacte plutôt qu'une partie d'un seul — une navigation par genre
envoie `upnp:genre = "Jazz"`, par exemple. Par défaut, cela est pris littéralement.

```
# Tolérer les fautes de frappe dans les correspondances exactes. Désactivé par défaut.
search_lucene_equal_fuzzy = FALSE
```

Si vous activez cette option, les comparaisons exactes tolèrent également les fautes de frappe. That is rarely what you want, because
these criteria usually come from the control point itself rather than from something you typed, and
a value that is nearly right is then quietly treated as right.

## Notes

Search ignores capitalization. `chapitre`, `Chapitre` and `CHAPITRE` return the same results.

If a search does not return what you expect, the debug log shows the query UMS built from your
input, on a line beginning with `lucene search string is`. Comparing it with what you typed usually
explains the result on the spot.
