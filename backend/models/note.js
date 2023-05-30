   const mongoose=require('mongoose');

//create a new schema
const noteSchema=new mongoose.Schema({
title:String,
body:String,

})

//create a model for the schema
const Note=mongoose.model('Note',noteSchema)

module.exports=Note;