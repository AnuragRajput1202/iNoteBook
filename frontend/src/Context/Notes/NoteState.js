import { useState } from "react";
import NoteContext from "./NotesContext";

const NoteState = (props) => {
    const initialNotes = []
    const [notes, setNotes] = useState(initialNotes)
    const host = "https://inotebook-ec77.onrender.com"
    
    const getNotes = async () => {
        const url = `${host}/api/notes/fetchallnotes`
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        });
        const json = await response.json()
        setNotes(json.note)
    }

    const addNote = async ({ note }) => {
        const { title, description, tag } = note
        //API Call
        const url = `${host}/api/notes/addnote`
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        })
        //adding note to UI Logic
        const json = await response.json()
        setNotes(notes.concat(json.savedNote))
    }

    const deleteNote = async (id) => {
        //API call
        const url = `${host}/api/notes/deletenote/${id}`
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            }
        })
        // eslint-disable-next-line
        const json = await response.json()
        //Logic
        const newNotes = notes.filter(note => note._id !== id)
        setNotes(newNotes)
    }

    const updateNote = async (id, updatedTitle, updatedDescription, updatedTag) => {
        //API call
        const url = `${host}/api/notes/updatenote/${id}`
        const response = await fetch(url, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({ title: updatedTitle, description: updatedDescription, tag: updatedTag })
        })
        // eslint-disable-next-line
        const json = await response.json()

        //logic for update in UI
        let newNotes = JSON.parse(JSON.stringify(notes))
        for (let index = 0; index < newNotes.length; index++) {
            let element = newNotes[index]
            if (element._id === id) {
                newNotes[index].title = updatedTitle
                newNotes[index].description = updatedDescription
                newNotes[index].tag = updatedTag
                break
            }
        }
        setNotes(newNotes)
    }

    return (
        <NoteContext.Provider value={{ notes, getNotes, updateNote, addNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
