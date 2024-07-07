import { React, useContext } from 'react'
import noteContext from '../Context/Notes/NotesContext'

const NoteItems = (props) => {
    const context = useContext(noteContext)
    const { deleteNote } = context

    const deleteSelectedNote = () =>{
        deleteNote(props.id)
        props.toggleAlert("Deleted 1 note successfully!","primary")
    }
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <h5 className="card-title">{props.title}</h5>
                    <p className="card-text">{props.description}</p>
                    <p className="card-text text-secondary fs-8">{"#" + props.tag}</p>
                    <div className='controls d-flex justify-content-between'>
                        <i onClick={deleteSelectedNote} className="fa-solid fa-trash-can"></i>
                        <i onClick={()=>props.editNote(props.id, props.title, props.description, props.tag)} className="fa-solid fa-pen-to-square"></i>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default NoteItems
