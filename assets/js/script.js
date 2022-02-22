var buttonEl = document.querySelector("#save-task");
console.log(buttonEl);
var tasksToDoEl = document.querySelector(".task-list");
createTaskHandler = () => {
    var listItemEl = document.createElement("li");
    listItemEl.textContent = "Enter Task Name";
    listItemEl.className="task-item";
    tasksToDoEl.appendChild(listItemEl);
}
buttonEl.addEventListener("click", createTaskHandler);
