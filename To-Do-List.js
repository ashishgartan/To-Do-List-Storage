const textarea = document.getElementById("textarea");
const left = document.getElementById("left");

const superTaskContainer = document.createElement("div");
superTaskContainer.id = "superTaskContainer";

const deleteAll = document.getElementById("deleteAll");
deleteAll.addEventListener('click',function()
{
    const child = document.querySelectorAll(".task-container");
    if(child.length < 1)
    {
        alert("Task List is already Empty");
    }

    else
    {
        if(confirm("Are you sure you want to delete all task ? You won't be able to recover it back. Are you really want to proceed ? Click (OK) to proceed or click (Cancel) to abort"))
        {
            superTaskContainer.remove();
            superTaskContainer.textContent = ""
            textarea.focus();
            localStorage.removeItem("todo");
        }
    }   
});

var typedTask = "";

textarea.addEventListener('keydown',function(event)
{
    typedTask = textarea.value.trim();
    if(event.key === 'Enter')
    {      
        addToLocalStorage();
        createTaskContainer();
    }
});


function addToLocalStorage()
{
    if(typedTask!== '')
    {
        var value = typedTask;
        var oldData = localStorage.getItem("todo");

        if(oldData)
        {
            value = oldData + value;
            localStorage.setItem("todo",value);
        }
        else
        {
            localStorage.setItem("todo",value);
        }
    }
    
}

function createTaskContainer()
{
   /*  addTask(taskContainer);
    addCheckBox(taskContainer);
    addEditIcon(taskContainer);
    adddeleteBtn(taskContainer);
    left.appendChild(taskContainer); */


    if(typedTask!== '')
    {
        const taskContainer = document.createElement("div");
        taskContainer.classList.add("task-container");

        //Adding  the Task to Task Container
        const newTask = document.createElement("li");
        newTask.classList.add("task");
        //var value = localStorage.getItem('todo');
        newTask.textContent = typedTask;
        taskContainer.appendChild(newTask);


        // Adding CheckBox to Task Container
        const checkBox = document.createElement("input");
        checkBox.type = "checkbox";
        checkBox.classList.add("checkbox");
        checkBox.style.height = "25px";
        checkBox.style.width = "25px";
        taskContainer.appendChild(checkBox);


        // Adding Edit Icon to Task Container
        const editIcon = document.createElement('p');
        editIcon.classList.add("edit-icon");
        editIcon.alt = "Edit - Icon";
        taskContainer.appendChild(editIcon);
        

        // Adding Delete Button to Task Container
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.classList.add("deleteBtn");
        taskContainer.appendChild(deleteBtn);

        // Adding Task Container to Super Task Container
        superTaskContainer.appendChild(taskContainer);

        // Adding Super task Container to Left Side 
        left.appendChild(superTaskContainer);

        // Adding Horizontal Rule to left side below the Task Container
        const hr = document.createElement("hr");
        hr.style.opacity = "0.5";
        hr.style.marginTop = "0px";
        hr.style.marginBottom = "0px";
        superTaskContainer.appendChild(hr);
        
        textarea.value = "";
        textarea.focus();
        //textarea.setSelectionRange(0, 0); 

        /* checkBox.addEventListener('input',function(event)
        {
            if(event.target.value === 'on')
            {
                alert("on");
                console.log(event);
            }
        });
        */

        // CheckBox Edit and Delete button event ko handle krne ke liye function call
        eventHandler(newTask, checkBox, editIcon, deleteBtn, taskContainer, hr ,deleteAll);
    }

    else
    {
        alert("Can't insert Empty Task");
        //textarea.focus();
        textarea.setSelectionRange(0, 0);
    }
    
}

// CheckBox Edit and Delete button event ko handle krne ke liye function definition
function eventHandler(newTask, checkBox, editIcon, deleteBtn, taskContainer, hr)
{
    deleteBtn.addEventListener('click',function()
    {
        if(confirm("Are you sure you want to delete this task ?"))
        {
            superTaskContainer.removeChild(taskContainer);
            superTaskContainer.removeChild(hr);
            var value = taskContainer.value;
            localStorage.removeChild;
        }
    });

    checkBox.addEventListener("click",function(event)
    {
        if(checkBox.checked)
        {
            newTask.style.textDecoration = "line-through";
            newTask.style.color = "red";
        }
        
        if(!checkBox.checked)
        {
            newTask.style.textDecoration = "none";
            newTask.style.color = "black";
        }
    });

    editIcon.addEventListener('click',function()
    {
        let val = "";
        val = prompt("Enter Task");
        console.log(val);

        if(val === null)
        {
            return ;
        }
        else
        {
            if(val === "")
            {
                alert("Can't insert Empty Task");
            }
            else
            {
                newTask.textContent = val;
            }
        }

    });
    textarea.focus();
}
    


/* function addTask(taskContainer)
{
    const newTask = document.createElement("p");
    newTask.id = "task";
    var value = localStorage.getItem('todo');
    newTask.textContent = value;
    taskContainer.appendChild(newTask);
}   
 */

/* function addCheckBox(taskContainer)
{
    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.id="checkbox";
    checkBox.style.height = "25px";
    checkBox.style.width = "25px";
    taskContainer.appendChild(checkBox);
} */

/* function addEditIcon(taskContainer)
{
    const editIcon = document.createElement('p');
    editIcon.classList.add("edit-icon");
    //editIcon.src = 'E:/Akash/MCA/Kurukshetra University/Training Code Quotient/Web Programs/edit-icon.jpeg';
    editIcon.alt = "Edit - Icon";
    taskContainer.appendChild(editIcon);
} */
/* 
function adddeleteBtn(taskContainer)
{
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.id = "deleteBtn";
    taskContainer.appendChild(deleteBtn);
} */


/* function displayTask()
{
    createTaskContainer();
    left.appendChild(taskContainer);
    const hr = document.createElement("hr");
    hr.style.opacity = "0.5";
    hr.style.marginTop = "0px";
    hr.style.marginBottom = "0px";
    left.appendChild(hr);
} */




/* const textarea = document.getElementById("textarea");

let typedText = " ";
textarea.addEventListener('keydown', function(event) {
    typedText = textarea.value; // Update the typedText variable
    //
    
    localStorage.setItem('todo',typedText);
    if (event.key === 'Enter') 
    {
        addTast();
    }
});

function addTast()
{
    const taskContainer = document.createElement("div");
    taskContainer.classList.add("task-container");

    const newTask = document.createElement("p");
    newTask.id = "task";
    newTask.textContent = typedText;

    const checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.id="checkbox";
    checkBox.style.height = "25px";
    checkBox.style.width = "25px";

    const left = document.getElementById("left");


    taskContainer.appendChild(newTask);
    taskContainer.appendChild(checkBox);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.id = "deleteBtn";
    taskContainer.appendChild(deleteBtn);

    left.appendChild(taskContainer);

    const hr = document.createElement("hr");
    hr.style.opacity = "0.5";
    hr.style.marginTop = "0px";
    hr.style.marginBottom = "0px";
    left.appendChild(hr);

    textarea.value = " ";
    //textarea.focus();
}


function displayTask()
{

} */