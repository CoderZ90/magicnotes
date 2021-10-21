console.log("%cWelcome To My Notes App!", 'font-family: Poppins; font-size: 32px');
showNotes();
// If users Adds Note add to the local storage
let addBtn = document.getElementById("addBtn");

// Function to add notes
addBtn.addEventListener("click", function (e) {
	let addTxt = document.getElementById("addTxt");
	let notes = localStorage.getItem("notes");
	if (notes == null) {
		notesObj = [];
	} else {
		notesObj = JSON.parse(notes);
	}
	notesObj.push(addTxt.value);
	localStorage.setItem("notes", JSON.stringify(notesObj));
	addTxt.value = "";
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
		<div class="noteCard card my-4 mx-4 bg-dark text-white" style="width: 30rem;">
			<div class="card-body">
				<h5 class="card-title">Note ${index + 1}</h5>
				<p class="card-text"> ${element} </p>
				<button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
			</div>
		</div>
		`;
	});
	let notesElm = document.getElementById("notes");
	if (notesObj.length != 0) {
		notesElm.innerHTML = html;
	} else {
		notesElm.innerHTML = `Nothing To Show Here! Create a note to see...`
		// Styling NotesElm
		notesElm.style.color = "#f1f1f1";
		notesElm.style.fontSize = "20px";
		notesElm.style.fontWeight = "bold";
		notesElm.classList.add("notesElmText");
	}
}

// Function to delete notes
function deleteNote(index) {
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

// Function to search notes
let search = document.getElementById("searchTxt");
search.addEventListener("input", function (e) {
	let inputVal = search.value.toLowerCase();
	let notesCard = document.getElementsByClassName("noteCard");
	Array.from(notesCard).forEach(function(element) {
		let cardTxt = element.getElementsByTagName("p")[0].innerText;
		if (cardTxt.includes(inputVal)) {
			element.style.display = "block";
		} else {
			element.style.display = "none";
		}
	});
});

/*
	Coming Soon..
	1. Add Title 
	2. Mark a note as important
	3. Seperate notes by user
	4. Sync and host to a web server
*/