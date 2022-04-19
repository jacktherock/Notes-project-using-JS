
showNotes();

// Add A Todo -- If user adds a note, add it to the localStorage
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    let addTitle = document.getElementById("addTitle");
    let addTxt = document.getElementById("addTxt");
    let notes = localStorage.getItem("notes");
    let emptyTitle = document.getElementById("addTitle").value;
    let emptyTxt = document.getElementById("addTxt").value;
    let notesEmpty = document.getElementById("emptyNote");

    if (emptyTitle == 0 || emptyTxt == 0) {
        notesEmpty.innerHTML = `
        <h6 class="alert-danger text-center mt-2 border ms border-danger" style="padding: 7px; border-radius: 18px;">Please Fill Required Fields!</h6>
        `;
    }
    else {
        notesEmpty.innerHTML = `
        <h6 class="alert-success text-center mt-2 border ms border-success" style="padding: 7px; border-radius: 18px;">Note created successfully!</h6>
        `;
        if (notes == null) { // initially todo is empty
            notesObj = []; // notesObj =  array
        }
        else {
            notesObj = JSON.parse(notes);
        }

        let myObj = {
            title: addTitle.value,
            text: addTxt.value,
        }

        notesObj.push(myObj); // pushing title & text in notesObj array through myObj object
        localStorage.setItem("notes", JSON.stringify(notesObj)); // notesObj = array of Objects

        addTitle.value = ""; // title gets blank when add new todo
        addTxt.value = ""; // text gets blank when add new todo
        //   console.log(notesObj);
    }
    showNotes();
});

// Todo's list -- Function to show elements from localStorage
function showNotes() {
    let notes = localStorage.getItem("notes");

    if (notes == null) { // initially todo is empty
        notesObj = []; // notesObj =  array
    }
    else {
        notesObj = JSON.parse(notes);
    }


    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
                <div class="noteCard my-2 mx-2 card">
                    <div class="card-body">
                        <button id="${index}" onclick="deleteNote(this.id)" class="float-end btn btn-sm btn-danger"><i class='bx bx-trash'></i></button>
                        <h5 class="card-title">${element.title}</h5>
                        <p class="card-text"> ${element.text}</p>
                    </div>
                </div>`;
    });

    let notesElm = document.getElementById("notes");
    if (notesObj.length != 0) {
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `
        <h5 class="alert-danger text-center mt-5 border border-danger" style="padding: 7px; border-radius: 18px;">Nothing to show! Please add Todo!</h5>
        `;
    }
}

// Delete Todo -- Function to delete a note
function deleteNote(index) {
    //   console.log("I am deleting", index);

    let notes = localStorage.getItem("notes");

    if (notes == null) { // initially todo is empty
        notesObj = []; // notesObj =  array
    }
    else {
        notesObj = JSON.parse(notes);
    }

    notesObj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesObj));
    showNotes();
}

//  Search Todo -- Search by content
let search = document.getElementById('searchTxt');
search.addEventListener("input", function () {

    let inputVal = search.value.toLowerCase();
    // console.log('Input event fired!', inputVal);
    let noteCards = document.getElementsByClassName('noteCard');

    Array.from(noteCards).forEach(function (element) {
        let cardTxt = element.getElementsByTagName("h5")[0].innerText;
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
        // console.log(cardTxt);
    })
})
