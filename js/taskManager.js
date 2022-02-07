const createTaskHtml = (  id, name, description, assignedTo, dueDate, status ) => {
    let cssClass = status.toLowerCase().replace(" ", "");
    const html = `<li class= "col col-12 col-md-4" data-task-id="${id}">
              <div class="col border border-secondary pb-2 task-status-${cssClass}">
              <div class=""><strong>Task Name:</strong></div>
                <div class="">${name}</div>
              <div class="mb-1">
                <div class=""><strong>Task Description:</strong></div>
                <div class="">${description}</div>
              </div>          
              <div class="">
                <div class=""><strong>Assigned To:</strong> </div>
                <div class="">${assignedTo}</div>
              </div>
              <div class="">
                 <div class=""><strong>Due Date:</strong></div>
                 <div class="">${dueDate}</div>
              </div>          
              <div class="">
                 <div class=""><strong>Task status:</strong></div>
                 <div class="">${status}</div>
              </div>          
              <div class="card-footer row mt-4">
              <div class="col-6 justify-content-center">
                  <button id="done-invisible" class="${String(status).toLowerCase()===('done') ? 'invisible' : ''} btn btn-outline-success done-button">
                  Done
                  </button>
              </div>
              <div class="col-6 justify-content-center">
                  <button class="btn btn-outline-danger delete-button">
                  Delete
                  </button>
              </div>
          </div>
            </li>`;
    return html;
  };

// let html = createTaskHtml(1,'Requirments','workui', 'gary', '6/2/2022', 'InProgress',)
// console.log(html);

// Adding Tasks //

    class TaskManager {
    constructor(currentId = 0){
        this.tasks = [];
        this.currentId = currentId;      
           
    }

addTask(name, description, assignedTo, dueDate, status) {
    const task = {
        id: this.currentId++,
        name: name,
        description: description,
        assignedTo: assignedTo,
        dueDate: dueDate,
        status: status,
    };

    this.tasks.push(task);
    
}

// Current ID //

getTaskById(taskId) {
    let foundTask;

    for (let i=0 ; i < this.tasks.length ; i++) {
        const task = this.tasks[i];
            if(task.id === taskId) {
                foundTask = task;
            }
    }

    return foundTask;
}

// Render method //

render(){

    let tasksHtmlList = [];

    for(let i = 0 ; i < this.tasks.length ; i++){

       const task = this.tasks[i];

       const date = new Date(task.dueDate);
       let formattedDate = date.getDate() + "/" +( date.getMonth() + 1) + "/" + date.getFullYear();
       let taskHtml = createTaskHtml( 
           task.id,
           task.name, 
           task.description, 
           task.assignedTo,
           formattedDate,
           task.status
           );
        tasksHtmlList.push(taskHtml);
    }
  
    const tasksHtml = tasksHtmlList.join("\n");

    const tasksList = document.querySelector("#task-list");
    let goToTasks = document.querySelector("#task-list") // added
    goToTasks.innerHTML = tasksHtml;

}

// Save method //

save(){
    let tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem("tasks",tasksJson);
    // const currentId = String(this.currentId);
    let currentId = JSON.stringify(this.currentId);
    localStorage.setItem("currentId",currentId);
};

// Load method // 

load(){
    // Check if any tasks are saved in localStorage
    if (localStorage.getItem("tasks")) {
       // Get the JSON string of tasks in localStorage
       let tasksJson = localStorage.getItem("tasks");
 
       // Convert it to an array and store it in our TaskManager
       this.tasks = JSON.parse(tasksJson);
     }
 
     // Check if the currentId is saved in localStorage
     if (localStorage.getItem("currentId")) {
       // Get the currentId string in localStorage
       const currentId = localStorage.getItem("currentId");
       // Convert the currentId to a number and store it in our TaskManager
       this.currentId = Number(currentId);
     }
   }

// Delete method //

deleteTask(taskId) {
    const newTasks = [];
    for (let i=0 ; i < this.tasks.length; i++) {
        let task = this.tasks[i];
        if (task.id !== taskId) {
            newTasks.push(task);
        }
    }
    this.tasks = newTasks;
}
}
