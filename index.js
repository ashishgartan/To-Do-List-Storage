const addUserBtn = document.getElementById('addUser');
const usernameTextField = document.getElementById('username');
const recordsDisplay = document.getElementById('records');

let btntext = addUserBtn.innerText;
let edit_id = null;

//userArray

let userArray = [];

let objStr = localStorage.getItem('users');
if (objStr != null) {
    userArray = JSON.parse(objStr);
}

DisplayInfo();
addUserBtn.onclick = () => {
    let name = usernameTextField.value.trim();
    if (name == '') {
        alert("No Empty names allowed");
        usernameTextField.value = '';
        return;
    }

    if (edit_id == null) {
        //insert
        let userid = Date.now();
        let username = name;
        userArray.push({
            name: username,
            id: userid,
            isChecked: false
        });
        let newdiv = document.createElement('div');
        
        newdiv.classList.add('row');
        newdiv.id = `${userid}`;
        newdiv.innerHTML = 
            `<div class="col-md-4">${username}</div>
            <div class="col-md-4">
                <div class="form-check form-switch ">
                <input class="form-check-input" type="checkbox" role="switch" onchange="checkboxChanged('${userid}')" id="flexSwitchCheckChecked">
                </div>
            </div>
            <div class="col-md-4">
                <i class="btn mx-3 fa-regular fa-pen-to-square" onclick='EditInfo("${userid}")'></i>
                <i class="btn fa-solid fa-trash" onclick='DeleteInfo("${userid}")'></i>
            </div>`
        recordsDisplay.appendChild(newdiv);

    }
    else {
        //edit
        let currentuser = document.getElementById(edit_id);
        currentuser.firstElementChild.innerHTML = name;
        userArray = userArray.map((user) => {
            if (user.id == edit_id) {
                user.name = name;
            }
            return user;
        });
    }

    SaveInfo(userArray);
    console.log('New user added');
    console.log(userArray);
    usernameTextField.value = '';

    addUserBtn.innerText = btntext;
}

function SaveInfo(userArray) {
    let str = JSON.stringify(userArray);
    console.log(str);
    localStorage.setItem('users', str);
    //DisplayInfo();
}

function DisplayInfo() {
    let statement = '';
    if (userArray.length) {
        userArray.forEach((user) => {
            statement += `<div class="row" id="${user.id}">
            <div class="col-md-4">${user.name}</div>`;
            if (user.isChecked === true) {
                statement += 
                `<div class="col-md-4">
                <div class="form-check form-switch ">
                    <input class="form-check-input" type="checkbox" role="switch" onchange="checkboxChanged('${user.id}')" id="flexSwitchCheckChecked" checked>
                </div>
                </div>`
            }
            else {
                statement += `<div class="col-md-4 ">
               <div class="form-check form-switch">
                    <input class="form-check-input" type="checkbox" role="switch" onchange="checkboxChanged('${user.id}')" id="flexSwitchCheckChecked">
               </div>
            </div>`
            }

            statement +=
                `<div class="col-md-4">
                    <i class="btn mx-3 fa-regular fa-pen-to-square" onclick='EditInfo("${user.id}")'></i>
                    <i class="btn fa-solid fa-trash" onclick='DeleteInfo("${user.id}")'></i>
                </div>
            </div>`
            recordsDisplay.innerHTML = statement;
        });

    }
    else {
        recordsDisplay.innerHTML = "";
    }
    //console.log(statement);
}

function checkboxChanged(rowid) {
    // Your code to handle the checkbox state change goes here
    console.log("Checkbox state changed" + rowid);
    userArray = userArray.map((user) => {
        if (user.id == rowid) {
            user.isChecked = !(user.isChecked);
        }
        return user;
    })
    SaveInfo(userArray);
}

function EditInfo(rowid) {
    let currentContent = document.getElementById(rowid).firstElementChild.textContent;
    usernameTextField.value = currentContent;
    addUserBtn.innerHTML = 'Save Changes';
    edit_id = rowid;
    console.log("Edit Calling " + rowid + " " + currentContent);
    console.log('user edited');
}

//delete function all good working
function DeleteInfo(rowid) {
    console.log('Delete calling' + rowid);

    userArray = userArray.filter((user) => {
        return user.id != rowid;
    });

    recordsDisplay.removeChild(document.getElementById(rowid));    
    SaveInfo(userArray);

    console.log('user deleted');
}

