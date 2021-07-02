# melosys-schema
Melosys Schema og Mock data



###Link og test schema 
For å verifisere endringene i schema må man benytte et annet prosjekt kalt melosys-web-mock. 
melosys-web-mock benytter dette prosjektet som en avhengighet, som må erstattes av en symlink.
Dette gjøres som følger: 
```
cd ~/projects/melosys-schema        # go into the package directory
npm link                            # creates global link
cd ~/projects/melosys-web-mock      # go into some other package directory.
npm link @navikt/melosys-schema     # link-install the package
```


I melosys-web-mock testes schema med:

```
npm run eslint
npm run schema
npm run mock (Forutsetter at mocken kjører(npm run happycase) allerede på port 3002)
```

For å laste opp schema til lokalt .m2-repository, kan man gjøre følgende:
```
# 'v1' er versjonen i package.json
# 'v2' er en lokal (eksisterende) versjon av melosys-schema som du ønsker å overskrive 
npm run zip && mv lib/\@navikt/melosys-schema-{v1}.zip ~/.m2/repository/no/nav/melosys/melosys-schema/{v2}/melosys-schema-{v2}.jar
```

## Midlertidig løsning for generering av ts-typer

For å spare litt tid ved utvikling av melosys-web, kan man generere ts-typer fra melosys-schema.
Tanken er at de kopieres over til melosys-web, så unngå å sjekke type-filene inn i dette repoet.
```
cd schema
npx json-schema-to-typescript schemanavn-schema.json schemanavn-schema.types.ts
```
