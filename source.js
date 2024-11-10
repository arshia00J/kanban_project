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

  const card = document.createElement("div");
  card.className = "card";

  const cardTitle = document.createElement("h3");
  cardTitle.innerText = title;

  const nameDateDiv = document.createElement("div");
  nameDateDiv.className = "name_date";

  const cardDate = document.createElement("p");
  cardDate.className = "card_date";
  cardDate.innerText = formattedDate;

  nameDateDiv.appendChild(cardDate);
  card.appendChild(cardTitle);
  card.appendChild(nameDateDiv);

  if (description) {
    const desc = document.createElement("p");
    desc.className = "desc";
    desc.innerText = description;
    card.appendChild(desc);
  }

  document.getElementById("todo-column").appendChild(card);

  document.getElementById("title").value = "";
  document.getElementById("description").value = "";
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
