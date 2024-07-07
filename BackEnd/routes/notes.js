const express = require('express')
const router = express.Router()
const Note = require('../models/Notes')
const fetchUser = require('../middlewares/fetchuser')
const { body, validationResult } = require('express-validator');

//Performing CRUD
//ROUTE 1: fetch all notes "/api/notes/fetchallnotes". Login is required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const note = await Note.find({ user: req.user.id })
        res.json({ note })
    } catch (error) {
        console.error(error.message)
        res.status(500).end("Internal server error")
    }
})

//ROUTE 2: add note to database "/api/notes/addnote". Login is required
router.post('/addnote', fetchUser, [
    body('title', 'Invalid name! Minimum 3 characters are required').isLength({ min: 3 }),
    body('description', 'Invalid password! Minimum 5 characters are required').isLength({ min: 5 })
], async (req, res) => {
    try {
        const { title, description, tag } = req.body
        //if there are errors, return bad request and highlight the errors
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        const note = new Note({
            title, description, tag, user: req.user.id.toString()
        })
        const savedNote = await note.save()
        return res.json({ savedNote })
    } catch (error) {
        console.error(error.message)
        res.status(500).end("Internal server error")
    }
})

// ROUTE 3: Updating an existing note "/api/notes/updatenote". Login is required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    try {
        const { title, description, tag } = req.body
        const newNote = {}
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (tag) { newNote.tag = tag }
        //checking if the note exist or not
        let note = await Note.findById(req.params.id.toString())
        if (!note) {
            return res.status(404).end("Not found")
        }
        //checking if the users are updating their own notes or not
        if (note.user.toString() !== req.user.id.toString()) {
            return res.status(404).end("Access denied!")
        }
        note = await Note.findByIdAndUpdate(req.params.id.toString(), { $set: newNote }, { new: true })
        return res.json(note)
    } catch (error) {
        console.error(error.message)
        res.json({ error: "Internal server error" })
    }
})

//ROUTE 4: Deleting a note "/api/notes/deletenote". Login is required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    try {
        //checking if the note exist or not
        let note = await Note.findById(req.params.id.toString())
        if (!note) {
            return res.status(404).end("Not found")
        }
        //checking if the users are deleting their own notes or not
        if (note.user.toString() !== req.user.id) {
            return res.status(404).end("Access denied!")
        }
        await Note.findByIdAndDelete(req.params.id)
        return res.json({ Success: "Note deleted successfully!" })

    } catch (error) {
        console.error(error.message)
        res.json({error:'Internal Server error'})
    }

})
module.exports = router