console.log("Welcome to our todo app");

let todos = [];

let todoDataSection = document.getElementById("todo-data");
let saveButton = document.getElementById("saveTodo");
let todoInputBar = document.getElementById("todo-input-bar");

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
    todos.push(data);
    addTodo(data,todos.length);
    todoInputBar.value = '';
})


function addTodo(todoData, todoCount) {
    let rowDiv     = document.createElement('div');
    let todoItem   = document.createElement('div');
    let todoNumber = document.createElement('div');
    let todoDetail = document.createElement('div');
    let todoStatus = document.createElement('div');
    let todoAction = document.createElement('div');
    let deleteBtn  = document.createElement('button');
    let finishedBtn= document.createElement('button');
    let hr         = document.createElement('hr');


    //adding classes
    rowDiv.classList.add("row");
    todoItem.classList.add("todo-item" ,"d-flex" ,"flex-row" ,"justify-content-between" ,"align-items-center");
    todoNumber.classList.add("todo-no");
    todoDetail.classList.add("todo-details", "text-muted");
    todoStatus.classList.add("todo-status", "text-muted");
    todoAction.classList.add("todo-action", "d-flex" ,"justify-content-start", "gap-2");
    deleteBtn.classList.add("btn", "btn-danger");
    finishedBtn.classList.add("btn", "btn-success");

    
    todoNumber.textContent = `${todoCount}.`;
    todoDetail.textContent = todoData;
    todoStatus.textContent = 'In progress';
    deleteBtn.textContent = 'Delete';
    finishedBtn.textContent = 'Finished';


    todoAction.appendChild(deleteBtn);
    todoAction.appendChild(finishedBtn);

    todoItem.appendChild(todoNumber);
    todoItem.appendChild(todoDetail);
    todoItem.appendChild(todoStatus);
    todoItem.appendChild(todoAction);

    rowDiv.appendChild(todoItem);
    rowDiv.appendChild(hr);

    todoDataSection.appendChild(rowDiv);
}