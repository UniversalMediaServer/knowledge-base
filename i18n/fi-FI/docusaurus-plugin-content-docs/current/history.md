---
sidebar_position: 4
---

# Historia

## Yhteenveto

Aloitimme vuonna 2012 PS3 Media Serverin haarautumana, joka oli yksi suosituimmista ja arvostetuimmista mediapalvelimista. Perustajamme SubJunk oli myös tuon projektin kehittäjä. Tuolloin se oli yksinkertaisesti DLNA-mediapalvelin, jolla oli paljon yksinkertaisempi GUI ja yksinkertaisemmat ominaisuudet.

Se teki yksinkertaisen työnsä hyvin, mutta olemme ottaneet UMS:n uusiin suuntiin ja uusiin korkeuksiin.

Tässä matkan muutamia kohokohtia:

## Edelliset versiot

### v14 (2022–12–13)

Suurimmat muutokset liittyvät kykyyn hallita sisällön käyttöoikeutta. Tämä sisältää parannuksia käyttäjätileihin, kuten käyttäjäkuvakkeet ja käyttäjäkohtainen soiton tila. Sen lisäksi on mahdollista soittaa eri sisältöä eri laitteisiin.

![Esimerkki laitteen estämisestä](@site/docs/img/whats-new-in-v14-block-renderer.png)

Lisäsimme myös mahdollisuuden lisätä TMDB API-avain käsin lisätäkseen ja muokatakseen metatietoja TV-sarjoihin ja videoihin, ja merkitä tv-sarjat ja elokuvat täysin soitetuksi.

![Esimerkki metatietojen muokkauksesta](@site/docs/img/whats-new-in-v14-tmdb-edit-metadata.png)

[Katso lisätietoja uutta-sivulta](https://support.universalmediaserver.com/14.x/whats-new-in-v14)

### v13 (2022-12-13)

Tämä julkaisu keskittyi 3D-ja virtuaalitodellisuuteen, jota johti osallistuja threedguru.

![Jaettu sisältö](@site/docs/img/history-v13.png)

[Katso lisätietoja julkaisuilmoituksessa](https://www.universalmediaserver.com/forum/viewtopic.php?t=15489)

### v12 (2022-11-29)

Tämä oli täydellinen GUIn uudelleenkirjoitus käyttäen nykyaikaisia työkaluja selaimessa, suurta ponnistusta johti SurfaceS ja js-kyle.

Tässä versiossa otettiin käyttöön myös todentaminen, käyttäjien ja ryhmien käsite.

![Todentaminen](@site/docs/img/history-v12-1.png)

Toinen muutos oli se, että Jaettu sisältö-alue oli yhtenäistetty, ennen ne jaettiin paikallisen sisällön ja web-sisällön välillä, nyt ne ovat samassa luettelossa.

![Jaettu sisältö](@site/docs/img/history-v12-2.png)

[See more details in the release announcement](https://www.universalmediaserver.com/forum/viewtopic.php?t=15459)

### v11 (2022-05-27)

We improved the web interface in many ways, including more rich data like logos and backgrounds to TV series, movies and episodes, improved device detection, improved network state detection/recovery, video playback and seeking, improved API metadata matching, HLS transcoding for all devices, and more!

![Web interface overview](@site/docs/img/history-v11.gif)

This was our first version with our new superstar developer, SurfaceS, who put a lot into this release.

[See more details in the release announcement](https://www.universalmediaserver.com/forum/viewtopic.php?t=15141)

### v10 (2021-01-12)

Here we focused on making our rich metadata more useful.

We added new folders to the Media Library, including "Filter by Information", which lets you browse the videos by actor, genre, country, director, IMDb rating, and release date.

The web interface got a lot more functionality by letting you click on an item like an actor or genre of a video to see other matches for that person or genre (or other metadata). We added some quick links to the front page of the web interface, like Recently Added, In Progress, Most Played, etc.

Thumbnails for TV series now have the fully played icon if all episodes have been fully played:

![Fully played TV series](@site/docs/img/history-v10.png)

We also welcomed ik666 to the development team, who has added a new API for integrations, and greatly improved UPnP support.

[See more details in the release announcement](https://www.universalmediaserver.com/forum/viewtopic.php?t=14535)

### v9 (2019-09-06)

No need to install Java anymore!

[See more details in the release announcement](https://www.universalmediaserver.com/forum/viewtopic.php?t=13765)

### v8 (2019-03-29)

This version focused on making it easier to enjoy streaming web content like vodcasts, podcasts, internet radio, YouTube channels, and other streaming web content by adding the Shared Content tab.

[See more details in the release announcement](https://www.universalmediaserver.com/forum/viewtopic.php?t=13523)

### v7 (2018-03-27)

This was the version to focus on our dynamic media browsing features with the Media Library folder.

We added detection of Movies and TV series and also added folder-watching so files could be automatically detected in shared folders

We were also lucky to have mik_s, our forum moderator, join us around this time, who does an amazing job around this place!

[See more details in the release announcement](https://www.universalmediaserver.com/forum/viewtopic.php?t=12407)

### v6 (2016-01-30)

Here we added the "Fully played action" with overlay icons and file management, which was highly-anticipated.

We also welcomed Nadahar to the team, who improved stability, logging and language support.

Thanks to his Crowdin integration, we have had 523 contributors to our 40 languages!

[See more details in the release announcement](https://www.universalmediaserver.com/forum/viewtopic.php?t=6037)

### v5 (2015-01-25)

In this release, we added support for UPnP connections and playback, which meant that the community were able to connect to many more devices! Thanks largely to skeptical for that.

We also added our first pass at IMDb metadata, but we didn't yet have our own API. We have OpenSubtitles to thank for this, and sorry for all the request spam in those days!

[See more details in the release announcement](https://www.universalmediaserver.com/forum/viewtopic.php?t=2901)

### v4 (2014-07-25)

The first web interface was added, finally we gave the UMS community the ability to access content via their web browsers!

We also added support for casting, and the ability to transcode to AAC.

[See more details in the release announcement](https://www.universalmediaserver.com/forum/viewtopic.php?t=2032)

### v3 (2013-11-01)

V3 was a huge release, and is when we started to really pull away from PS3MS with tons of our own features.

We added the New Media and Recently Played folders, playback resuming, filename prettifying, and a startup configuration wizard.

We also welcomed valib to the team, who is still contributing today!

[See more details in the release announcement](https://www.universalmediaserver.com/forum/viewtopic.php?t=1295)

### v2 (2012-10-31)

With v2 came the addition of the Plugin Management tab that connected to our centralized plugin database, and we again were the first to introduce a feature; Live Subtitles, where you can stream subtitles on-the-fly from your renderer.

[See more details in the release announcement](https://www.universalmediaserver.com/forum/viewtopic.php?t=325)

### v1 (2012-05-31)

These early versions focused on the "universal" aspect of the new program, by adding support for dozens of new devices.

We were also the first media server to support smooth motion, a frame-interpolation feature that now comes with every TV, but back then was only in new, high-end TVs.

Our second developer, SharkHunter, also joined us within the first few days.

[See more details in the release announcement](https://www.universalmediaserver.com/forum/viewtopic.php?t=3)

### PS3 Media Server (2008)

The project that started it all! We are a fork of that project which was started in 2008 by shagrath, who was shortly joined by SubJunk, the founder of Universal Media Server.

The PS3 was a great machine for playing media, but it did not support many video formats, so PS3 Media Server used a lot of tricks to make it play any video you could throw at it. We have applied the same strategy, for all devices and players.

![PS3 Media Server](@site/docs/img/history-pms.png)
