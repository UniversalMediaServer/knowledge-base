---
sidebar_position: 2
---

# Version V15 muutokset

## Yhteenveto

V15:n kaksi tärkeintä tavoitetta ovat olleet käyttöliittymän yksinkertaistaminen, joka perustuu käyttäjän palautteeseen ja arvosteluihin, sekä tehdä käyttäjätileistä helpompi käyttää.

Nopea katsaus tähän versioon tehdyistä muutoksista:

- **Käyttäjän vaihtaja** **useamman kirjautuneen käyttäjän tuella**
- **Toiminnon vaihtaja**, josta voi vaihtaa kahden pääalueen: **Soittimen** ja **Asetusten** välillä
- Kirjautuminen **PIN-koodilla**
- Dynaaminen **TV-kauden metatiedot**
- Tiedoston **mediatiedot** painike
- Uudellenkirjoitettiin ilmoitus- ja reaaliaikainen koodi, paranneltiin muistinhallintaa ja paljon muita muutoksia, joilla parannetaan käytettävyyttä ja vähentää toimintojen määrää, joita tarvitaan.

## Uudet ominaisuudet

### Käyttäjätilin vaihto

Voit nyt kirjautua sisään usealla käyttäjällä selaimessa samaan aikaan, ja vaihtaa niiden välillä.

Voit myös ottaa käyttöön asetuksen, joka näyttää saatavilla olevat käyttäjät kirjautumisruudulla. Tämä asetus on valinnainen turvallisuussyistä, koska et ehkä halua kaikkien näkevän kaikkia käyttäjätilejä. On myös olemassa väliaikainen asetus, jossa käyttäjätilit tallennetaan selaimeen tilikohtaisesti sen jälkeen, kun selaimella kirjaudutaan sisään.

![Esimerkki käyttäjätilin vaihtamisesta](@site/docs/img/whats-new-in-v15-user-switcher.png)

### Toiminnan vaihtaminen

Web-käyttöliittymä on jaettu kahteen osa-alueeseen: soitin ja asetukset.

Tämän pitäisi tehdä web-käyttöliittymästä intuitiivisempaa ja helpompi navigoida vähentämällä tarvittavien napsautusten määrää.

![Esimerkki toiminnan vaihtamisesta](@site/docs/img/whats-new-in-v15-mode-switcher.png)

### Kirjautuminen PIN-koodilla

Voit nyt ottaa käyttöön PIN-koodilla kirjautumisen palvelimen asetuksista.

![Esimerkki PIN-koodinäkymästä](@site/docs/img/whats-new-in-v15-pin-code.png)

### Dynaaminen TV-kauden metatiedot

Televisio-ohjelmien kausilla on joskus omat tietonsa, kuten otsikot ja kansikuvat, joten nyt näytämme sen kauden sivuilla.

![Esimerkki kausinäkymästä](@site/docs/img/whats-new-in-v15-season-metadata.png)

### Lisää

Täysi listä V15-muutoksista löytyy [täältä](https://github.com/UniversalMediaServer/UniversalMediaServer/blob/main/CHANGELOG.md)

## Tietojen siirto

Ei ole olemassa erityisiä vaiheita, joista olisi syytä olla tietoinen.

Kuten minkä tahansa suuren päivityksen yhteydessä, jos haluat palata nykyiseen versioon ennen päivitystä, voit tehdä varmuuskopion profiilisi hakemistosta, joka sisältää asetuksesi ja paikallisen tietokannan. Voit löytää tämän hakemiston sijainnin katsomalla ohjelman lokien yläosaa. Etsi `Profiilikansio: [jokin sivu]/UMS`.
