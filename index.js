const addUserBtn = document.getElementById("addUser");
const usernameTextField = document.getElementById("username");
const recordsDisplay = document.getElementById("records");

let btntext = addUserBtn.innerText;
let edit_id = null;

let userArray = [];

let objStr = localStorage.getItem("users");
if (objStr != null) {
  userArray = JSON.parse(objStr);
}

DisplayInfo();

// 🔘 Add user or edit user
addUserBtn.onclick = () => {
  let name = usernameTextField.value.trim();
  if (name == "") {
    alert("No empty names allowed");
    usernameTextField.value = "";
    return;
  }

  // ❌ Prevent duplicate names (optional)
  if (edit_id == null && userArray.some((user) => user.name === name)) {
    alert("Name already exists!");
    usernameTextField.value = "";
    return;
  }

  if (edit_id == null) {
    // INSERT
    let userid = Date.now();
    userArray.push({
      name: name,
      id: userid,
      isChecked: false,
    });
  } else {
    // EDIT
    userArray = userArray.map((user) => {
      if (user.id == edit_id) {
        user.name = name;
      }
      return user;
    });
    edit_id = null;
    addUserBtn.innerText = btntext;
  }

  SaveInfo(userArray);
  DisplayInfo();
  usernameTextField.value = "";
  console.log("✅ Updated userArray:", userArray);
};

// 💾 Save to localStorage
function SaveInfo(userArray) {
  let str = JSON.stringify(userArray);
  localStorage.setItem("users", str);
}

// 🖼️ Display all user rows
function DisplayInfo() {
  let statement = "";
  if (userArray.length) {
    userArray.forEach((user) => {
      statement += `
            <div class="row" id="${user.id}">
                <div class="col-md-4">${user.name}</div>
                <div class="col-md-4">
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" onchange="checkboxChanged('${
                          user.id
                        }')" id="flexSwitchCheckChecked" ${
        user.isChecked ? "checked" : ""
      }>
                    </div>
                </div>
                <div class="col-md-4">
                    <i class="btn mx-3 fa-regular fa-pen-to-square" onclick='EditInfo("${
                      user.id
                    }")'></i>
                    <i class="btn fa-solid fa-trash" onclick='DeleteInfo("${
                      user.id
                    }")'></i>
                </div>
            </div>`;
    });
    recordsDisplay.innerHTML = statement;
  } else {
    recordsDisplay.innerHTML = "";
  }
}

// 🔁 Toggle checkbox
function checkboxChanged(rowid) {
  userArray = userArray.map((user) => {
    if (user.id == rowid) {
      user.isChecked = !user.isChecked;
    }
    return user;
  });
  SaveInfo(userArray);
  console.log("✅ Checkbox toggled:", rowid);
}

// ✏️ Edit user
function EditInfo(rowid) {
  let currentContent =
    document.getElementById(rowid).firstElementChild.textContent;
  usernameTextField.value = currentContent;
  addUserBtn.innerText = "Save Changes";
  edit_id = rowid;
  console.log("✏️ Edit:", rowid);
}

// 🗑️ Delete user
function DeleteInfo(rowid) {
  userArray = userArray.filter((user) => user.id != rowid);
  SaveInfo(userArray);
  DisplayInfo();
  console.log("🗑️ Deleted:", rowid);
}

// ⌨️ Allow Enter key to trigger Add button (optional)
usernameTextField.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addUserBtn.click();
  }
});
