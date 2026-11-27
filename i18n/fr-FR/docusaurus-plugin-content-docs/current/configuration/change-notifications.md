# Modifier les notifications

Quand quelque chose dans votre bibliothèque change, les applications connectées devraient être averties sans que vous appuyez sur Actualiser —
et sans demander à UMS toutes les quelques secondes si quelque chose s'est passé. UPnP résout ce problème avec
abonnements : une application enregistre son intérêt une fois et UMS l'informe lorsqu'il y a des nouvelles.

Cela fonctionne dans les deux sens, et les deux sont contrôlés séparément.

## Ce que UMS annonce à propos de votre bibliothèque

UMS publie deux informations chaque fois que la bibliothèque change :

- un **compteur** qui augmente sur tout changement, ce qui dit à un abonné que quelque chose s'est passé
- une **liste des conteneurs qui ont changé**, qui dit quoi

Le deuxième est ce qui maintient les choses rapidement. Une application qui détecte seulement qu'« il y a eu un changement » doit être rechargée ; une application qui détecte qu'« il y a eu un changement » recharge ce dossier et laisse le reste inchangé.

Les deux sont annoncées au maximum quelques fois par seconde. Une analyse qui importe mille fichiers donc
ne produit pas mille notifications — les modifications sont collectées et rapportées comme une poignée de messages
.

Moments typiques lorsque cela se produit :

- un fichier apparaît ou disparaît d'un dossier partagé
- vous [modifiez une playlist](./playlist-editing) depuis un point de contrôle
- vous notez quelque chose, car cela change ce que contiennent les classements
- une œuvre d'art est ajoutée pour une station ou un dossier

Si votre application agit sur l'actualité est à la portée de l'application. Actualisez la vue que vous regardez; certains
n'utilisent les informations que lorsque vous ouvrez un dossier à nouveau. Si aucune modification n'apparaît, il est conseillé
de rouvrir le dossier avant de conclure qu'il n'a pas été livré.

## Ce que l'UMS écoute sur vos joueurs

L'autre direction est l'abonnement UMS à vos **joueurs**, afin qu'il puisse montrer ce qu'ils font —
ce qui joue, si elles sont suspendues, à quel point elles sont fortes — et offrent des contrôles pour elles.

```
# Suivez les joueurs sur le réseau. Activé par défaut.
upnp_subscribe_services = VRAI
```

Laissez cela allumé lorsque UMS est l'endroit où vous contrôlez la lecture.

Désactivez-le lorsque la lecture est effectuée par un point de contrôle séparé. Dans cet agencement, UMS n'a aucune affaire
après et revendiquant le contrôle des joueurs : le point de contrôle fait cela, et deux parties
diriger le même appareil est un bon moyen d'obtenir des résultats confus. Désactiver ceci permet à
UMS de se tenir les mains debout et de simplement servir le support.

Voir [Deux boîtes et trois boîtes de configuration] (./control-point-setups) pour savoir à quoi ressemble cet arrangement.
