import React, { useState, useContext, useRef } from "react";
import noteContext from "../context/notes/noteContext";

function NoteItem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  const [tagColor, setTagColor] = useState(note.tagColor || "#808080");

  const [pickerVisible, setPickerVisible] = useState(false); // Show/hide picker
  const [pickerPosition, setPickerPosition] = useState({ x: 0, y: 0 }); // Position

  const colorPickerRef = useRef(null); // Ref for picker container
  const hiddenInputRef = useRef(null); // Hidden input for triggering color picker

  // Function to position and show the color picker
  const handleTagClick = (e) => {
    const rect = e.target.getBoundingClientRect(); // Get tag position relative to viewport

    let posX = rect.right + window.scrollX + 10; // Adjust for horizontal scroll
    let posY = rect.top + window.scrollY; // Adjust for vertical scroll

    // Prevent the picker from going off-screen
    if (posX + 180 > window.innerWidth) {
      posX = rect.left + window.scrollX - 190; // Move left if near right edge
    }
    if (posY + 50 > window.innerHeight + window.scrollY) {
      posY = window.scrollY + window.innerHeight - 60; // Adjust if too low
    }

    setPickerPosition({ x: posX, y: posY });
    setPickerVisible(true);

    // Open the hidden color picker
    setTimeout(() => {
      hiddenInputRef.current.click(); // Opens hidden color picker
    }, 50);
  };

  const handleColorChange = async (e) => {
    const newColor = e.target.value;
    setTagColor(newColor);

    try {
      await fetch(`http://localhost:5000/api/notes/updateTagColor/${note._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ tagColor: newColor }),
      });
    } catch (error) {
      console.error("Error updating color:", error);
    }
  };

  // Hide picker when clicking outside
  const handleOutsideClick = (e) => {
    if (
      colorPickerRef.current &&
      !colorPickerRef.current.contains(e.target) &&
      e.target !== hiddenInputRef.current
    ) {
      setPickerVisible(false);
    }
  };

  // Add event listener for outside clicks
  React.useEffect(() => {
    if (pickerVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [pickerVisible]);


  return (
    <div className="col-md-3">
      <div className="card my-3">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <hr />

          {/* Clickable Tag to open color picker */}
          <span className="badge" style={{ backgroundColor: tagColor }} onClick={handleTagClick}>
            {note.tag}
          </span>

          <p className="card-text">{note.description}</p>

          {/* Icons */}
          <div className="card-icon d-flex justify-content-end">
            <i className="fa-solid fa-trash-can mx-2" title="Delete Note" onClick={() => {
              deleteNote(note._id);
              props.showAlert("Note Deleted Successfully", "success");
            }}></i>

            <i className="fa-solid fa-pen-to-square mx-2" title="Edit Note" onClick={() => {
              updateNote(note);
            }}></i>
          </div>
        </div>
      </div>

      {/* Floating Color Picker (Hidden Input) */}
      {pickerVisible && (
        <div className="color-picker" ref={colorPickerRef} style={{ position: "absolute", left: pickerPosition.x, top: pickerPosition.y, zIndex: 1000, }}>
          <input type="color" id="colorPicker" ref={hiddenInputRef} value={tagColor} onChange={handleColorChange} />
        </div>
      )}
    </div>
  );
}

export default NoteItem;
