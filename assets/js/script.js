var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector(".task-list");
formEl.addEventListener("submit", taskFormHandler);

createTaskEl = (taskdataObj) => {
    var listItemEl = document.createElement("li");
    listItemEl.className="task-item";
    var taskInfoEL = document.createElement("div");
    taskInfoEL.className="task-info";
    taskInfoEL.innerHTML="<h3 class='task-name'>" + taskdataObj.name + "</h3><span class='task-type'>"+taskdataObj.type+"</span>";
    listItemEl.appendChild(taskInfoEL);
    tasksToDoEl.appendChild(listItemEl);
    formEl.reset();
}
function taskFormHandler(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    if(!taskNameInput || !taskTypeInput){
        alert("You need to fill out the task form!");
        return;
    }
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    }
    createTaskEl(taskDataObj);
}

