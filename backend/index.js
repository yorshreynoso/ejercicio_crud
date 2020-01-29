const express = require('express'); //manejo de api
const morgan = require('morgan');
const mysql = require ('mysql');
const myConnection = require('express-myconnection');
const path = require('path');
const cors = require('cors');   //permite que corran dos servidores a la par

const PORT = 3000;

//inicitialization
const app = express();

//settings
app.set('port', PORT);

app.use(myConnection(mysql, {
    host: "localhost",
    user: 'root',
    password : '',
    port: 3306,
    database: "base_de_datos_prueba"
}, 'single'));   



//middleware
app.use(morgan('dev')); //cacha las peticiones del lado del cliente y se reciben en el back

app.use(express.urlencoded({extended: false})); // interpretar el formulario como json false
app.use(express.json()); //recibir json
app.use(cors());

//routes
app.use('/api/users', require('./routes/users'));

//static files, le digo a que carpeta tiene acceso nuestro navegador
//http://localhost:3000/index.html
app.use(express.static(path.join(__dirname, 'public'))); //html css js, archivos no dinamicos



//start server http:localhost:3000, node .\backend\index.js
app.listen(app.get('port'), () => {
    console.log('server on port ', app.get('port'));    //imprime el puerto en el que esta corriendo
});