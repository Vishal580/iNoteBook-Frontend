import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const baseURL = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);

  //Fetch Notes
  const getNotes = async () => {
    //API Call
    const response = await fetch(`${baseURL}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1ODI0NjQ0ZTMwODhjOTBmODIwMTA3In0sImlhdCI6MTczMzgyOTczMn0.w48fsrcz_WhKlsmxwdVyjrzY-X_gqCNrcbNIMF8-Iw0"
      }
    });
    const json = await response.json();
    //console.log(json);
    setNotes(json)
  }

  //Add Note
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${baseURL}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1ODI0NjQ0ZTMwODhjOTBmODIwMTA3In0sImlhdCI6MTczMzgyOTczMn0.w48fsrcz_WhKlsmxwdVyjrzY-X_gqCNrcbNIMF8-Iw0"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = response.json();
    console.log(json);

    console.log("New note added")
    const note = {
      "title": title,
      "description": description,
      "tag": tag,
    }
    setNotes(notes.concat(note))
  }

  // Delete Note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${baseURL}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1ODI0NjQ0ZTMwODhjOTBmODIwMTA3In0sImlhdCI6MTczMzgyOTczMn0.w48fsrcz_WhKlsmxwdVyjrzY-X_gqCNrcbNIMF8-Iw0"
      }
    });
    const json = response.json();
    console.log(json);

    // Logic to Delete Note
    console.log("Deleted note with id" + id)
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote)
  }

  // Edit Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${baseURL}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc1ODI0NjQ0ZTMwODhjOTBmODIwMTA3In0sImlhdCI6MTczMzgyOTczMn0.w48fsrcz_WhKlsmxwdVyjrzY-X_gqCNrcbNIMF8-Iw0"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json);

    // Logic to Edit a Note
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (notes._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }
    }

  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;