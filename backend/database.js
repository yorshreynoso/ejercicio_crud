const mysql = require('mysql');
const {promisify} = require('util');   //pool no soporta promesas pero con este modulo, sí

//configuracion de DB
const pool = mysql.createPool({
    host: "localhost",
    user: 'root',
    password : '',
    port: 3306,
    database: "base_de_datos_prueba"
});

//valida si se conecto correctamente
pool.getConnection((err, connection) => {
    if(err) {
        if (err.code == 'PROTOCOL_CONNECTION_LOST') { console.error('conexion a la BD cerrada'); }
        if (err.code == 'ER_CON_COUNT_ERROR') { console.error('Demasiadas conexiones a la BD'); }
        if(err.code == 'ECONNREFUSED') { console.error('conexion rechazada, encender base de datos'); }
    }
    if (connection) {
        connection.release();
        console.log('Conectado a la BD');
        return
    }
});

//convertimos a promesas, ya que pool soporta solo callbacks
 pool.query = promisify(pool.query);

  module.exports = pool;