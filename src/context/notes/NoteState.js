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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2YTZiZWI2NDJjMjVmZGFjMzFiYmQ5In0sImlhdCI6MTc0MTg1MzExM30.z4qRMbCPpEErGorRrUfYL6AtgC08EguMd-Q9xF9DQqk"
      }
    });
    const json = await response.json();
    setNotes(json)
  }

  //Add Note
  const addNote = async (title, description, tag) => {
    //API Call
    const response = await fetch(`${baseURL}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2YTZiZWI2NDJjMjVmZGFjMzFiYmQ5In0sImlhdCI6MTc0MTg1MzExM30.z4qRMbCPpEErGorRrUfYL6AtgC08EguMd-Q9xF9DQqk"
      },
      body: JSON.stringify({title, description, tag})
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  }

  // Delete Note
  const deleteNote = async (id) => {
    // API call
    const response = await fetch(`${baseURL}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2YTZiZWI2NDJjMjVmZGFjMzFiYmQ5In0sImlhdCI6MTc0MTg1MzExM30.z4qRMbCPpEErGorRrUfYL6AtgC08EguMd-Q9xF9DQqk"
      }
    });
    response.json();

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
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjc2YTZiZWI2NDJjMjVmZGFjMzFiYmQ5In0sImlhdCI6MTc0MTg1MzExM30.z4qRMbCPpEErGorRrUfYL6AtgC08EguMd-Q9xF9DQqk"
      },
      body: JSON.stringify({title, description, tag})
    });
    response.json();

    let newNote = JSON.parse(JSON.stringify(notes));
    // Logic to Edit a Note
    for (let index = 0; index < notes.length; index++) {
      const element = newNote[index];
      if (element._id === id) {
        newNote[index].title = title;
        newNote[index].description = description;
        newNote[index].tag = tag;
        break;
      }
    }
    setNotes(newNote);

  }
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;