# DiaryApp - Mobiiliohjelmoinnin lopputyö

Sovellusta voidaan käyttää sekä päiväkirjana että muistiona. DiaryAppissa käyttäjä rekisteröi ensin käyttäjätunnuksen, jonka jälkeen hän voi kirjautua sisään ja kirjoittaa sovellukseen muistiinpanoja.

DiaryApp on rakennettu React Nativella, ja tietokantana toimii Googlen Firebase. Koodauskieli on Javascript.

## Sovelluksen ajaminen

Sovellusta voi kokeilla Expo Go-sovelluksen avulla skannaamalla QR koodi tai tällä [linkillä](exp://exp.host/@jumboo/Diary_Harjoitustyo?release-channel=default).

![QR Code](/assets/qr.png "DiaryApp QR code")


### Kirjautuminen

Sovellukseen kirjaudutaan sähköpostitunnuksilla, jotka on rekisteröity sovellukseen.

![Kirjautuminen](https://media4.giphy.com/media/ocM8ETwp7umujadsj6/giphy.gif?cid=790b76113fdac282bf0f6882d938b7e0705d844ac80c7d5c&rid=giphy.gif&ct=g)

### Sovelluksen sisällä

**Satunnainen koirakuva ja viimeisin muistiinpano**

Etusivulla näkyy viimeisin muistio sekä nappula, josta saa satunnaisen koiran kuvan (sovellus täytyy reloadata, jotta tulee toinen satunnainen koiran kuva).

![Etusivu](https://media0.giphy.com/media/bKKpGoyEUGIw4TwEzC/giphy.gif?cid=790b7611ad392d61ab89c17e3602123056a5d7d555b747bd&rid=giphy.gif&ct=g)


**Uusi muistiinpano

Etusivulla on + nappula, josta pääsee kirjoittamaan uutta muistiinpanoa. Alapalkista "Entries" on listattu kaikki olemassa olevat muistiot, joita pystyy painaa auki ja poistaa.

![createAndDeleteEntry](https://media2.giphy.com/media/0NYrQ7vcPklcCGS7EH/giphy.gif?cid=790b7611f9b9f74ac4bbd9ac5441228687c369a4c107a3fb&rid=giphy.gif&ct=g)



Jos sinulla on paljon muistiinpanoja, voit etsiä hakukentästä otsikon nimellä

![haku](https://media0.giphy.com/media/oQ6dyus5ObxF7LcDW4/giphy.gif?cid=790b761156e25f3144b1757daec29bc08e7cf08bb76f7d5d&rid=giphy.gif&ct=g)



Rekisteröinnissä vaaditaan vain sähköposti ja salasana. Salasanan on oltava vähintään 6 merkkiä. Sovellus ei anna virheilmoituksia, jos syöttää olemassa olevan sähköpostitunnuksen tai virheellisen sähköpostimuodon.

![rekisterointi](https://media3.giphy.com/media/tCOEwlKgS3sFKUaCWN/giphy.gif?cid=790b7611a53874c9171ded822e543d9c68e95f8005ca2d4e&rid=giphy.gif&ct=g)