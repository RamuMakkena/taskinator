var formEl = document.querySelector("#task-form");
var buttonEl = document.querySelector("#save-task");
var tasksToDoEl = document.querySelector(".task-list");
formEl.addEventListener("submit", createTaskHandler);

function createTaskHandler(event) {
    event.preventDefault();
    var listItemEl = document.createElement("li");
    listItemEl.className="task-item";

    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    var taskInfoEL = document.createElement("div");
    taskInfoEL.className="task-info";
    taskInfoEL.innerHTML="<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>"+taskTypeInput+"</span>";
    listItemEl.appendChild(taskInfoEL);
    tasksToDoEl.appendChild(listItemEl);
}
