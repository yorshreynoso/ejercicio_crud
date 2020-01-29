class UserService {

    constructor() {
        this.URI = 'http://localhost:3000/api/users';
         
    }
    async getUsers() {
        const response = await fetch(this.URI); //por defaul se sabe que fetch es de tipo get
        const users = await response.json();
        return users;
        
    }

    // async getUsers () {
    //     await fetch(this.URI)
    //         .then(res => res.json())
    //         .then(user => console.log(user));
    // }

    async postUser(user) {
        return await fetch(this.URI, {     //url 'http://localhost:3000/api/users'
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body:JSON.stringify(user),
        })
        .catch(error => console.error('Error:', error))
        .then(res => res.json());    //validar que si regreso esto
    }

    //hace un get en lugar de post, si funciona
    // postUser(user) {
    //     fetch(this.URI)
    //         .then(res => res.json())
    //         .then(user => console.log(user));
            
        
    //     // const data = await response.json();   //no se necesita retornar
    //     // console.log(data);
    // }

    async deleteUser(userId) {
        const response = await fetch(`${this.URI}/${userId}`, {
            headers: {
                'Content-Type':'application/json'
            },
            method: 'DELETE',
        });
       await response.json();
       //console.log(data);
    }

    async getNickname(nickname) {
        const response = await fetch(`${this.URI}/nickname/${nickname}`);
        //console.log(await response.json());
        return await response.json();

    }

    editUser() {

    }

}

module.exports = UserService;
//export default UserService;
