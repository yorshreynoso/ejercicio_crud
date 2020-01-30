EjercicioCRUD

Descargar e instalar NodeJs de la pagina oficial.
Una vez instalado crear nuestro proyecto
npm init install -y     //inicio package json
se omitió la instalacion de pugjs y se utilizó HTML 
//npm install pug -g instalo pug de forma global

instalamos las libreras siguientes: 
npm -i express //instalo express para conectar mi api 
npm -i morgan //funciona para visualizar peticiones http en consola 
npm install nodemon -D //recompilar codigo 
npm install mysql //instalar mysql como base de datos 
npm install express-myconnection //utilizar mysql con express mas sencillo, agrega a req el método getConnection
npm i webpack webpack-cli html-webpack-plugin css-loader style-loader mini-css-extract-plugin webpack-dev-server -D npm install cors //permite correr dos servidores a la par

npm run server:dev //lo que hace es regenerar la parte del front tipo nodemon y genera un nuevo servidor en el puerto localhost:8080, esto lo hace webpack



BASE DE DATOS CREATE SCHEMA base_de_datos_prueba ; //crear base de datos
CREATE TABLE base_de_datos_prueba.usuarios ( Id INT NOT NULL AUTO_INCREMENT, Nickname VARCHAR(45) UNIQUE INDEX `Nickname_UNIQUE` NOT NULL, Nombre VARCHAR(45) NOT NULL, Apellido VARCHAR(45) NOT NULL, Password VARCHAR(45) NOT NULL, Rol VARCHAR(45) NOT NULL, Correo VARCHAR(45) NOT NULL, PRIMARY KEY (Id));
para correr el Front-End hay que correr el comando:
npm run dev

para correr el Back-End hay que abrir una nueva consola y correr el comando:
npm run server:dev

para visualizar la app hay que abrir la siguiente url: 
<a href='http://localhost:8080'> </a>

el back corre en el puerto 3000 
<a href='http://localhost:3000/api/user'> </a>para servidor
