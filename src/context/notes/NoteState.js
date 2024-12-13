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
        },{
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
        }
      ]
    const [notes, setNotes] = useState(notesInitial);

    return(
     <NoteContext.Provider value={{notes, setNotes}}>
        {props.children}
     </NoteContext.Provider>
    )
}

export default NoteState;