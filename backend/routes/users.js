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

//EDIT editar usuario, no se va a usar en
router.get('/edit/:id', userController.edit);

//UPDATE actualizar usuario
router.post('/edit/:id', userController.update);

//GET buscar usuario por nickname
router.get('/nickname/:nickname', userController.search);

//GET traer informacion de usuario por Id
router.get('/user/:id', userController.getUser);

//PUT actualizar usuario
router.put('/update/:Nickname', userController.update);




module.exports = router;