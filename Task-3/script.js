function showEvents() {
  window.location.href = "events.html";
}
function createNewEvent() {
  window.location.href = "index.html";
}

// If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
  let addName = document.getElementById("eventName");
  let addDate = document.getElementById("eventDate");
  let addLocation = document.getElementById("eventLocation");

  let notes = localStorage.getItem("notes");

  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  let myObj = {
    name: addName.value,
    date: addDate.value,
    location: addLocation.value,
  };

  notesObj.push(myObj);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  addName.value = "";
  addDate.value = "";
  addLocation.value = "";

  //   console.log(notesObj);
  showNotes();
});

// Function to show elements from localStorage
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }
  let html = "";
  notesObj.forEach(function (element, index) {
    html += `
            <tr>
                <td>${index + 1}</td>
                <td>${element.name}</td>
                <td>${element.date}</td>
                <td>${element.location}</td>
                <td><button class="delBtn" id="${index}"onclick="deleteNote(this.id)">Remove</button></td>
            </tr>
        `;
  });
  let notesElm = document.getElementById("notes");
  if (notesObj.length != 0) {
    notesElm.innerHTML = html;
    updateShowHideButton("Hide Events"); // Change button text to "Hide Events"
  } else {
    notesElm.innerHTML = `Nothing to show! Use "Add a Note" section above to add notes.`;
  }
}

// Function to hide elements
function hideNotes() {
  let notesElm = document.getElementById("notes");
  notesElm.innerHTML = ""; // Clear the content
  updateShowHideButton("Show Events"); // Change button text to "Show Events"
}

// Function to update the text of the show/hide button
function updateShowHideButton(text) {
  let showAndHideBtn = document.getElementById("showAndHide");
  showAndHideBtn.innerHTML = text;
}

// Function to toggle between showing and hiding events
function toggleShowHide() {
  let showAndHideBtn = document.getElementById("showAndHide");

  if (showAndHideBtn.innerHTML === "Show Events") {
    showNotes(); // Show events
  } else {
    hideNotes(); // Hide events
  }
}

// Function to delete a note
function deleteNote(index) {
  //   console.log("I am deleting", index);

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesObj = [];
  } else {
    notesObj = JSON.parse(notes);
  }

  notesObj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesObj));
  showNotes();
}
