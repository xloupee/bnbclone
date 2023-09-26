import mongoose from 'mongoose';
import express from 'express';
import bcrypt from 'bcrypt'; 
import cors from 'cors';
import jwt from "jsonwebtoken"

const app = express();  

// Database connection
const dbURI = 'mongodb+srv://test1:test123@data.23manba.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

// Middleware
app.use(express.json());
app.use(cors());


// Schema and Model
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  birthdate: {
    type: Date,
    required: true
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// user sign up
app.post('/signup', async (req, res) => {
  const { firstname, lastname, email, password, birthdate } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({message: 'User already exists'});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      birthdate
    });

    await newUser.save();

    const userPayload = {
      id: newUser._id,
      email: newUser.email,
      firstname: newUser.firstname,
      lastname: newUser.lastname,
      birthdate: newUser.birthdate
    };

    const token = jwt.sign(userPayload, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
    res.cookie('authToken', token, { httpOnly: true, secure: true });
    res.status(201).json({ message: 'User created', token: token });
  } 
  catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
});


// user login
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
          return res.status(400).json({ message: "User does not exist" });
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
          return res.status(400).json({ message: "Invalid password" })
        }

        const userPayload = {
          id: existingUser._id,
          email: existingUser.email,
          firstname: existingUser.firstname,
          lastname: existingUser.lastname
        };

        const token = jwt.sign(userPayload, 'YOUR_SECRET_KEY', { expiresIn: '1h' });
        res.cookie('authToken', token, { httpOnly: true, secure: true });
        res.json({ message: "Logged in", token: token, user: userPayload });
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});


// listen to local server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/');
});
