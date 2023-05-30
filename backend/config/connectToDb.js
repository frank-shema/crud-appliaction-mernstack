const mongoose = require('mongoose')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

async function connectToDb () {
  try{
    await mongoose.connect(process.env.DB_URL)
  console.log('connected to the database suceesfully')
  }
  catch(err){
    console.log(err)
  }
}

module.exports = connectToDb
