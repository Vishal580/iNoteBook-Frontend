import React, { useContext, useState, useEffect, useRef } from "react";
import noteContext from "../context/notes/noteContext";
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import {useNavigate} from "react-router-dom";

function Notes(props) {
    const context = useContext(noteContext);
    let navigate = useNavigate();
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });

    useEffect(() => {
        if(localStorage.getItem("token")){
            getNotes();
            // eslint-disable-next-line
        } else {
            navigate("/login");
        }
        // eslint-disable-next-line
    }, [])

    const ref = useRef(null);
    const refclose = useRef(null);

    const updateNote = (currentNote) => {
        ref.current.click();
        // editNote(note.id, note.etitle, note.edescription, note.etag);
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag});
        // Call editNote after setting the state
        setTimeout(() => {
            editNote(currentNote._id, currentNote.title, currentNote.description, currentNote.tag);
        }, 0);
    }
    
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClose = () => {
        document.activeElement.blur(); // Removes focus from the button
        const modal = document.getElementById("exampleModal");
        if (modal) {
            modal.classList.remove("show");
            modal.style.display = "none";
        }
    };
    
    const handleClick = (e) => {
        e.preventDefault();
        
        //Ensure the correct note ID is passed
        editNote(note.id, note.etitle, note.edescription, note.etag);

        //Remove focus from the active element
        document.activeElement.blur();
        
        //Close the modal properly after updating
        setTimeout(() => {
            refclose.current.click();
        }, 300);  // Add a slight delay to allow focus transition

        props.showAlert("Note Updated Successfully", "success");
    
    };
    
    return (
        <>
            {/* Button trigger modal */}
            <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal"></button>

            {/* Modal */}
            <div className="modal fade" id="exampleModal" tabIndex ="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Update Your Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={handleClose}></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="etitle" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="edescription" className="form-label">Description</label>
                                    <textarea type="text" className="form-control" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="etag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>

            <AddNote showAlert={props.showAlert}/>
            <div className="container row my-3">
                <h1>Your Notes</h1>
                <div className="container row mx-2">
                    {notes.length === 0 && "No notes to display"}
                </div>
                <div className="card-container">
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} showAlert={props.showAlert} note={note} />;
                })}
                </div>
            </div>
        </>
    );
}

export default Notes;
