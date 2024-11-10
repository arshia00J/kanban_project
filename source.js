function createCard() {
  const title = document.getElementById("title").value.trim();
  const description = document.getElementById("description").value.trim();

  if (title === "") {
    alert("Please enter a title for the card.");
    return;
  }

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  // Create card element
  const card = document.createElement("div");
  card.className = "card";

  // Card title
  const cardTitle = document.createElement("h3");
  cardTitle.innerText = title;

  // Date and name div
  const nameDateDiv = document.createElement("div");
  nameDateDiv.className = "name_date";

  const cardDate = document.createElement("p");
  cardDate.className = "card_date";
  cardDate.innerText = formattedDate;

  nameDateDiv.appendChild(cardDate);
  card.appendChild(cardTitle);
  card.appendChild(nameDateDiv);

  // Add description if available
  if (description) {
    const desc = document.createElement("p");
    desc.className = "desc";
    desc.innerText = description;
    card.appendChild(desc);
  }

  // Create subtasks section
  const subTasksContainer = document.createElement("div");
  subTasksContainer.className = "sub-tasks-oncard";

  // Get subtasks from the input container
  const subTasks = document.getElementById("sub-tasks").children;
  Array.from(subTasks).forEach((subtask) => {
    const checkbox = subtask.querySelector("input[type='checkbox']");
    const subtaskText = subtask.querySelector("input[type='text']").value.trim();

    if (subtaskText) {
      // Create subtask element for the card
      const subtaskDiv = document.createElement("div");
      subtaskDiv.className = "subtask-checkbox-oncard";

      const subtaskCheckbox = document.createElement("input");
      subtaskCheckbox.type = "checkbox";
      subtaskCheckbox.checked = checkbox.checked;

      const subtaskLabel = document.createElement("p");
      subtaskLabel.innerText = subtaskText;

      subtaskDiv.appendChild(subtaskCheckbox);
      subtaskDiv.appendChild(subtaskLabel);

      subTasksContainer.appendChild(subtaskDiv);
    }
  });

  // Add subtasks container to card if there are subtasks
  if (subTasksContainer.children.length > 0) {
    card.appendChild(subTasksContainer);
  }

  // Add the card to the TODO column
  document.getElementById("todo-column").appendChild(card);

  // Clear form inputs
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("sub-tasks").innerHTML = ""; // Clear all subtasks
}

function createSubtask() {
  const subContainer = document.createElement("div");
  subContainer.className = "subtask-checkbox";

  const subCheckbox = document.createElement("input");
  subCheckbox.type = "checkbox";

  const subInput = document.createElement("input");
  subInput.type = "text";
  subInput.placeholder = "Placeholder";

  subContainer.appendChild(subCheckbox);
  subContainer.appendChild(subInput);

  document.getElementById("sub-tasks").appendChild(subContainer);
}
