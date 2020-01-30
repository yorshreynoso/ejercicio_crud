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
                                <p class="card-text"><b>Nombre :</b> ${user.Nombre} ${user.Apellido}</p>
                                <p class="card-subtitle mb-2 text-muted"><b> Nickname:</b>${user.Nickname}</p>
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
        this.clearUserForm();
        this.renderUser();
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

    //borar usuario
    async deleteUser(userId) {
        await userService.deleteUser(userId);
        this.renderUser();
    };
 

    getNickname(userNickname) {
        return userService.getNickname(userNickname);
    }

    async editUser(userId) {
        const user = await userService.getUser(userId);

        const userEditcardContainer = document.getElementById('users-cards');
        userEditcardContainer.innerHTML = '';   //vaciamos contenedor
        document.getElementById("save").remove();
        const div = document.createElement('div');
        div.className = '';
        //document.getElementById('ID').value = user.Id;
        document.getElementById('nickname').value  = user.Nickname;
        document.getElementById('nickname').readOnly = true;    //solo lectura
        document.getElementById('nombre').value = user.Nombre;
        document.getElementById('apellido').value = user.Apellido;
        document.getElementById('password').value = user.Passowrd;
        document.getElementById('correo').value = user.Correo;
        document.getElementById('role').value = user.Role;

        div.innerHTML = `
        <div class="guardar">
            <button id='modify' class="btn btn-primary button">
                Guardar cambios
            </button>
        </div>
        `
        userEditcardContainer.appendChild(div);
    }

    //UPDATE user
    async updateUser(data) {
        const resUpdate = await userService.updateUser(data);
       this.renderMessage(resUpdate.message, resUpdate.colorMessage, resUpdate.secondsToRemove);
       //this.clearUserForm();
       window.location = "http://localhost:8080/";
    }
}

// module.exports = UI;

export default UI;