var input = document.getElementById("inputAdd");
var button = document.getElementById("buttonAdd");
var list = document.getElementById("list");

function removeTodoLocalStorage(i) {
    var todos = getTodosFromStorage();

    todos.splice(i, 1);

    saveTodosToStorage(todos);
}

function addToLocalStorage(text) {
    var todos = getTodosFromStorage();

    todos.push({
        text: text,
        completed: false
    });

    saveTodosToStorage(todos);
}

function completeTodo(target) {
    var todos = getTodosFromStorage();

    var id = target.id;
    var todo = todos[id];
    todo.completed = !todo.completed;

    saveTodosToStorage(todos);
}

function removeTodo(target){
    var todo = target.parentElement;
    var id = todo.id;

    removeTodoLocalStorage(id);
}

function onClickTodo(event) {
    var target = event.target;
    var tag = target.tagName;

    if (tag === 'LI'){
        completeTodo(target);
    }
    if (tag === 'SPAN'){
        removeTodo(target);
    }

    rander();
}

function addToHTML(text, completed, i) {
    var todo = document.createElement('li');
    todo.innerHTML = text + '<span class = "close">x</span>';
    todo.id = i;

    if (completed){
        todo.className = "completed";
    }

    todo.addEventListener('click',onClickTodo);
    list.appendChild(todo);
}

function getTodosFromStorage() {
    var str = localStorage.getItem('todos');

    if(!str){
        return [];
    }

    try {
        return JSON.parse(str);
    }
    catch (error){
        return [];
    }
}

function saveTodosToStorage(todos) {
    var str = JSON.stringify(todos);
    return localStorage.setItem('todos', str);
}

function emptyInput() {
    input.value = '';
}

function clearList() {
    list.innerHTML = '';
}

function rander() {
    clearList();

    var todos = getTodosFromStorage();

    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i];

        addToHTML(todo.text, todo.completed, i);
    }
}

button.addEventListener('click', function () {
    var text = input.value;

    addToLocalStorage(text);
    rander();
    emptyInput();
});

rander();
