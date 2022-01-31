const createTaskHtml = (  id, name, description, assignedTo, dueDate, status ) => {
    const html =   
    `<div class="modal-content" >
        <div class="modal-header" >
          <h5 class="modal-title" id="exampleModalLabel">Task Details</h5>
        </div>
        
                    <div class="modal-body">
                        <p data-task-id="${id}"></p>
                        <p><strong>Task Name:</strong>${name}</p>
                        <p><strong>Task Description:</strong>${description}</p>
                        <p><strong>Assigned To:</strong> ${assignedTo}</p>
                        <p><strong>Due Date:</strong> ${dueDate}</p>
                        <p><strong>Status:</strong>${status}</p>
                    </div>
                    
                    <div class="modal-footer">
                 <button type="button" id="done-invisible" class="btn btn-secondary  done-button" data-dismiss="modal" >Done</button>
                <button type="button" class="btn btn-outline-danger delete-button">Delete Task</button>
              </div>
        </div>`; 
          return html;
          
};

// let html = createTaskHtml(1,'Requirments','workui', 'gary', '6/2/2022', 'InProgress',)
//   console.log(html);
//add tasks
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
// const taskManager = new TaskManager(0);


//current id
getTaskById(taskId) {
    let foundTask;

    for (let i=0 ; i<this.tasks.length ; i++) {
        const task = this.tasks[i];
            if(task.id === taskId) {
                foundTask = task;
            }
    }

    return foundTask;
}
//render method
render(){

    let tasksHtmlList = [];

    for(let i=0; i < this.tasks.length ; i++){

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
    
    tasksList.innerHTML = tasksHtml;
}
//save method
save(){
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem("tasks",tasksJson);
    const currentId = String(this.currentId);
    localStorage.setItem("currentId",currentId);
}


//delete method
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

//load method 

load(){
    // Check if any tasks are saved in localStorage
    if (localStorage.getItem("tasks")) {
       // Get the JSON string of tasks in localStorage
       const tasksJson = localStorage.getItem("tasks");
 
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
}
