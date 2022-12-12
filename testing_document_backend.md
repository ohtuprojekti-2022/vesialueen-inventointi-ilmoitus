# Backendin testaus

## Käytetyt teknologiat, miten on testattu?



## Testikattavuus, mitä on testattu ja mitä ei?

Testikattavuus sovelluksen tuotantopalvelimella:
link



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
