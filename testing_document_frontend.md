# Frontendin testaus

## Käytetyt teknologiat, miten on testattu?

Frontendin toiminnallisuus on kirjoitettu JavaScriptilla React-kirjaston avulla, ja myös testit käyttävät Reactin tarjoamia työkaluja.

Testit ovat enimmäkseen yksikkötestejä, joissa testataan yhden komponentin toiminnallisuuksia kerrallaan riippumatta muista komponenteista. Joissain testeissä on kuitenkin käytetty useampaa komponenttia, sillä joidenkin komponenttien toiminta on riippuvainen jonkun toisen komponentin toiminnasta. 

Testit käyttävät Reactin testing-library-kirjastoa ja Jestiä. Suuri osa testeistä on toteutettu userEvent:in avulla, jolla voidaan simuloida käyttäjän  kirjoittamista ja klikkailua. Mock-funktioita on myös käytetty paljon.

Testeissä käytetty testidata on tehty muistuttamaan sen tyylistä dataa mitä käyttäjä voisi itse sovellukseen syöttää, ja epäselvän datan käyttöä on pyritty välttämään. 

## Testikattavuus, mitä on testattu ja mitä ei?

Testikattavuus sovelluksen tuotantopalvelimella:
- [![codecov](https://codecov.io/gh/ohtuprojekti-2022/vesialue-front/branch/main/graph/badge.svg?token=9K2Y141HQT)](https://codecov.io/gh/ohtuprojekti-2022/vesialue-front)

Frontendin testikattavuus on Codecovin mukaan varsin korkea, mikä kertoo siitä että testit on tehty laaja-alaisesti ja suurin osa projektin tiedostoista on testattuja, tosin kattavuus ei kuitenkaan kerro kaikkea testien laadusta.

Asiat joita ei ole testattu ovat enimmäkseen asioita joiden testaaminen on kovin haastavaa, kuten karttatyökalu ja funktiot jotka ovat riippuvaisia useammasta eri komponentista. Tarkoituksena on kuitenkin ollut testata niin paljon asioita kuin mahdollista.

## Testien suorittaminen

Testien suorittaminen paikallisesti onnistuu syöttämällä seuraava komento komentoriville:
```bash
CI=true npm test
```

Testien testikattavuus saadaan komennolla
```bash
CI=true npm test -- --coverage
```

Testikattavuuden yksityiskohtia näkee myös klikkaamalla ylläolevaa Codecov-badgea.
