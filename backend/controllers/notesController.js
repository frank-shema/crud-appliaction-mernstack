 const Note=require("../models/note")

 const fetchNotes=async (req, res) => {
    //find the notes
    try {
      const notes = await Note.find()
      //respond with the notes
      res.json(notes)
    } catch (err) {
      console.log(err)
    }
  }

  const fetchNote=async (req, res) => {
    try {
      //get the id off the url
      const noteId = req.params.id
      //find the note using the id
      const note = await Note.findById(noteId)
      //respond with the note
      res.json({ note })
    } catch (err) {
      console.log(err)
    }
  }

  const createNote= async (req, res) => {
    try {
      //get the sent in data off the request body
      const title = req.body.title
      const body = req.body.body
      //create a note
      const note = await Note.create({
        title,
        body
      })
      //respond with the created note
      res.json({ note: note })
    } catch (err) {
      console.log(err)
    }
  }

  const updatedNote =async (req, res) => {
    try {
      //getting the note id
      const noteId = req.params.id
      //get the data off the request body
      const title = req.body.title
      const body = req.body.body
      //updating the note
      await Note.findByIdAndUpdate(noteId, {
        title,
        body
      })
      //finding the updated note
      const note = await Note.findById(noteId)
  
      //respond with the updated no te
      res.json({ note })
    } catch (err) {
      console.log(err)
    }
  }

  const deleteNote =  async (req, res) => {
    try {
      //get the id of the note
      const noteId = req.params.id
      //delete the note
      await Note.deleteOne({ _id: noteId })
  
      //respond
      res.json({ sucess: 'the record has been deleted' })
    } catch (err) {
      console.log(err)
    }
  }

  module.exports={
    fetchNote,
    fetchNotes,
    deleteNote,
    updatedNote,
    createNote,
  }
  
  
  