const inputTask = document.querySelector(".input-task");
const submitButton = document.querySelector(".submit-button");
const allTaskContainer = document.querySelector(".all-task-container");

// fetch all task
const getAllTask = async () => {
  const response = await axios.get("/api/tasks");
  const allTask = response.data;

  if (allTask.msg === `no task found`) {
    return (allTaskContainer.innerHTML = `<p>${allTask.msg}</p>`);
  } else {
    const task = allTask.map((task) => {
      const isChecked = task.completed === true;

      return `<div class="single-task">
              <p class="task-name">${task.task}</p>
              <div class="buttons-container">
                  <button class="edit-button" data-taskId="${
                    task._id
                  }"></button>
                  <input type="checkbox" class="checkbox" ${
                    isChecked ? "checked" : ""
                  } data-taskId="${task._id}">
              </div>
          </div>`;
    });

    allTaskContainer.innerHTML = task;
  }
};
getAllTask();

// for checkbox input
allTaskContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("checkbox")) {
    const taskId = e.target.getAttribute("data-taskId");
    const isChecked = e.target.checked;

    const response = await axios.patch(`/api/tasks/${taskId}`, {
      completed: `${isChecked}`,
    });
  }
});

// create a task
const createTask = async () => {
  const taskName = inputTask.value;

  try {
    const response = await axios.post("/api/tasks", {
      task: `${taskName}`,
    });
    inputTask.value = ``;
    getAllTask();
  } catch (error) {
    alert(`${error.response.data.msg}`);
  }
};
submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  createTask();
});

// edit a task
allTaskContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("edit-button")) {
    const taskId = e.target.getAttribute("data-taskId");
    const singleTaskContainer = e.target.closest(".single-task");
    const currentTask =
      singleTaskContainer.querySelector(".task-name").textContent;

    singleTaskContainer.innerHTML = `
      <input value="${currentTask}" class="new-task-input">
      <div class="new-buttons-container">
        <button class="save-button" type="submit" data-taskId="${taskId}">Save</button>
        <button class="delete-button" type="submit" data-taskId="${taskId}">Delete</button>
      </div>`;
  }

  if (e.target.classList.contains("save-button")) {
    const taskId = e.target.getAttribute("data-taskId");
    const newTask = e.target
      .closest(".single-task")
      .querySelector(".new-task-input").value;

    try {
      const response = await axios.patch(`/api/tasks/${taskId}`, {
        task: `${newTask}`,
      });
      getAllTask();
    } catch (error) {
      console.log(error);
    }
  }
});

// delete a task
allTaskContainer.addEventListener("click", async (e) => {
  if (e.target.classList.contains("delete-button")) {
    const taskId = e.target.getAttribute("data-taskId");

    try {
      const response = await axios.delete(`/api/tasks/${taskId}`);
      getAllTask();
    } catch (error) {
      console.log(error);
    }
  }
});
