console.log("Welcome to our todo app");


let getTodosButton = document.getElementById('getTodos');
let todoElement = document.getElementsByClassName('todo-details');
let todoAction = document.getElementsByClassName('todo-action');

//registration of event listener
// getTodosButton.addEventListener("click",() => {
//     console.log("Clicked");
// })

todoElement[1].addEventListener("click",() => {
    console.log("Enetered");
})


todoAction[1].addEventListener("mouseover",handler);



function handler() {
    console.log("hiii");
}


getTodosButton.onclick = () => {
    console.log("hey from without event listener");
}

function clickBtn() {
    console.log("click......");
}