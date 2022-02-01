const createTaskHtml = (  id, name, description, assignedTo, dueDate, status ) => {
    const html =   
    `<li id="individual-card" class="card" data-task-id="${id}" style="min-width: 50vw">
        <div class="card-body">
            <h5 class="card-title">Name: ${name}</h5>
            <p class="card-text">
                Task Description: ${description}
            </p>
            <p class="card-text">Assigned To: ${assignedTo}</p>
            <p class="card-text">Due Date: ${dueDate}</p>
            <p class="card-text"><b>Task status: ${status}</b></p>
            <div class="card-footer row mt-4">
                <div class="col-6 justify-content-center">
                    <button id="done-invisible" class="btn btn-outline-success done-button">
                        Done
                    </button>
                </div>
                <div class="col-6 justify-content-center">
                    <button class="btn btn-outline-danger delete-button">
                        Delete
                    </button>
                </div>
            </div>
        </div>
    </li>
    `;
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

    for (let i=0 ; i < this.tasks.length ; i++) {
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
    // let tasksList = tasksHtmlList.join('\n');
    // goToTasks.innerHTML = tasksList;
    const tasksHtml = tasksHtmlList.join("\n");

    const tasksList = document.querySelector("#task-list");
    goToTasks.innerHTML = tasksHtml;
//     tasksList.innerHTML = tasksHtml;
// 
}

//save method
save(){
    let tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem("tasks",tasksJson);
    // const currentId = String(this.currentId);
    let currentId = JSON.stringify(this.currentId);
    localStorage.setItem("currentId",currentId);
};

//load method 

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
    // currentId = Number(currentId);
    // this.currentId = JSON.parse(currentId);
     }
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


}
