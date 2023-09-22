import mongoose from 'mongoose';
import express from 'express';
import bcrypt from 'bcrypt'; 
import cors from 'cors';

const app = express();  

// Database connection
const dbURI = 'mongodb+srv://test1:test123@data.23manba.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database connected'))
  .catch(err => console.log(err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Schema and Model
const userSchema = new mongoose.Schema({
    email: String,
    password: String
});
const User = mongoose.model('User', userSchema);

app.post("/signup", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.json("exist");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.json('User created');
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            return res.json("does not exist");
        }

        const isPasswordValid = await bcrypt.compare(password, existingUser.password);

        if (!isPasswordValid) {
            return res.json("Invalid password");
        }

        res.json("exist");
    } catch (error) {
        console.error(error);
        res.status(500).json("Internal Server Error");
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000/');
});
