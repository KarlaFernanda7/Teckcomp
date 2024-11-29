const API_URL = "http://localhost:3000/tasks";

async function fetchTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  const list = document.getElementById("task-list");
  list.innerHTML = "";
  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.textContent = task.task;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.onclick = async () => {
      await fetch(`${API_URL}/${task._id}`, { method: "DELETE" });
      fetchTasks(); // Recargar la lista
    };
    li.appendChild(deleteButton);
    list.appendChild(li);
  });
}

async function addTask() {
  const input = document.getElementById("task-input");
  const task = input.value.trim();
  if (task) {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    });
    input.value = "";
    fetchTasks(); // Recargar la lista
  }
}

document.getElementById("add-task").onclick = addTask;
fetchTasks();
