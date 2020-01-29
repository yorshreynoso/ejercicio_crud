const pool = require('../database');
//const validation = require('../validation');
const Joi = require('joi');


const controller = {};


controller.list = ( async(req, res) => {
    const usuarios = await pool.query('SELECT * FROM usuarios');

    res.json(usuarios);
});

controller.save = ( async(req, res) => {
    console.log("entro para almacenar usuario");
    const { Nickname, Nombre, Apellido, Password, Role, Correo} = req.body; //hacemos destructuring
    console.log("password ->",Password);
    console.log("role ->",Role);

    const payload = req.body;
    //validation

    const schema = Joi.object().keys({
        Nickname : Joi.string().trim().regex(/^[a-zA-Z_][a-zA-Z0-9_]*/).required(),
        Nombre: Joi.string().trim().regex(/[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).required(),
        Apellido: Joi.string().trim().regex(/[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/).required(),
        Password: Joi.required(),
        Role: Joi.number().min(1).max(3).required(),
        Correo: Joi.string().email().required()
    });

    const { value, error} = Joi.validate(payload, schema);
    if(error) {
        const detail = error.details[0].path;
        console.log(error.details[0]);
        res.json({
            message: `Favor de verificar el campo: " ${detail} "`,
            colorMessage: 'danger',
            secondsToRemove: 3000
        });
    } else {

        let data = await pool.query('SELECT 1 AS Nickname FROM usuarios where Nickname = ?', Nickname); //validamos nuevamente nickname
        //console.log( data);
         if(Array.isArray(data) && data.length) {
            res.json({
                message: 'El usuario ya existe',
                colorMessage: 'danger',
                secondsToRemove: 3000
            });
         } else {

             // console.log(value);
             const resDB = await pool.query('INSERT INTO usuarios set ?', [{Nickname, Nombre, Apellido, Password, Role, Correo }]);
             console.log("del query",resDB);
             if(resDB.affectedRows == 1 ){
                 res.json({
                    message: 'Usuario creado correctamente',
                    colorMessage: 'success',
                    secondsToRemove: 3000
                });
             } else {
                res.json({
                    message: 'Ocurrio un error al insertar en la base de datos',
                    colorMessage: 'danger',
                    secondsToRemove: 3000
                });
             }
         }




    }




    // res.redirect('/');
});

controller.erase = (async(req, res) => {
    const {id} = req.params;
    await pool.query('DELETE FROM usuarios WHERE Id = ?', [id]);
    res.json({ message: 'usuario eliminado', id });
});

controller.edit = (async(req, res) => {
    console.log('en desarrollo');
    const {id} = req.params;
    const userEdit = await pool.query('SELECT * FROM usuarios WHERE Id = ?', [id]);
    //console.log(userEdit);
    res.json(userEdit[0]);
});

controller.update = ( async(req, res) => {
    // console.log(req.params);
    const { id } = req.params;
    const { nombre, apellido, password, rol, correo } = req.body;
    const qie = await pool.query('UPDATE usuarios set ? WHERE Id = ?', [{nombre, apellido, password, rol, correo}, id ]);
    res.json({message: 'usuario editado correctamente'});
});

controller.search = (async(req, res) => {
    const payload = req.params ;

    const schema = Joi.object().keys({
        nickname: Joi.string().trim().regex(/^[a-zA-Z_][a-zA-Z0-9_]*/).required()
    });

    const { value, error} = Joi.validate(payload, schema);
    if(error) {
        console.log(error);
        res.json({
            message: 'Nickname invalido, verificar que no inicie con numeros y que no contenga caracteres especiales',
            colorMessage: 'danger',
            secondsToRemove:3000
        });
    }
    let data = await pool.query('SELECT 1 AS Nickname FROM usuarios where Nickname = ?', payload.nickname);
   //console.log( data);
    if(Array.isArray(data) && data.length) {
        // res.json( {error :'El usuario ya existse'});
        res.json({
            message: 'El usuario ya existe',
            colorMessage: 'danger',
            secondsToRemove:3000
        });
    } else {
        // res.json( {message :'El usuario es valido'});
        res.json({
            message: 'Nickname valido',
            colorMessage: 'success',
            secondsToRemove:3000
        });
    }
});

module.exports = controller;


