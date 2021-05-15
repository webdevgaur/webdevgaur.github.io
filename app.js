//SELECTORS
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//EVENT LISTENERS
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener("click", deleteCheck);

//FUNCTIONS
function addTodo(event) {
    event.preventDefault();

    //Create todo div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create list item inside the div
    
        const newToDo = document.createElement("li");
        newToDo.innerText = todoInput.value;
        newToDo.classList.add("todo-item");
    

    //Insert list item inside div
    todoDiv.appendChild(newToDo);

    //Add todo to local storage
    saveLocalTodos(todoInput.value);

    //Create check mark button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("completed-btn");
    todoDiv.appendChild(completedButton);

    //Create trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //Insert todo div inside unordered list
    todoList.appendChild(todoDiv);

    //Clear input field on button press
    todoInput.value = "";

}

function deleteCheck(e) {
    e.stopPropagation();
    const item = e.target;
    const todo = item.parentElement;

    if (item.classList[0] === "trash-btn") {
        todo.classList.add("fall");
        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
        
    }

    if (item.classList[0] === "completed-btn") {
        todo.classList.toggle("completed");
    }
}

function saveLocalTodos (todo) {
    //Checking if todos already present
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos =[];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
   
    //Checking if todos already present
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos =[];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(function(todo) {
        //Create todo div
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        //Create list item inside the div
        
        const newToDo = document.createElement("li");
        newToDo.innerText = todo;
        newToDo.classList.add("todo-item");
        

        //Insert list item inside div
        todoDiv.appendChild(newToDo);

        //Create check mark button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add("completed-btn");
        todoDiv.appendChild(completedButton);

        //Create trash button
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        //Insert todo div inside unordered list
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem('todos') === null) {
        todos =[];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1); 
    localStorage.setItem('todos', JSON.stringify(todos));
}