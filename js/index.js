// const displayDate = document.querySelector("#display-date");

// const todaydate = new Date();
// document.getElementById("display-date").innerHTML = todaydate;

//display the date object
const dateElement = document.querySelector("#display-date");
let today = new Date();
const [month, day, year] = [today.getMonth()+1, today.getDate(), today.getFullYear()];
let dateString = `Date: ${day} / ${month} / ${year}`;
dateElement.innerHTML = dateString;


const form = document.querySelector("#new-task-form");

form.addEventListener("submit", (event) => {
  let validateName = document.querySelector("#inputname");
  let validateDescription = document.querySelector("#input-description");
  let validateAssignedTo = document.querySelector("#input-Assign");
  let validateDueDate = document.querySelector("#input-date");
  let validateStatus = document.querySelector("#input-choose");
  let validationFail = 0;

  event.preventDefault();

  const clearFormFields = () => {
    validateName.value = "";
    validateDescription.value = "";
    validateAssignedTo.value = "";
    validateStatus.value = "In Progress";
    validateDueDate.value = "";
    validateName.classList.remove("is-valid");
    validateDescription.classList.remove("is-valid");
    validateAssignedTo.classList.remove("is-valid");
    validateStatus.classList.remove("is-valid");
    validateDueDate.classList.remove("is-valid");
  };

  // let todaysDate = new Date(Date.now())
  //   .toLocaleString()
  //   .split(",")[0]
  //   .split("/");
  // let day = todaysDate[1];
  // let month = todaysDate[0];
  // let year = todaysDate[2];
  // taskDueDate is in yyyy-mm-dd format
  // let taskDueDate = validateDueDate.value.split("-");


  // console.log("Name :" + validateName.value.length);
  // console.log("Description :" + validateDescription.value.length);
  // console.log("Assigned To :" + validateAssignedTo.value.length);
  // console.log("Due Date :" + validateDueDate.value);
  // console.log("Status:" + validateStatus.value);


  // Form validation for Task Name Field min length 5
  if (validateName.value.length > 5) {
    validateName.classList.add("is-valid");
    validateName.classList.remove("is-invalid");
  } else {
    validateName.classList.add("is-invalid");
    validateName.classList.remove("is-valid");
    validationFail++;
  }

  // Form validation for Task Description Field min length 5
  if (validateDescription.value.length > 8) {
    validateDescription.classList.add("is-valid");
    validateDescription.classList.remove("is-invalid");
  } else {
    validateDescription.classList.add("is-invalid");
    validateDescription.classList.remove("is-valid");
    validationFail++;
  }

//   // Form validation for Task Assigned Field min length 5
  if (validateAssignedTo.value.length > 3) {
    validateAssignedTo.classList.add("is-valid");
    validateAssignedTo.classList.remove("is-invalid");
  } else {
    validateAssignedTo.classList.add("is-invalid");
    validateAssignedTo.classList.remove("is-valid");
    validationFail++;
  }  
//    Form validation for Due Date Field not empty
  
  // console.log(
  //    `taskDueDate[2]:${taskDueDate[2]} day:${day} taskDueDate[1]:${taskDueDate[1]} month:${month} taskDueDate[0]:${taskDueDate[0]} year:${year}`
  //   );
    // (validateDueDate.value)

  // if (taskDueDate[2] >= day &&
  //   parseInt(taskDueDate[1]) >= month &&
  //   parseIntask(DueDate[0]) >= year)
  //    {
  //   validateDueDate.classList.add("is-valid");
  //   validateDueDate.classList.remove("is-invalid");
  // } else {
  //   validateDueDate.classList.add("is-invalid");
  //   validateDueDate.classList.remove("is-valid");
  //   validationFail++;
  // }

  // let dateCounter = 0;
	// 	let addDateArray = validateDueDate.value.split('-');
	// 	if (
	// 		addDateArray[0] >= todaysDate[2] &&
	// 		parseInt(addDateArray[1]) >= todaysDate[0] && 
	// 		parseInt(addDateArray[2]) >= todaysDate[1] 
	// 	) {
	// 		dateCounter = 0;	
	// 	}
	// 	 else {
	// 		dateCounter++
	// 	}

		
		// if (!dateCounter) {
		// 	validateDueDate.classList.add('is-valid');
		// 	validateDueDate.classList.remove('is-invalid');
		// } else {
		// 	validateDueDate.classList.remove('is-valid');
		// 	validateDueDate.classList.add('is-invalid');
		// 	validationFail++;
    // }
      // Validate a correct date is entered
    const dateSplit = validateDueDate.value.split(/\D/);
    console.log(`dateSplit: ${dateSplit}`)
    const dateValue = new Date(dateSplit[0], --dateSplit[1], ++dateSplit[2]);
    console.log(`dateValue: ${dateValue}`)
     // get current date
     const dateNow = Date.now();
     console.log(`dateNow: ${dateNow}`)
     if (dateValue >= dateNow) {
      validateDueDate.classList.add('is-valid');
      validateDueDate.classList.remove('is-invalid');
     } else {
      validateDueDate.classList.add('is-invalid');
      validateDueDate.classList.remove('is-valid');
         return false;
     };


    

  // Form validation for Task Status Field not empty
  if (validateStatus.value) {
    validateStatus.classList.add("is-valid");
    validateStatus.classList.remove("is-invalid");
  } else {
    validateStatus.classList.add("is-invalid");
    validateStatus.classList.remove("is-valid");
    validationFail++;
  }
  //  If validation fails then function will not proceed further and
  // will return. The value of validationFail will also needed to be
  // reset to 0.
  // ----------------------------------------------------------------------------------
  // 
  // let abc = addTask(manasa, DoingwithAthira, Pankaj, 5/6/2022, InProgress);
  // console.log(abc);
  const taskManager = new TaskManager(0);

  taskManager.load();
  taskManager.render();

  if (validationFail > 0) {
    validationFail = 0;
    return;
  } else {
    
    taskManager.addTask(
      validateName.value,
      validateDescription.value,
      validateAssignedTo.value,
      validateDueDate.value,
      validateStatus.value
    );
    clearFormFields();  
    taskManager.save();
    taskManager.render();
    }
});
//done display
const taskList = document.querySelector("#task-list");
taskList.addEventListener("click", (event) => { 
  if(event.target.classList.contains("done-button")){
    event.preventDefault();
    const parentTask =
    event.target.parentElement.parentElement.parentElement.parentElement;
    let taskId = Number(parentTask.dataset.taskId);
    let task = taskManager.getTaskById(taskId);
    // task.status = "Done";
    let doneButton = document.querySelector('#done-invisible');
    if (task.status === 'In Progress' || task.status === 'Pending') {
        task.status = 'Completed';
    
    taskManager.save();

    taskManager.render(); 
  } 
  }


 // Check if a "Delete" button was clicked
 if (event.target.classList.contains("delete-button")) {
  event.preventDefault();
  // Get the parent Task
  const parentTask =
    event.target.parentElement.parentElement.parentElement.parentElement;

  // Get the taskId of the parent Task.
  let taskId = Number(parentTask.dataset.taskId);

  // Delete the task
  taskManager.deleteTask(taskId);

  // Save the tasks to localStorage
  taskManager.save();

  // Render the tasks
  taskManager.render();
}
});