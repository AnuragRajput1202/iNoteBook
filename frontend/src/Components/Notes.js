import { React, useContext, useEffect, useRef, useState } from 'react'
import NoteItems from './NoteItems'
import noteContext from '../Context/Notes/NotesContext'
import AddNote from './AddNote'
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    const [updatedNote, setUpdatedNote] = useState({ id: "", title: "", description: "", tag: "" })
    const context = useContext(noteContext)
    const { notes, getNotes, updateNote } = context;
    const ref = useRef(null)
    const [focusTitle, setFocusTitle] = useState(false)
    const [focusDescription, setFocusDescription] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        if(localStorage.getItem('token')){
            getNotes()
        } else{
            navigate('/login')
            props.toggleAlert("You need to login first","danger")
        } 
        // eslint-disable-next-line
    }, [])

    const editNote = (id, title, description, tag) => {
        ref.current.click()
        setUpdatedNote({
            id: id,
            title: title,
            description: description,
            tag: tag
        })
    }
    const handleChange = (e) => {
        setUpdatedNote({ ...updatedNote, [e.target.name]: e.target.value })
    }
    const saveChanges = (e) => {
        e.preventDefault()
        updateNote(updatedNote.id, updatedNote.title, updatedNote.description, updatedNote.tag)
        setUpdatedNote({ id: "", title: "", description: "", tag: "" })
        props.toggleAlert("Update Successfull!", "primary")
    }
    const toggleFocusTitle = () =>{
        setFocusTitle(true)
    }
    const toggleBlurTitle = () =>{
        setFocusTitle(false)
    }
    const toggleFocusDescription = () =>{
        setFocusDescription(true)
    }
    const toggleBlurDescription = () =>{
        setFocusDescription(false)
    }
    return (
        <>
            <AddNote toggleAlert={props.toggleAlert}/>
            <button hidden ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Update Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" onFocus={toggleFocusTitle} onBlur={toggleBlurTitle} className="form-control" id="title" value={updatedNote.title} name="title" aria-describedby="emailHelp" onChange={handleChange} />
                                    {focusTitle && updatedNote.title.length < 3 && <p className="text-danger">Minimum 3 characters are required</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" onFocus={toggleFocusDescription} onBlur={toggleBlurDescription} className="form-control" id="description" value={updatedNote.description} name="description" onChange={handleChange} />
                                    {focusDescription && updatedNote.description.length < 5 && <p className="text-danger">Minimum 5 characters are required</p>}
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="tag" name="tag" value={updatedNote.tag} onChange={handleChange} aria-describedby="emailHelp" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <input disabled={updatedNote.title.length < 3 || updatedNote.description.length < 5} onClick={saveChanges} type="button" data-bs-dismiss="modal" className="btn btn-primary" value='Save Changes' />
                        </div>
                    </div>
                </div>
            </div>
            <h3 className='mb-2 mt-3'>Your Notes</h3>
            {notes.length === 0 &&
                <div className='row mx-1'>No notes available to display</div>}
            <div className='row'>
                {notes.map((note) => {
                    return <NoteItems toggleAlert={props.toggleAlert} key={note._id} id={note._id} editNote={editNote} title={note.title} description={note.description} tag={note.tag} />
                })}
            </div>
        </>
    )
}

export default Notes
