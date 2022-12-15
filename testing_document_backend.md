# Backendin testaus

## Käytetyt teknologiat, miten on testattu?

Backendin testeissä on itse sovelluksen tapaan käytetty Pythonia.

Testit ovat yksikkötestejä jotka testaavan luokkien, metodien ja funktioiden toimintaa. 

Testeissä käytetään Pythonin unittest- ja pytest-työkaluja, sekä useita itsetehtyjä apufunktioita.

Testeissä käytetty testidata on tehty mahdollisimman tarkasti muistuttamaan sellaista dataa jota oikeastikin menee palvelimelle frontendista. 

## Testikattavuus, mitä on testattu ja mitä ei?

Testikattavuus sovelluksen tuotantopalvelimella:
- [![codecov](https://codecov.io/gh/ohtuprojekti-2022/vesialue-back/branch/main/graph/badge.svg?token=VF8NXG8KIG)](https://codecov.io/gh/ohtuprojekti-2022/vesialue-back)

Backendin testikattavuus on Codecovin mukaan varsin korkea, eli testaus on laaja-alaista ja testaamattomia asioita on hyvin vähän.

Testaamisessa on keskitytty ensisijaisesti merkittävimpiin metodeihin ja funktioihin, minkä takia joitain vähemmän käytettyjä toiminnallisuuksia ei ole täysin testattu. 

## Testien suorittaminen

Siirtyminen virtuaaliympäristöön ennen testien suorittamista:
```bash
source venv/bin/activate
```

Testien suorittaminen paikallisesti onnistuu syöttämällä seuraava komento komentoriville:
```bash
pytest src
```

Testien testikattavuus saadaan komennolla
```bash
coverage run --branch -m pytest src; coverage report -m
```

Testikattavuuden yksityiskohtia näkee myös klikkaamalla ylläolevaa Codecov-badgea.
