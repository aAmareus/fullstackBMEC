<!-- Pasos para crear un proyecto FullStack dentro de una sola carpeta -->

# 1. Crea la carpeta padre
# Ejemplo: fullstack <- nombre de mi carpeta

# 2. Crear dos carpetas interiores, una para el backend, otra para el # frontend
# Ejemplo: 
            fullstack
            ∟ server   <-- Tu carpeta de BackEnd
            ∟ client   <-- Tu carpeta de FrontEnd

# 3. FrontEnd
## a) Entra en la carpeta a través de la consola: `cd client`
#  b) Crea el proyecto en el framework a elección (en este caso, utilizaré React):

 `npm create vite@latest [nombre de tu proyecto]`
#  Ahora verás algo mas o menos así:
                fullstack
                    ∟ server
                    ∟ client
                        ∟ [nombre de tu proyecto]
                                    ∟ node_modules
                                    ∟ public
                                    ∟ src
                                    ∟ .gitignore
                                    ∟ ...
#  c) Ahora instala las dependencias que necesites
               `npm install`
               `npm install react-router-dom`
               `npm install react-bootstrap`
               
#  d) Ya puedes trabajar en tu Frontend!

# 4. BackEnd
  a) Ingresa a la carpeta de tu backend `cd ../../server` <-- Si todavía te encuentras en la carpeta del frontend ó `cd server` si estas en la carpeta padre
#  b) Comienza a crear el proyecto: `npm init`
#  c) Instala las dependencias
               `npm insta express --save`
               `npm insta mongoose --save`
               `npm insta multer --save`
               `npm insta validator --save`
               `npm insta cors --save`
               `npm insta nodemon --save-dev`
#  d) Ahora, verás una estructura similar a la del FrontEnd
                fullstack
                    ∟ server
                        ∟ node_modules
                        ∟ package.json
                    ∟ client
                        ∟ [nombre de tu proyecto]
                                    ∟ node_modules
                                    ∟ public
                                    ∟ src
                                    ∟ ...
                                    ∟ package.json
    
e) Ubica el archivo llamado package.json dentro de tu carpeta backend, este tendrá una estructura como esta:
            `{
                "name": ...
                "version": ...
                "description": ... `

                "scripts": {
                    "test": ...
                }
                ...
            }
  f) Dentro de escripts, agregarás la siguiente linea: `"dev": "nodemon index.js"`. Te debeía quedar algo así:
            `{
                "name": ...
                "version": ...
                "description": ...`

                "scripts": {
                    "dev": "nodemon index.js",
                    "test": ...
                }
                ...
            }
#  g) Ya puedes trabajar en tu backend 
