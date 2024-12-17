import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
    const notesInitial = [
        {
          "_id": "675944b397a698e5050256b6",
          "user": "675824644e3088c90f820107",
          "title": "Updated title 2",
          "description": "Updated Description 2",
          "tag": "Updated Tag",
          "date": "2024-12-11T07:52:19.153Z",
          "__v": 0
        },
        {
          "_id": "675944b397a698e5050256b8",
          "user": "675824644e3088c90f820107",
          "title": "My Title3",
          "description": "My description",
          "tag": "My Tag",
          "date": "2024-12-11T07:52:19.998Z",
          "__v": 0
        },
        {
          "_id": "675944b497a698e5050256ba",
          "user": "675824644e3088c90f820107",
          "title": "My Title3",
          "description": "My description",
          "tag": "My Tag",
          "date": "2024-12-11T07:52:20.631Z",
          "__v": 0
        },
        {
          "_id": "675944b397a69re8e5050256b6",
          "user": "675824644e3088c90f820107",
          "title": "Updated title 2",
          "description": "Updated Description 2",
          "tag": "Updated Tag",
          "date": "2024-12-11T07:52:19.153Z",
          "__v": 0
        },
        {
          "_id": "675944b397ae698e5050256b8",
          "user": "675824644e3088c90f820107",
          "title": "My Title3",
          "description": "My description",
          "tag": "My Tag",
          "date": "2024-12-11T07:52:19.998Z",
          "__v": 0
        },
        {
          "_id": "675944b497a69g8e5050256ba",
          "user": "675824644e3088c90f820107",
          "title": "My Title3",
          "description": "My description",
          "tag": "My Tag",
          "date": "2024-12-11T07:52:20.631Z",
          "__v": 0
        },{
          "_id": "675944b397a698ge5050256b6",
          "user": "675824644e3088c90f820107",
          "title": "Updated title 2",
          "description": "Updated Description 2",
          "tag": "Updated Tag",
          "date": "2024-12-11T07:52:19.153Z",
          "__v": 0
        },
        {
          "_id": "675944b397a69h8e5050256b8",
          "user": "675824644e3088c90f820107",
          "title": "My Title3",
          "description": "My description",
          "tag": "My Tag",
          "date": "2024-12-11T07:52:19.998Z",
          "__v": 0
        },
        {
          "_id": "675944b497a698e54050256ba",
          "user": "675824644e3088c90f820107",
          "title": "My Title3",
          "description": "My description",
          "tag": "My Tag",
          "date": "2024-12-11T07:52:20.631Z",
          "__v": 0
        }
      ]
    const [notes, setNotes] = useState(notesInitial);

    //Add Note
    const addNote = (title, description, tag) =>{
      // TODO: API Call
      console.log("New note added")
      const note = {
        "_id": "675944b497a643498e54050256ba",
        "user": "675824644e3088c90f34820107",
        "title": title,
        "description": description,
        "tag": tag,
        "date": "2024-12-11T07:52:20.631Z",
        "__v": 0
      }
      setNotes(notes.concat(note))
    }

    // Delete Note
    const deleteNote = (id) =>{
      // TODO: API Call
      console.log("Deleted note with id"+id)
      const newNote = notes.filter((note)=>{return note._id!==id})
      setNotes(newNote)
    }

    // Edit Note
    const editNote = () =>{

    }
    return(
     <NoteContext.Provider value={{notes, addNote, deleteNote, editNote}}>
        {props.children}
     </NoteContext.Provider>
    )
}

export default NoteState;