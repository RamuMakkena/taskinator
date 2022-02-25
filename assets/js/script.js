var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksComepltesEl = document.querySelector("#tasks-completed");
var pageContentEl = document.querySelector("#page-content");
var taskIDCounter = 0;
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector(".task-list");

var tasks = [];

formEl.addEventListener("submit", taskFormHandler);

var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

var loadtasks = function () {
    var obj = localStorage.getItem("tasks");
    if (!obj) {
        return false;
    }
    obj = JSON.parse(obj);
    for (var i = 0; i < obj.length; i++) {
        taskIDCounter = obj[i].id;
        createTaskEl(obj[i]);
    }
}
/* Method to create tasks  */
function createTaskEl(taskdataObj) {
    console.log(JSON.stringify(taskdataObj));
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.setAttribute("data-task-id", taskIDCounter);
    var taskInfoEL = document.createElement("div");
    taskInfoEL.className = "task-info";
    taskInfoEL.innerHTML = "<h3 class='task-name'>" + taskdataObj.name + "</h3><span class='task-type'>" + taskdataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEL);
    listItemEl.appendChild(createTaskActions(taskIDCounter));

    //below piece of code is to tackle to move the tasks to appropriate section, otherwise, all tasks will end up in to-do
        if(taskdataObj.status == "in progress"){
            //setting the default selected item to proper one, otherwise even though the tasks are in proper state, selection value will be always in to-do
            listItemEl.querySelector("select[name='status-change']").selectedIndex=1;
            tasksInProgressEl.appendChild(listItemEl);
        } else if(taskdataObj.status == "completed"){
            listItemEl.querySelector("select[name='status-change']").selectedIndex=2;
            tasksComepltesEl.append(listItemEl);
        } else {
                tasksToDoEl.appendChild(listItemEl);
        }
    taskdataObj.id = taskIDCounter;
    //adding new task to array
    tasks.push(taskdataObj);
    saveTasks();
    formEl.reset();
    taskIDCounter++;
}

completeEditTask = function (taskName, taskType, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    for (var i = 0; i > tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
            tasks[i].name = taskName;
            tasks[i].type = taskType;
        }
    }
    saveTasks();

    alert("Task Updated!");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
    formEl.reset();
}

/* Method to handle task-form actions  */

function taskFormHandler(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return;
    }

    var isEditAction = formEl.hasAttribute("data-task-id");
    if (isEditAction) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    else {
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
        };
        createTaskEl(taskDataObj);
    }
}

/* Method to create action buttons to each task  */

function createTaskActions(taskID) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    //create edit button
    var editTaskButton = document.createElement("button");
    editTaskButton.className = "btn edit-btn";
    editTaskButton.textContent = "Edit";
    editTaskButton.setAttribute("data-task-id", taskID);

    //create delete button
    var deleteTaskButton = document.createElement("button");
    deleteTaskButton.className = "btn delete-btn";
    deleteTaskButton.textContent = "Delete";
    deleteTaskButton.setAttribute("data-task-id", taskID);


    //create actions dropdown to change status of task
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskID);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
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

// adding click event handler to page-content section and event handling code will be inside the taskButton handler function
pageContentEl.addEventListener("click", taskButtonHandler);

//function to handle page-content click events
function taskButtonHandler(event) {
    if (event.target.matches(".delete-btn")) {
        var elementID = event.target.getAttribute("data-task-id");
        deleteFunction(elementID);
    }
    if (event.target.matches(".edit-btn")) {
        var elementID = event.target.getAttribute("data-task-id");
        editFunction(elementID);
    }
}

function deleteFunction(taskID) {
    var tasksBeingDelete = document.querySelector(".task-item[data-task-id='" + taskID + "']");
    var updatedTasksArr = [];
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id !== parseInt(taskID)) {
            updatedTasksArr.push(tasks[i]);
        }
    }
    tasks = updatedTasksArr;
    tasksBeingDelete.remove();
    saveTasks();
}

function editFunction(taskID) {
    var tasksBeingEdit = document.querySelector(".task-item[data-task-id='" + taskID + "']");

    var taskContent = tasksBeingEdit.querySelector('h3.task-name').textContent;
    var taskTypeContent = tasksBeingEdit.querySelector('span.task-type').textContent;


    document.querySelector("input[name='task-name']").value = taskContent;
    document.querySelector("select[name='task-type']").value = taskTypeContent;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskID);
}

pageContentEl.addEventListener("change", taskStatusChagneHandler);

function taskStatusChagneHandler(event) {
    var taskID = event.target.getAttribute("data-task-id");
    var statusValue = event.target.value.toLowerCase();
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskID + "']");

    switch (statusValue) {
        case "to do":
            tasksToDoEl.appendChild(taskSelected);
            break;
        case "in progress":
            tasksInProgressEl.appendChild(taskSelected);
            break;
        case "completed":
            tasksComepltesEl.appendChild(taskSelected);
            break;
    }

    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskID)) {
            tasks[i].status = statusValue;
        }
    }
    saveTasks();

}
loadtasks();