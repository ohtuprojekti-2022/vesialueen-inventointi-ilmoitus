# End to end testaus

## Käytetyt teknologiat, miten on testattu?

End to end testeissä on käytetty Cypressiä. Cypress on javascript end to end testing framework.

Testeissä pyritään käymään läpi yksi käyttötapaus kerrallaan, mutta suurimmassa osassa testeissä käytetään uudelleen jo testattuja käyttötapauksia.

Testeissä käytetty testidata on tehty muistuttamaan sen tyylistä dataa mitä käyttäjä voisi itse sovellukseen syöttää, ja epäselvän datan käyttöä on pyritty välttämään. 

## Testikattavuus, mitä on testattu ja mitä ei?

Melkein kaikki käyttötapaukset ovat testattu perusteellisesti. Ainoat testaamattomat käyttötapaukset ovat admin-käyttäjän käyttötapaukset.

## Testien suorittaminen
>Tarkemmat ohjeet end to end testaukselle löytyvät E2E hakemistosta

### Paikallisesti


Hakemistossa `E2E`:
```
npm install
```
Aseta ympäristömuuttujien arvot `.env` tiedostossa:
```
CYPRESS_BASE_URL=<Frontend url>
CYPRESS_BACKEND_URL=<Backend url>
```

Testien suorittaminen päättömässä tilassa:
```
npx cypress run
```
Tai avataan Cypress Dashboard, jossa testit voi suorittaa visuaalisesti:
```
npm run cypress:open
```
### Etänä

Testit suoritetaan manuaalisesti actionsissä valitsemalla "e2e" workflow ja klikkaamalla "Run workflow"
