//import './styles/app.css';
import UI from './UI';
//import validations from './validations';
//import { valid } from 'joi';
const validations = require('./validations');

//localhost:8080 para usuario, interfaz npm run dev
//localhost:3000/api/user para servidor  npm run server:dev

document.addEventListener('DOMContentLoaded', () => {
    const ui = new UI();
    ui.renderUser();
});


document.getElementById('user-form')
    .addEventListener('submit', e => {
        const nickname = document.getElementById('nickname').value;
        const nombre = document.getElementById('nombre').value;
        const apellido = document.getElementById('apellido').value;
        const password = document.getElementById('password').value;
        const correo = document.getElementById('correo').value;
        const role = document.getElementById('role').value;
         
        const data = {
            "Nickname" : nickname,
            "Nombre": nombre,
            "Apellido": apellido,
            "Password": password,
            "Correo": correo,
            "Role": role,
        }
        const emptyField = validations.fieldsEmpty(data);

        if(Array.isArray(emptyField) && emptyField.length > 0 && emptyField){
            // console.log('regresar, tiene campos vacios');
            emptyField.forEach(field => {   //validacion rapida de campos vacios
                const ui = new UI();
                ui.renderMessage(`Favor de añadir ${field}`, 'danger', 5000);
            });

        } else {    //validamos en el back que todo este ok
            const ui = new UI();
            const resultado = ui.addNewUser(data);
            if(resultado) {
                console.log(resultado);
                //ui.renderMessage('usuario añadido con exito', 'success', 2000);
            }
        }

        e.preventDefault(); //previene que se borre el formulario de la vista
});

//eliminar usuario
document.getElementById('users-cards')
    .addEventListener('click', e => {
        //console.log('click');
        if(e.target.classList.contains('delete')) { //buscamos una clase que tenga el nombre delete
            const ui = new UI();
            if (confirm("¿Esta seguro que desea eliminar al usuario?")) {
                ui.deleteUser(e.target.getAttribute('id'));
                ui.renderMessage('usuario eliminado con exito', 'danger', 2000);
            } 
            //ui.renderMessage('todo ok', 'success', 2000);   
        }
        e.preventDefault();

        if(e.target.classList.contains('edit')) {
            const ui = new UI();
            const valor = e.target.getAttribute('id');
            console.log('click edit', valor);
            ui.editUser(valor);
        }
});

document.getElementById('users-cards')
    .addEventListener('click', e => {
         //console.log('click');
        if(e.target.classList.contains('button')) {
            // const id = e.target.getAttribute('ID');
            const nickname = document.getElementById('nickname').value;
            const nombre = document.getElementById('nombre').value;
            const apellido = document.getElementById('apellido').value;
            const password = document.getElementById('password').value;
            const correo = document.getElementById('correo').value;
            const role = document.getElementById('role').value;
            
            //console.log('id', id);
            const data = {
                "Nickname" : nickname,
                "Nombre": nombre,
                "Apellido": apellido,
                "Password": password,
                "Correo": correo,
                "Role": role,
            }

            const emptyField = validations.fieldsEmpty(data);

            if(Array.isArray(emptyField) && emptyField.length > 0 && emptyField){
                // console.log('regresar, tiene campos vacios');
                emptyField.forEach(field => {   //validacion rapida de campos vacios
                    const ui = new UI();
                    ui.renderMessage(`Favor de añadir ${field}`, 'danger', 5000);
                });
    
            } else {    //validamos en el back que todo este ok
                const ui = new UI();
                const resultado = ui.updateUser(data);
                //if(resultado) {
                //    console.log(resultado);
                    //ui.renderMessage('usuario añadido con exito', 'success', 2000);
                //}
            }
    
            e.preventDefault(); //previene que se borre el formulario de la vista
        }
});


