var formEl = document.querySelector("#task-form");
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector(".task-list");
formEl.addEventListener("submit", createTaskHandler);

function createTaskHandler(event) {
    event.preventDefault();
    var listItemEl = document.createElement("li");
    listItemEl.textContent = "This is sampel";
    listItemEl.className="task-item";
    tasksToDoEl.appendChild(listItemEl);
}
