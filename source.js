function createCard() {
  const title = document.getElementById("title").value;
  if (title === "") {
    alert("Please enter a title for the card.");
    return;
  }

  const description = document.getElementById("description").value;

  const today = new Date();
  const formattedDate = today.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });

  // Create card element
  const card = document.createElement("div");
  card.className = "card";
  card.draggable = true;
  card.ondragstart = drag;
  card.id = "card-" + Date.now();

  // Card title
  const cardTitle = document.createElement("h3");
  cardTitle.innerText = title;

  // Date and assignee info
  const nameDateDiv = document.createElement("div");
  nameDateDiv.className = "name_date";

  const cardDate = document.createElement("p");
  cardDate.className = "card_date";
  cardDate.innerText = formattedDate;
  nameDateDiv.appendChild(cardDate);

  // Get selected assignee
  const assigneeRadio = document.querySelector("input[name='person']:checked");
  if (assigneeRadio) {
    const assigneeName =
      assigneeRadio.nextElementSibling.innerText.split(" ")[0];
    const assigneeInfo = document.createElement("p");
    assigneeInfo.innerHTML = `Assigned to <span>${assigneeName}</span>`;
    nameDateDiv.appendChild(assigneeInfo);
  }
  card.appendChild(cardTitle);
  card.appendChild(nameDateDiv);

  // Add description if available
  if (description) {
    const desc = document.createElement("p");
    desc.className = "desc";
    desc.innerText = description;
    card.appendChild(desc);
  }

  // Get subtasks (appending subtasks first)
  const subTasksContainer = document.createElement("div");
  subTasksContainer.className = "sub-tasks-oncard";
  const subTasks = document.getElementById("sub-tasks").children;

  Array.from(subTasks).forEach((subtask) => {
    const subCheckbox = subtask.querySelector("input[type='checkbox']");
    const subInput = subtask.querySelector("input[type='text']").value.trim();

    if (subInput) {
      const subtaskDiv = document.createElement("div");
      subtaskDiv.className = "subtask-checkbox-oncard";

      const subtaskCheckbox = document.createElement("input");
      subtaskCheckbox.type = "checkbox";
      subtaskCheckbox.checked = subCheckbox.checked;

      const subtaskLabel = document.createElement("p");
      subtaskLabel.innerText = subInput;

      subtaskDiv.appendChild(subtaskCheckbox);
      subtaskDiv.appendChild(subtaskLabel);
      subTasksContainer.appendChild(subtaskDiv);
    }
  });

  if (subTasksContainer.children.length > 0) {
    card.appendChild(subTasksContainer); // Append subtasks first
  }

  // Get selected labels (appending labels after subtasks)
  const labelsContainer = document.createElement("div");
  labelsContainer.className = "labels-container";
  const selectedLabels = document.querySelectorAll(
    ".labels .label-button.selected"
  );

  selectedLabels.forEach((label) => {
    const labelClone = label.cloneNode(true); // Clone label to keep original styling
    labelClone.classList.remove("selected"); // Remove selection style
    labelsContainer.appendChild(labelClone);
  });

  if (labelsContainer.children.length > 0) {
    card.appendChild(labelsContainer); // Append labels after subtasks
  }

  // Add the card to the TODO column
  document.getElementById("todo-column").appendChild(card);

  // Clear form inputs
  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("sub-tasks").innerHTML = ""; // Clear all subtasks

  // Remove selected state from labels
  selectedLabels.forEach((label) => label.classList.remove("selected"));

  // Clear the selected assignee
  if (assigneeRadio) {
    assigneeRadio.checked = false;
  }
}

// Function to create a new subtask input field
function createSubtask() {
  const subContainer = document.createElement("div");
  subContainer.className = "subtask-checkbox";

  const subCheckbox = document.createElement("input");
  subCheckbox.type = "checkbox";

  const subInput = document.createElement("input");
  subInput.type = "text";
  subInput.placeholder = "Subtask";

  subContainer.appendChild(subCheckbox);
  subContainer.appendChild(subInput);

  document.getElementById("sub-tasks").appendChild(subContainer);
}

function allowDrop(event) {
  event.preventDefault();
}

// تابعی برای شروع درگ و ذخیره شناسه کارت
function drag(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

// تابعی برای رها کردن کارت در ستون مقصد
function drop(event) {
  event.preventDefault();
  const cardId = event.dataTransfer.getData("text/plain");
  const card = document.getElementById(cardId);
  if (card) {
    event.target.closest(".column").querySelector("div").appendChild(card);
  }
}
