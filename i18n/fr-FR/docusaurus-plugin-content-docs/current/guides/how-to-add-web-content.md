# Comment ajouter du contenu web

Cet article expliquera comment ajouter du contenu web.

## Flux vidéo

Vous pouvez vous abonner aux flux vidéo/chaînes en ajoutant les liens de flux RSS, ou dans le cas de YouTube, il vous suffit d'entrer le lien vers la chaîne.

### 1 : Aller à la section Contenu partagé

Dans les paramètres UMS de votre navigateur Web, ouvrez le menu et sélectionnez Contenu partagé\
![Menu Paramètres](@site/docs/guides/img/how-to-add-web-content-1-shared-content.png)

### 2 : Ouvrir la fenêtre modale "Ajouter un nouveau contenu partagé".

Lorsque vous sélectionnez le bouton "Ajouter un nouveau contenu partagé", il ouvre une fenêtre modale qui vous permet d'ajouter n'importe quel type de média. La première étape est de choisir le type "Flux vidéo"\
![Nouveaux modes de contenu partagé](@site/docs/guides/img/how-to-add-web-content-2-add-modal.png)

### 3 : Ajouter votre flux

Ici vous pouvez ajouter votre flux

#### Nom

Le champ "Nom" est désactivé pour les flux vidéo, car les flux définissent leurs propres noms.

#### Chemin d'accès

Le champ "Path" définit la structure du répertoire qui sera affichée par UMS. Par exemple, si vous entrez `Web/YouTube Channels`, votre flux sera dans le répertoire `YouTube Channels`, imbriqué dans le répertoire `Web`. Cela vous permet d'organiser votre contenu comme vous le souhaitez, et c'est particulièrement utile lorsque vous avez différents fournisseurs de flux et que vous utilisez UMS pour les regrouper au même endroit.

#### Source / URL :

Ceci est le lien vers le flux vidéo. Cela se terminera généralement par `.xml`, mais nous gérons YouTube différemment pour accepter une URL de canal directement, vous permettant par exemple d'entrer `https://www.youtube.com/@kurzgesagt`

#### Groupes autorisés

Le champ "Groupes autorisés" vous permet de rendre ce flux disponible uniquement pour certains groupes définis dans UMS qui sont associés à différents utilisateurs et/ou périphériques. Voir [Sécurité et Confidentialité](../configuration/security-and-privacy.md#link-person-to-renderer) pour plus de détails.

Lorsque vous êtes satisfait des options que vous avez saisies, sélectionnez le bouton "Ajouter".

### Commande du flux

Si le lien de flux est valide, vous devriez maintenant voir le champ "Nom" rempli, et maintenant vous pouvez faire glisser le flux vers le haut ou vers le bas pour contrôler l'ordre\
! Liste de contenu partagée et possibilité de commander](@site/docs/guides/img/how-to-add-web-content-3-see-name-and-sort. ng)

### Enregistrer les Changements

Vous pouvez répéter les étapes précédentes pour ajouter/modifier plus de contenu, et lorsque vous êtes satisfait de vos modifications, sélectionnez le bouton "Enregistrer" au bas de la page. Maintenant vous pouvez voir votre contenu sur vos appareils :\
![Exemple de flux vidéo sur le lecteur web](@site/docs/guides/img/how-to-add-web-content-4-feed-player.png)