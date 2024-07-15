const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

const app = express();
const port = process.env.PORT || 6000;

// Middleware to parse JSON requests
app.use(express.json());


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  databaseName: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error.message);
});

// Signup route to create a new user and their database
app.post('/signup', async (req, res) => {
  const { username, password } = req.body;

  const databaseName = `db_${username}`;

  try {
    // Check if user already exists
    if (await User.findOne({ username })) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create the new user
    const newUser = new User({ username, password, databaseName });
    await newUser.save();

    // Create a new connection to the user's database
    const userDbUri = `${process.env.MONGO_URI}${databaseName}?retryWrites=true&w=majority`;
    const userDbConnection = mongoose.createConnection(userDbUri);

    // Optionally create initial collections or perform setup operations
    const exampleSchema = new mongoose.Schema({
      name: String,
      value: Number,
    });

    const Example = userDbConnection.model('Example', exampleSchema);

    res.status(201).json({ message: 'User created and database initialized' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Login route to authenticate a user and connect to their database
app.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find the user by username
    const user = await User.findOne({ username });
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }


    res.status(200).json({ user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.get('/example', async (req, res) => {
  const Example = req.userDbConnection.model('Example', new mongoose.Schema({
    name: String,
    value: Number,
  }));

  try {
    const examples = await Example.find();
    res.status(200).json(examples);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
