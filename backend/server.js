//importing the dependencies
const express = require('express')
const connectToDb = require('./config/connectToDb')
const app = express()
const notesController=require("./controllers/notesController")
const cors =require('cors')

//loading the env variables
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
//connection to the database
connectToDb()
app.use(express.json())

app.use(cors())

//routing the routes

//fetching the notes
app.get('/notes', notesController.fetchNotes)

//feching a single note
app.get('/notes/:id', notesController.fetchNote )

//creation of a note
app.post('/notes', notesController.createNote )

//updating the notes
app.put('/notes/:id', notesController.updatedNote)
//deleting the note
app.delete('/notes/:id', notesController.deleteNote)
//start out the server
app.listen(process.env.PORT, (req, res) => {
  console.log('listening on port 3000')
})
