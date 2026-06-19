document.addEventListener("DOMContentLoaded", () => {
    const notesInput = document.getElementById("noteInput")
    const addbtn = document.getElementById("addbtn")
    const notesSpace = document.getElementById("notesContainer")

    let notes = JSON.parse(localStorage.getItem("notes")) || []

    notes.forEach(function (note) {
        renderTask(note);
    });

    addbtn.addEventListener("click", () => {
        const newNotes = notesInput.value
        if (newNotes === "") return

        const notetxt = {
            id: Date.now(),
            text: newNotes
        }

        notes.push(notetxt)
        saveTask()
        renderTask(notetxt)
        notesInput.value = ""
        console.log(notes)
    })

    function renderTask(note) {
        const noteDiv = document.createElement("div")
        noteDiv.classList.add("note")
        noteDiv.innerHTML = `
            
            <p>${note.text}</p>
            <button class = "delete-btn">Delete</button>
           
            `;

        const deletebtn = noteDiv.querySelector(".delete-btn")
        deletebtn.addEventListener("click", (e) => {
            notes = notes.filter(function (n) {
                return n.id !== note.id
            })

            noteDiv.remove()
            saveTask()

        })

        notesSpace.appendChild(noteDiv)

    }



    function saveTask() {
        localStorage.setItem("notes", JSON.stringify(notes))
    }

})