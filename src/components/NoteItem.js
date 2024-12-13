import React from 'react'

function NoteItem(props) {
  const {note} = props;
  return (
    <div className='col-md-3'>
          <div className="card my-3">
                <div className="card-body">
                      <h5 className="card-title">{note.title}</h5>
                      <p className="card-text">{note.description}</p>
                      <i className="fa-solid fa-trash-can mx-2" title='Delete Note'></i>
                      <i className="fa-solid fa-pen-to-square mx-2" title='Edit Note'></i>
                </div>
          </div>
    </div>
  )
}

export default NoteItem
