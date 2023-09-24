import mongoose from 'mongoose';
import express from 'express';
import cors from 'cors';

// Initialize the app
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());

// MongoDB URI
const dbURI = 'mongodb+srv://test1:test123@data.23manba.mongodb.net/?retryWrites=true&w=majority';

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => {
    app.listen(3000, () => {
      console.log('Server is running on http://localhost:3000/');
    });
  })
  .catch(err => console.log(err));

// Define Schema and Model
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
  }
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

// Signup Route
app.post('/signup', async (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  
  try {
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json('User already exists');
    }

    const newUser = new User({
      firstname,
      lastname,
      email,
      password
    });

    await newUser.save();
    res.status(201).json('User created');
  } catch (error) {
    res.status(500).json(`Error: ${error}`);
  }
});

export default User;
