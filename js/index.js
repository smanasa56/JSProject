const taskManager = new TaskManager();
taskManager.load(); 
taskManager.render(); 

// Display the date object
const dateElement = document.querySelector("#display-date");
let today = new Date();
const [month, day, year] = [
  today.getMonth() + 1,
  today.getDate(),
  today.getFullYear(),
];
let dateString = `Date: ${day} / ${month} / ${year}`;
dateElement.innerHTML = dateString;

let validateName = document.querySelector("#inputname");
let validateDescription = document.querySelector("#input-description");
let validateAssignedTo = document.querySelector("#input-Assign");
let validateDueDate = document.querySelector("#input-date");
let validateStatus = document.querySelector("#status");
let submitButton = document.querySelector("#submit-button");
let goToTasks = document.querySelector("#task-list");
const taskForm = document.querySelector("#task-form");


submitButton.addEventListener("click", (event) => {
 
  event.preventDefault();

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
    return false;
  }

  // Form validation for Task Description Field min length 5
  if (validateDescription.value.length > 8) {
    validateDescription.classList.add("is-valid");
    validateDescription.classList.remove("is-invalid");
  } else {
    validateDescription.classList.add("is-invalid");
    validateDescription.classList.remove("is-valid");
    return false;
  }

  // Form validation for Task Assigned Field min length 5
  if (validateAssignedTo.value.length > 3) {
    validateAssignedTo.classList.add("is-valid");
    validateAssignedTo.classList.remove("is-invalid");
  } else {
    validateAssignedTo.classList.add("is-invalid");
    validateAssignedTo.classList.remove("is-valid");
    return false;
  }

  // Form validation for Due Date Field not empty

  // Validate a correct date is entered
  const dateSplit = validateDueDate.value.split(/\D/);
  console.log(`dateSplit: ${dateSplit}`);
  const dateValue = new Date(dateSplit[0], --dateSplit[1], ++dateSplit[2]);
  console.log(`dateValue: ${dateValue}`);
  // Get current date
  const dateNow = Date.now();
  console.log(`dateNow: ${dateNow}`);
  if (dateValue >= dateNow) {
    validateDueDate.classList.add("is-valid");
    validateDueDate.classList.remove("is-invalid");
  } else {
    validateDueDate.classList.add("is-invalid");
    validateDueDate.classList.remove("is-valid");
    return false;
  }

  // Form validation for Task Status Field not empty
  if (validateStatus.value != "") {
    validateStatus.classList.add("is-valid");
    validateStatus.classList.remove("is-invalid");
  } else {
    validateStatus.classList.add("is-invalid");
    validateStatus.classList.remove("is-valid");
    return false;
  }
  
  taskManager.addTask(
    validateName.value,
    validateDescription.value,
    validateAssignedTo.value,
    validateDueDate.value,
    validateStatus.value
  );

  // taskForm.reset()
  removeFields();
  taskManager.save();
  // taskManager.load(); 
  taskManager.render();

  
});

function removeFields() {
  validateName.value = "";
  validateName.classList.remove("is-valid");
  validateDescription.value = "";
  validateDescription.classList.remove("is-valid");
  validateAssignedTo.value = "";
  validateAssignedTo.classList.remove("is-valid");
  validateDueDate.value = "";
  validateDueDate.classList.remove("is-valid");
  validateStatus.value = "";
  validateStatus.classList.remove("is-valid");
}

// Done display

goToTasks.addEventListener("click", (event) => {
  if (event.target.classList.contains("done-button")) {
    event.preventDefault();
    const parentTask =
      event.target.parentElement.parentElement.parentElement.parentElement;
    let taskId = Number(parentTask.dataset.taskId);
    let task = taskManager.getTaskById(taskId);
    let doneButton = document.querySelector("#done-invisible");
    if (
      task.status === "In Progress" ||
      task.status === "ToDo" ||
      task.status === "Review"
    ) {
      task.status = "Done";

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
