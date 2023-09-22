import MongoClient from 'mongodb';
import morgan from 'morgan';
import mongoose from 'mongoose';
import express from 'express';
import bycrpt from 'bcrypt'

const app = express()

const dbURI = 'mongodb+srv://test1:test123@data.23manba.mongodb.net/?retryWrites=true&w=majority'

console.log("Starting...");

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    console.log('worked')
    app.listen(3000)
  })
  .catch(err => console.log(err));

