document.addEventListener("DOMContentLoaded", () => {
  loadBoardState();

  document.querySelectorAll(".labels .label-button").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("selected");
    });
  });
});

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

  const card = document.createElement("div");
  card.className = "card";
  card.draggable = true;
  card.ondragstart = drag;
  card.id = "card-" + Date.now();

  const cardTitle = document.createElement("h3");
  cardTitle.innerText = title;

  const nameDateDiv = document.createElement("div");
  nameDateDiv.className = "name_date";

  const cardDate = document.createElement("p");
  cardDate.className = "card_date";
  cardDate.innerText = formattedDate;
  nameDateDiv.appendChild(cardDate);

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

  if (description) {
    const desc = document.createElement("p");
    desc.className = "desc";
    desc.innerText = description;
    card.appendChild(desc);
  }

  const subTasksContainer = document.createElement("div");
  subTasksContainer.className = "sub-tasks-oncard";
  const subTasks = document.getElementById("sub-tasks").children;

  Array.from(subTasks).forEach((subtask) => {
    const subCheckbox = subtask.querySelector("input[type='checkbox']");
    const subInput = subtask.querySelector("input[type='text']").value;

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
    card.appendChild(subTasksContainer);
  }

  const labelsContainer = document.createElement("div");
  labelsContainer.className = "labels-container";
  const selectedLabels = document.querySelectorAll(
    ".labels .label-button.selected"
  );

  selectedLabels.forEach((label) => {
    const labelClone = label.cloneNode(true);
    labelClone.classList.remove("selected");
    labelsContainer.appendChild(labelClone);
  });

  if (labelsContainer.children.length > 0) {
    card.appendChild(labelsContainer);
  }

  document.getElementById("todo-column").appendChild(card);

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
  document.getElementById("sub-tasks").innerHTML = "";

  selectedLabels.forEach((label) => label.classList.remove("selected"));

  if (assigneeRadio) {
    assigneeRadio.checked = false;
  }

  saveBoardState();
}

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

function drag(event) {
  event.dataTransfer.setData("text/plain", event.target.id);
}

function drop(event) {
  event.preventDefault();
  const cardId = event.dataTransfer.getData("text/plain");
  const card = document.getElementById(cardId);
  if (card) {
    event.target.closest(".column").querySelector("div").appendChild(card);
    saveBoardState();
  }
}

function clearAll() {
  document.getElementById("todo-column").innerHTML = "";
  document.getElementById("doing-column").innerHTML = "";
  document.getElementById("done-column").innerHTML = "";

  saveBoardState();
}

function saveBoardState() {
  const boardState = {
    todo: getColumnState("todo-column"),
    doing: getColumnState("doing-column"),
    done: getColumnState("done-column"),
  };
  localStorage.setItem("kanbanBoardState", JSON.stringify(boardState));
}

function loadBoardState() {
  const boardState = JSON.parse(localStorage.getItem("kanbanBoardState"));
  if (!boardState) return;

  restoreColumnState("todo-column", boardState.todo);
  restoreColumnState("doing-column", boardState.doing);
  restoreColumnState("done-column", boardState.done);
}

function getColumnState(columnId) {
  const column = document.getElementById(columnId);
  return Array.from(column.children).map((card) => ({
    id: card.id,
    html: card.outerHTML,
  }));
}

function restoreColumnState(columnId, cards) {
  const column = document.getElementById(columnId);
  column.innerHTML = "";
  cards.forEach((cardData) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = cardData.html;
    const card = tempDiv.firstChild;

    // Reattach drag events
    card.ondragstart = drag;

    column.appendChild(card);
  });
}
