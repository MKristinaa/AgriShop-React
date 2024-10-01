# Koristi zvaničnu Node.js verziju 16 na Alpine Linuxu kao osnovu.
FROM node:16-alpine 

# Instalira http-server globalno, što omogućava jednostavno serviranje statičkih datoteka.
RUN npm install -g http-server 

# Postavlja radni direktorijum na /app, gde će se izvršavati naredbe.
WORKDIR /app 

# Kopira package.json iz lokalnog direktorijuma u radni direktorijum kontejnera.
COPY package.json . 

# Instalira sve zavisnosti definisane u package.json, omogućavajući korišćenje starijih peer zavisnosti ako je potrebno.
RUN npm install --legacy-peer-deps 

# Kopira sve datoteke iz lokalnog direktorijuma u radni direktorijum kontejnera.
COPY . . 

# Oznaka koja obaveštava da kontejner koristi port 3000, omogućavajući pristup spolja.
EXPOSE 3000 

# Pokreće npm start komandu, koja obično startuje aplikaciju prema skripti definisanoj u package.json.
CMD ["npm", "start"] 
