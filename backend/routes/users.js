const {Router} = require('express');
const router = Router();    //asignamos el metodo Router de express a una variable para mejor manejo
const userController = require('../controller/userController');

//CRUD
//GET, Listar todos los usuarios
router.get('/', userController.list );

//POST, new user
router.post('/', userController.save);

//DELETE, borrar usuario
router.delete('/:id', userController.erase);

//EDIT editar usuario
router.get('/edit/:id', userController.edit);

//UPDATE actualizar usuario
router.post('/edit/:id', userController.update);

//GET buscar usuario por nickname
router.get('/nickname/:nickname', userController.search); //falta desarrollo


module.exports = router;