const addTodoBtn = document.getElementById('addTodoBtn');
const inputTag = document.getElementById('todoInput');
const todoListUl = document.getElementById('todoList');
const remaining = document.getElementById('remaining-items');
const clearCompletedBtn = document.getElementById('clearCompletedBtn');

let todoText; //This should be stored in local storage
let todos = [];

// Fetching todos from local storage
let todosString = localStorage.getItem("todos");
if (todosString) {
    todos = JSON.parse(todosString);
}

// Making a population function
const populateTodos = () => {
    let string = "";
    for (const todo of todos) {
        string = string + `<li id="todo-${todo.id}"class="todo-item ${todo.isCompleted ? "completed" : ""}" >
            <input type="checkbox" class="todo-checkbox" ${todo.isCompleted ? "checked" : ""} >
            <span class="todo-text">${todo.title}</span>
            <button class="delete-btn">×</button>
        </li>`
    }
    todoListUl.innerHTML = string;


    // Handle clear completed button clicks
    clearCompletedBtn.addEventListener("click", () => {
        todos = todos.filter(todo => !todo.isCompleted);
        localStorage.setItem("todos", JSON.stringify(todos));
        populateTodos();
    })

    // Handle delete button clicks

    let deleteBtns = document.querySelectorAll('.delete-btn');

    deleteBtns.forEach((element) => {
        element.addEventListener("click", (e) => {
            const confirmDelete = confirm("Are you sure you want to delete this todo?");
            if (confirmDelete == true) {
                todos = todos.filter(todo => {
                    return ("todo-" + todo.id) != (e.target.parentElement.id);
                })
                localStorage.setItem("todos", JSON.stringify(todos));
                populateTodos();

            }
            else {
                return;
            }
        })
    })

    // Handle checkbox clicks
    const todoCheckebox = document.querySelectorAll('.todo-checkbox');
    todoCheckebox.forEach((element) => {
        element.addEventListener("click", (e) => {
            if (e.target.checked) {
                element.parentElement.classList.add("completed");
                // Grab this todo from todos array and update its isCompleted to true
                todos = todos.map(todo => {
                    if ("todo-" + todo.id == element.parentElement.id) {
                        return { ...todo, isCompleted: true };

                    }
                    else {
                        return todo;
                    }
                })
                remaining.innerHTML = todos.filter(todo => !todo.isCompleted).length;
                localStorage.setItem("todos", JSON.stringify(todos));

            }
            else {
                element.parentElement.classList.remove("completed");
                // Grab this todo from todos array and update its isCompleted to false
                todos = todos.map(todo => {
                    if ("todo-" + todo.id == element.parentElement.id) {
                        return { ...todo, isCompleted: false };

                    }
                    else {
                        return todo;
                    }
                })
                remaining.innerHTML = todos.filter(todo => !todo.isCompleted).length;
                localStorage.setItem("todos", JSON.stringify(todos));


            }
        })
    })
    remaining.innerHTML = todos.filter(todo => !todo.isCompleted).length;
}

addTodoBtn.addEventListener("click", () => {
    todoText = inputTag.value;
    if (todoText.trim().length <= 3) {
        alert("Todo text must be more than 3 characters");
        return;
    }
    inputTag.value = "";
    let todo = {
        id: "todo-" + Date.now(),
        title: todoText,
        isCompleted: false
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
    populateTodos();
})

// Pupulate todos on page load
populateTodos();

