var taskIDCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector(".task-list");
formEl.addEventListener("submit", taskFormHandler);

createTaskEl = (taskdataObj) => {
    var listItemEl = document.createElement("li");
    listItemEl.className="task-item";
    listItemEl.setAttribute("data-task-id", taskIDCounter);
    var taskInfoEL = document.createElement("div");
    taskInfoEL.className="task-info";
    taskInfoEL.innerHTML="<h3 class='task-name'>" + taskdataObj.name + "</h3><span class='task-type'>"+taskdataObj.type+"</span>";
    listItemEl.appendChild(taskInfoEL);
    listItemEl.appendChild(createTaskActions(taskIDCounter));
    tasksToDoEl.appendChild(listItemEl);
    
    formEl.reset();
    taskIDCounter++;
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

var createTaskActions = (taskID) => {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button
    var editTaskButton = document.createElement("button");
    editTaskButton.className="btn edit-btn";
    editTaskButton.textContent = "Edit";
    editTaskButton.setAttribute("data-task-id", taskID);
    
    //create delete button
    var deleteTaskButton = document.createElement("button");
    deleteTaskButton.className = "btn delete-btn";
    deleteTaskButton.textContent="Delete";
    deleteTaskButton.setAttribute("data-task-id",taskID);


    //create actions dropdown to change status of task
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskID);

    var statusChoices = ["To Do","In Progress", "Completed"];
    for(var i=0; i<statusChoices.length;i++){
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }
    //adding action buttons and menu to div
    actionContainerEl.appendChild(editTaskButton);
    actionContainerEl.appendChild(deleteTaskButton);
    actionContainerEl.appendChild(statusSelectEl);


    
    return actionContainerEl;
}



