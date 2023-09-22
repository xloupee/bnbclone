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

  const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });
  
  userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
  
  const User = mongoose.model('User', userSchema);
  
  export default User;