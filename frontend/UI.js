// const UserService =require('./services/UserService');
import UserService from './services/UserService';
const userService = new UserService();  //lo instancio porque es una clase


class UI {

    async renderUser() {
        const users = await userService.getUsers();
        //console.log(users);
        const usersCardContainer = document.getElementById('users-cards');
        usersCardContainer.innerHTML = ''; //vaciar el contenedor;
        users.forEach( user => {
            const rol = user.Rol == 1 ? 'Admin' : user.Rol == 2 ? 'Admnistrativo' : 'Operador';
            const div = document.createElement('div');
            div.className = '';
            div.innerHTML = `
                <div class="card m-2>
                    <div class="row">
                        <div class="col-md-8">
                            <div class="card-block px-2>
                                <p class="card-text"><b>Nombre :</b>${user.Nombre} ${user.Apellido}</p>
                                <p class="card-subtitle mb-2 text-muted"><b>Nickname:</b>${user.Nickname}</p>
                                <!-- <h4 class="card-text">${user.Password}</h4> -->
                                <p class="card-text"><b>Rol:</b> ${rol}</p>
                                <a href="#" class="btn btn-danger delete" Id="${user.Id}">X</a>
                                <a href="#" class="btn btn-secondary edit" Id="${user.Id}">Editar</a>
                                
                            </div>
                        </div>
                    </div>
                </div>
            `
            usersCardContainer.appendChild(div);
        });
    }

    async addNewUser(usuario) {
        const resDB = await userService.postUser(usuario);
        // console.log(resDB);
        this.renderMessage(resDB.message, resDB.colorMessage, resDB.secondsToRemove) 
        //this.clearUserForm();
        // this.renderUser();
    }

    //limpiar formulario
    clearUserForm() {
        document.getElementById('user-form').reset();
    }


    //enviar mensaje
    //creamos una clase para insertarla en el html y mostramos una alerta
    renderMessage(message, colorMessage, secondsToRemove) {
        const div = document.createElement('div')
        div.className = `alert alert-${colorMessage} message`
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.col-md-4' );
        const userForm = document.querySelector('#user-form');
        container.insertBefore(div, userForm);
        setTimeout(() => {
            document.querySelector('.message').remove();
        },secondsToRemove);
    }

    deleteUser(userId) {
        userService.deleteUser(userId);
        setTimeout( () => {
            this.renderUser();
        }, 10);
    }

    getNickname(userNickname) {
        return userService.getNickname(userNickname);
    }
}

// module.exports = UI;

export default UI;