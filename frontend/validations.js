import UI from './UI';


function fieldsEmpty (data) {
    let missingField = [];
    for( let key in data ) {
        if(!data[key]) {
            missingField.push(key);
        }
    }
    return missingField;
}

async function nicknameValid (nickname) {
    let temp = false;
    const ui = new UI();
    const res = await ui.getNickname(nickname);
    console.log(res);
    if(res.message == 'success') {
        ui.renderMessage(res.message, res.colorMessage, res.secondsToRemove);
        temp = true;
    } else {
        ui.renderMessage(res.message, res.colorMessage, res.secondsToRemove);
        temp = false;
    }
    //return temp;
}

//module.exports = validations;
export { fieldsEmpty, nicknameValid };