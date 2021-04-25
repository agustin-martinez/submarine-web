# Serverside programmering
1. [Individuellt projekt](#individuellt-projekt)
1. [Uppgift](#Uppgift)
1. [Kravspec](#Kravspec)
1. [Bedömning](#Bedömning)
1. [Inlämning](#Inlämning)
1. [Publicering / deploy](#publicering--deploy)

## Individuellt projekt

### Uppgift
Du ska bygga en webbserver med **Node.js**, **Express** och **MongoDB**.

### Kravspec
Göteborgaren Berra behöver uppgradera sin båtaffär. Han vill ha en webbshop där man kan söka på och köpa båtar. Men innan man kan bygga en frontend vill han ha ett API. Din uppgift är att registrera båtarna i en databas och bygga ett API för det.

För att Berra ska kunna kontrollera att API:et fungerar som det ska behöver det finnas en databas. För att man inte ska behöva lägga in all data manuellt varje gång man byter server, ska du göra skript som lägger in data i databasen.

---

#### Databas
Databasen ska använda MongoDB. Den ska innehålla minst 10 båt-dokument med olika värden.

---
#### Datamodell
En båt har följande egenskaper:
* id - skapas av databasen!
* modellnamn - sträng med upp till 64 tecken
* tillverkningsår - heltal
* pris - flyttal (tal med decimaler)
* segelbåt - kan vara ja/nej
* motor - kan vara ja/nej
* bild URL - *level up*

---

#### API spec
API:et ska ha följande *endpoints*:

|Resurs    |Metod   |Förväntat svar|
|----------|--------|---|
|/         | GET    |Servar frontend (senare)|

Denna endpoint serverar en minimal index.html.
```
http://localhost:3000/
http://localhost:3000/index.html
```
<br>

|Resurs    |Metod   |Förväntat svar|
|----------|--------|---|
|/assets/  | GET    |Servar bilder (statiska resurser, *level up*)|

En *level up* som ska kunna strömma bilder till klienten.
```
http://localhost:3000/assets/boat001.jpg
```
<br>

|Resurs    |Metod   |Förväntat svar|
|----------|--------|---|
|/boats/   | GET    |Returnerar en array med alla båtar|

Använd denna för att kontrollera vad som finns i databasen. När databasen växer är det ineffektivt att hämta *alla* dokument, men det är okej i den här uppgiften eftersom vi inte har så många dokument.
```
http://localhost:3000/boats/
[
    { id: '001', model: 'Nimbus C9', ... },
    { id: '002', model: 'Candela Seven', ''' },
    ...
]
```
<br>

|Resurs    |Metod   |Förväntat svar|
|----------|--------|---|
|/boat/:id | GET    |Returnerar en båt med efterfrågat id|
|/boat/    | POST   |Sparar ett båt-objekt i databasen|
|/boat/:id | DELETE |Tar bort en båt från databasen|
|/boat/    | PUT    |Uppdaterar en befintlig båt - *level up*|

CRUD-operationer på datan. Man ska kunna lägga till, hämta eller ta bort ett båt-dokument ur databasen med hjälp av dessa endpoints. <br><br>
Enstaka värden kan skickas med *querystring*, men POST och PUT kommer att skicka hela båt-objekt. Använd *request body* i stället för querystring.
```
http://localhost:3000/boat/001 (GET)
http://localhost:3000/boat/    (POST har data i request body)
http://localhost:3000/boat/001 (DELETE)
http://localhost:3000/boat/    (PUT har data i request body)
```
<br>

|Resurs    |Metod   |Förväntat svar|
|----------|--------|---|
|/search/  | GET    |Returnerar upp till fem sökträffar|

```
Alla querystring-parametrar är valfria.
http://localhost:3000/search/?word=nimbus
http://localhost:3000/search/?word=nimbus&maxprice=30000&is_sail=yes&has_motor=yes
http://localhost:3000/search/?has_motor=yes&order=lowprice
```

##### Sökning
Man ska använda querystring för att tala om vad man söker efter. API:et ska hantera följande parametrar:
* **word** - en sträng med ett ord som måste finnas i modellnamnet
* **maxprice** - högsta tillåtna priset
* **is_sail** - yes/no, om det är en segelbåt *[level up]*
* **has_motor** - yes/no, om den har motor *[level up]*
* **madebefore** - måste vara tillverkad före detta år *[level up]*
* **madeafter** - måste vara tillverkad efter detta år *[level up]*
* **order** - vilken sorteringsnyckel som ska användas *[level up]*

Exempel: en sökning på `word=ara` matchar både `BaRa` och `Skaraborg`.

Sökresultatet ska sorteras med hjälp av sorteringsnyckeln:
* `lowprice` - lägst pris först
* `name_asc` - modellnamn, stigande i bokstavsordning
* `name_desc` - modellnamn, fallande i bokstavsordning
* `oldest` - äldst båt först, dvs fallande efter ålder
* `newest` - yngst båt först

Exempel: `order=lowprice` ska sortera resultatet så den billigaste båten visas först.

---

#### Level ups
1. Minst 20 dokument i databasen
1. Node-skript som återställer databasen (tar bort allt och lägger in alla dokument igen)
1. Enkel Vanilla JavaScript-app som demonstrerar API-funktioner
1. Ändra ett båt-dokument i databasen med ett PUT request
1. Varje båtobjekt i databasen har en URL till en bild
1. Bilderna finns i databasen
1. Fler alternativ på sökning
1. Publicera uppgiften på nätet, till exempel med hjälp av Netlify eller Heroku

### Bedömning
Utdrag ur kursplanen:
> För betyget Godkänd ska den studerande
> * Visa grundläggande förståelse för server side programmering

> För betyget Väl Godkänd ska den studerande:
> * Uppnått kraven för betyget godkänt
> * Visa god förståelse för server side programmering

För godkänt på uppgiften ska du göra ett projekt som följer kravspecifikationen.

För väl godkänt ska du dessutom visa att du har en *god förståelse*. Detta gör du genom att implementera tillräckligt många *Level ups*. Både kvalitet (hur bra) och kvantitet (hur många) kommer att tas med i bedömningen.

### Inlämning
Lämna in uppgiften genom att skicka ett meddelande till läraren via slack. Tala om vilka level ups du har gjort. Om du har publicerat uppgiften så ska du skicka länk till den också. Exempel:

> Här är min inlämning i kursen Serverside programmering. <br>
> **Länk till repot på GitHub** (OBS! Kontrollera att repot inte är privat) <br>
> Jag har implementerat följande level ups: **1, 2, 4**. <br>
> Webbservern är publicerad här: **(URL)**

---

## Publicering / deploy
*Den här guiden förutsätter att du har laddat upp databasen i molnet och kan anropa den från Express-servern. Då behöver du inte göra något för att databasen ska fungera. Guiden utgår också från Heroku, men du kan förutsätta att andra plattformar som Netlify fungerar på liknande sätt.*

**1.** Börja med att skapa ett nytt projekt. Vi använder frontend-projektet som bas eftersom create-react-app automatiskt skapar ett nytt repository med bra inställningar.
```bash
npx create-react-app ditt-app-namn
```
---
**2.** Skapa en mapp med namnet `server/`. Där ska du lägga alla backend-filer. Observera att hela projektet bara ska ha *en* package.json-fil.
Så här kan din mappstruktur se ut:
```text
|- .git/
|- .gitignore
|- package.json
|- Procfile              <-- skapa den här, se steg 6
|- src/                  <-- här hamnar koden React-appen
|- build/                <-- skapas när du bygger frontend-appen med "npm run build"
|- server/               <-- skapa den här!
    |- server.js
    |- ...
```

Resten av guiden förutsätter att filen som du startar servern med heter `server.js`.

---
**3a.** Heroku bestämmer vilken port som Express ska använda. Uppdatera `server.js` så att den använder rätt port.
```javascript
// Använd en variabel till portnumret
const port = 1337;   // FEL
const port = process.env.PORT || 1337;   // RÄTT

// Använd static middleware för att serva de statiska frontend-filerna (se steg 2)
server.use(express.static(__dirname + '/../build'));

// Glöm inte att starta servern med rätt portnummer
// Man kan se allt som skrivs ut med console.log från Herokus portal
server.listen(port, () => console.log('Server is listening on port ' + serverPort));

```
---
**3b.** Tips! Om du använder routing i frontend, se till att alla routes för API:et börjar med `/api`. Då undviker man konflikter mellan frontend och backend. Exempel:
```text
GET  /api/boats
POST /api/boat
osv.
```

---
**4.** Lägg till och committa backend-filerna till ditt lokala repo.

---
**5.** Skapa ett nytt repository på GitHub för hela projektet. När du skapat ett repo visar GitHub vad man ska skriva *i terminalen* för att koppla ihop ditt repo på GitHub med ditt lokala repo. Det bör se ut så här:
```bash
git remote add origin https://github.com/ditt-användarnamn/ditt-repo.git
git push -u origin master
```
Ladda om sidan på GitHub för att kontrollera att filerna har laddats upp.

---
**6.** Nu ska vi förbereda repot så att Heroku vet hur det ska göra för att bygga och publicera appen. (*build och deploy*) Skapa en fil med namnet `Procfile` (stort P, ingen filändelse, inte ens .txt) i projektets root med följande innehåll:
```text
release: npm run build
web: node server/server.js
```

Detta betyder att när Heroku ska publicera en ny **release** av appen, så ska den börja med att bygga frontend-appen. (Heroku kör `npm install` automatiskt innan den börjar.) När Heroku kör `npm run build` skapas filer i mappen `/build`.

När releasen är byggd kommer Heroku att starta **webbservern** genom att köra filen `server/server.js`.

---
**7.** Skapa ett konto på [Heroku](https://heroku.com/). Klicka på `New -> Create new app`.

---
**8.** Koppla ihop Heroku med GitHub. Skriv in namnet på ditt GitHub-repo. Slå på *Automatic deploy from master*. Från och med nu, varje gång du pushar en ny version till GitHub, så kommer Heroku att *bygga och publicera* den. Avsluta med att klicka på *Deploy branch* för att publicera direkt. (Det kan ta någon minut.)

Klicka på `Open app` för att testköra. Håll tummarna!

---
**9.** Express-servern servar både frontend och backend. När du skickar GET/POST request med AJAX så är det till samma webbserver som servar frontend. Problemet är att det är olika när man utvecklar och när man har publicerat online.

Din lokala Express webbserver använder ett portnummer som du hittar på, t.ex port==1337.

När du utvecklar startar React en *utvecklingsserver* som vanligtvis har port==3000. Den är användbar när vi bygger frontend.

När du gör AJAX från frontend med en URL, till exempel `/api/boat?id=5`, då används samma server och portnummer som servat frontend-filerna. Om det står `http://localhost:3000/` i webbläsarens adressfält, så kommer ditt request att skickas till `http://localhost:3000/` i stället för `http://localhost:1337/`! Detta är bara ett problem när man kör sin app från utvecklingsservern. Reacts lösning är att man lägger till en rad med ordet **proxy** i sin package.json, efter avdelningen `scripts`:
```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
},
"proxy": "http://localhost:1337",   <- lägg till den här! Använd ditt Express portnummer!
```

Alternativ lösning: create-react-app skapar en variabel, vars värde beror på om vi använt `npm run start` (utvecklingsversionen) eller `npm run build` (production). (Du kan bli tvungen att lägga till stöd för CORS i servern.)
```javascript
let baseUrl;
if( process.env.NODE_ENV === 'production' ) {
	// AJAX stannar kvar på samma server när vi kör production, använd relativ URL
	baseUrl = '/api';
}
else {  // NODE_ENV === 'development'
	// Använd absolut URL med portnumret från din serverfil, steg 3a
	baseUrl = 'http://localhost:1337/api';
}
const response = await fetch(baseUrl + '/boats', { method: 'GET' });
const allTheBoats = await response.json();
```
