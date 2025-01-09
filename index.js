console.log("Welcome to our todo app");

let todos = [];

let todoDataList = document.getElementById("todo-data-list");
let saveButton = document.getElementById("saveTodo");
let todoInputBar = document.getElementById("todo-input-bar");
let getPendingTodosBtn = document.getElementById("getTodos");

getPendingTodosBtn.addEventListener("click",() => {
    todos = todos.filter((todo) => todo.status !== 'Done');
    reRenderTodos();
})

todoInputBar.addEventListener('keyup',function toggleSaveButton() {
    const data = todoInputBar.value;
    if(data.length === 0) {
        if(saveButton.classList.contains('disabled')) return;
        saveButton.classList.add('disabled');
    }
    else if(saveButton.classList.contains('disabled')){
        saveButton.classList.remove('disabled');
    }
    
})

saveButton.addEventListener('click',function getTextAndAdd() {
    const data = todoInputBar.value;
    if(data.length === 0) return;
    let todo = {text: data,status: 'In Progress',finishButtonText: 'Finished'}
    todos.push(todo);
    addTodo(todo,todos.length);
    todoInputBar.value = '';
})


function reRenderTodos() {
    todoDataList.innerHTML = '';
    todos.forEach((ele,idx) => {
        addTodo(ele,idx+1);
    });
}

function removeTodo(event) {
    //event.target.parentElement.parentElement.parentElement.remove();

    let deleteBtnPressed = event.target;
    let indexToBeRemoved = Number(deleteBtnPressed.getAttribute('todo-idx'));
    todos.splice(indexToBeRemoved,1);
    reRenderTodos();
}


function finishTodo(event) {
    let finishBtnPressed = event.target;
    let indexToBeFinsihed = Number(finishBtnPressed.getAttribute('todo-idx'));
    if(todos[indexToBeFinsihed].status == 'Done') {
        todos[indexToBeFinsihed].status = 'In Progress';
        todos[indexToBeFinsihed].finishButtonText = 'Finished';
    } else{
        todos[indexToBeFinsihed].status = 'Done';
        todos[indexToBeFinsihed].finishButtonText = 'Undo';
    } 

    todos.sort((a,b) => {
        if(a.status === 'Done') {
            return 1;
        }

        return -1;
    })

    reRenderTodos();
}

function editTodo(event) {
    let editBtnPressed = event.target;
    let indexToEdit = Number(editBtnPressed.getAttribute("todo-idx"));
    //let todoItem = event.target.parentElement.parentElement;
    let detailDiv = document.querySelector(`div[todo-idx="${indexToEdit}"]`);
    let input = document.querySelector(`input[todo-idx="${indexToEdit}"]`);
    detailDiv.style.display="none";
    input.type="text";
    input.value = detailDiv.textContent;
}

function saveEdittedTodo(event) {
    let input = event.target;
    let indexToEdit = Number(input.getAttribute("todo-idx"));
    let detailDiv = document.querySelector(`div[todo-idx="${indexToEdit}"]`);
   
    if(event.keyCode === 13) {
        detailDiv.textContent = input.value;
        detailDiv.style.display = "block";
        input.value = '';
        input.type = "hidden";
    }
}


function addTodo(todo, todoCount) {
    let rowDiv     = document.createElement('div');
    let todoItem   = document.createElement('div');
    let todoNumber = document.createElement('div');
    let todoDetail = document.createElement('div');
    let todoStatus = document.createElement('div');
    let todoAction = document.createElement('div');
    let deleteBtn  = document.createElement('button');
    let finishedBtn= document.createElement('button');
    let editBtn    = document.createElement('button');
    let hiddenInput= document.createElement("input");
    let hr         = document.createElement('hr');


    //adding classes
    rowDiv.classList.add("row");
    todoItem.classList.add("todo-item" ,"d-flex" ,"flex-row" ,"justify-content-between" ,"align-items-center");
    todoNumber.classList.add("todo-no");
    todoDetail.classList.add("todo-details", "text-muted");
    todoStatus.classList.add("todo-status", "text-muted");
    todoAction.classList.add("todo-action", "d-flex" ,"justify-content-start", "gap-2");
    deleteBtn.classList.add("btn", "btn-danger", "delete-todo");
    finishedBtn.classList.add("btn", "btn-success", "finish-todo");
    editBtn.classList.add("btn","btn-warning","edit-todo");
    hiddenInput.classList.add("form-control","todo-details");


    finishedBtn.setAttribute("todo-idx",todoCount-1);
    deleteBtn.setAttribute("todo-idx",todoCount-1);
    editBtn.setAttribute("todo-idx",todoCount-1);
    todoDetail.setAttribute("todo-idx",todoCount-1);
    hiddenInput.setAttribute("todo-idx",todoCount-1);
    hiddenInput.addEventListener("keypress",saveEdittedTodo);
    deleteBtn.onclick = removeTodo;
    finishedBtn.onclick = finishTodo;
    editBtn.onclick = editTodo;
    hiddenInput.type = 'hidden';
    
    todoNumber.textContent = `${todoCount}.`;
    todoDetail.textContent = todo.text;
    todoStatus.textContent = todo.status;
    deleteBtn.textContent = 'Delete';
    finishedBtn.textContent = todo.finishButtonText;
    editBtn.textContent = 'Edit';


    todoAction.appendChild(deleteBtn);
    todoAction.appendChild(finishedBtn);
    todoAction.appendChild(editBtn);

    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(hiddenInput);
    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoAction);

    rowDiv.appendChild(todoItem);
    rowDiv.appendChild(hr);

    todoDataList.appendChild(rowDiv);
}