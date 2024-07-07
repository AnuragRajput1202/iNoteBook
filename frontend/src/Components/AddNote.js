import { React, useState, useContext } from "react"
import noteContext from '../Context/Notes/NotesContext'

const AddNote = (props) => {
    const context = useContext(noteContext)
    let { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const [focusTitle, setFocusTitle] = useState(false)
    const [focusDescription, setFocusDescription] = useState(false)

    const handleChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addNote({ note })
        setNote({ title: "", description: "", tag: "" })
        props.toggleAlert("Note Added!","primary")
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
        <div>
            <form>
                <h3>Add a Note</h3>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" onFocus={toggleFocusTitle} onBlur={toggleBlurTitle} className="form-control" id="title" name="title" value={note.title} aria-describedby="emailHelp" onChange={handleChange} />
                    {focusTitle && note.title.length < 3 && <p className="text-danger">Minimum 3 characters are required</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" onFocus={toggleFocusDescription} onBlur={toggleBlurDescription} className="form-control" id="description" name="description" value={note.description} onChange={handleChange} />
                    {focusDescription && note.description.length < 5 && <p className="text-danger">Minimum 5 characters are required</p>}
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={handleChange} value={note.tag} aria-describedby="emailHelp" />
                </div>
                <button disabled={note.title.length < 3 || note.description.length < 5} onClick={handleSubmit} type="submit" className="btn btn-primary">Add Note</button>
            </form>

        </div>
    )
}

export default AddNote
