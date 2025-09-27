#TP3 – Movie Explorer (React + Vite + React Router + OMDb)

Search movies by title, browse results, and view a details page using the public OMDb API.

##Demo
-Live site: https://tp3-interface.vercel.app
-Repository: https://github.com/eliasNovice/tp3-interface

##Requirements
-Node.js 20+ (or 22+)
-OMDb API key (free): https://www.omdbapi.com/apikey.aspx

##Setup

git clone https://github.com/eliasNovice/tp3-interface
cd tp3-interface
npm i
# créer .env à la racine :
VITE_OMDB_API_KEY=YOUR_REAL_OMDB_KEY
npm run dev      
npm run build   

##Fonctionnalités

Recherche par titre (Enter ou bouton)
Liste : poster, titre, année
Détails : titre, synopsis (plot), rating, année, poster + bouton Back
États : welcome → loading → error
Load more pour paginer
