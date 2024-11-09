function createCard() {
    // Get the title and description from input fields
    const title = document.getElementById("title").value.trim();
    const description = document.getElementById("description").value.trim();
  
    // Validate that the title is provided
    if (title === "") {
      alert("Please enter a title for the card.");
      return;
    }
  
    // Get today's date formatted as "DD MMM"
    const today = new Date();
    const formattedDate = today.toLocaleDateString("en-US", { day: 'numeric', month: 'short' });
  
    // Create the card structure
    const card = document.createElement("div");
    card.className = "card";
  
    const cardTitle = document.createElement("h3");
    cardTitle.innerText = title;
  
    const nameDateDiv = document.createElement("div");
    nameDateDiv.className = "name_date";
  
    const cardDate = document.createElement("p");
    cardDate.className = "card_date";
    cardDate.innerText = formattedDate;
  
    // Append title and date to the card
    nameDateDiv.appendChild(cardDate);
    card.appendChild(cardTitle);
    card.appendChild(nameDateDiv);
  
    // Append description if provided
    if (description) {
      const desc = document.createElement("p");
      desc.className = "desc";
      desc.innerText = description;
      card.appendChild(desc);
    }
  
    // Add the card to the "TO DO" column
    document.getElementById("todo-column").appendChild(card);
  
    // Clear the input fields
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
  }
  