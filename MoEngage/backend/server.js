const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const dbLink = 'mongodb+srv://moEngage:moengage7654@cluster0.ahiwc19.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const jwtSecret = 'different_jwt_secret';

// Connect to MongoDB
mongoose.connect(dbLink, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Handle database connection events
mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB successfully');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err.message);
});

mongoose.connection.on('disconnected', () => {
  console.log('Disconnected from MongoDB');
});

// Define schema and model for List
const listSchema = new mongoose.Schema({
  name: String,
  creationDate: { type: Date, default: Date.now },
  responseCodes: [String],
  imageLinks: [String]
});

const List = mongoose.model('List', listSchema);

// Define schema and model for User
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: String
});

const User = mongoose.model('User', userSchema);

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, jwtSecret, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// API endpoints for List
app.post('/api/lists', async (req, res) => {
  try {
    const { name, responseCodes, imageLinks } = req.body;
    if (!name || !Array.isArray(responseCodes) || !Array.isArray(imageLinks)) {
      return res.status(400).json({ message: 'Invalid input data' });
    }
    const newList = new List({ name, responseCodes, imageLinks });
    await newList.save();
    res.status(201).json(newList);
  } catch (error) {
    console.error('Error saving list:', error);
    res.status(500).json({ message: 'Error saving list', error: error.message });
  }
});

app.get('/api/lists', async (req, res) => {
  try {
    const lists = await List.find();
    res.json(lists);
  } catch (error) {
    console.error('Error fetching lists:', error);
    res.status(500).json({ message: 'Error fetching lists', error: error.message });
  }
});

app.get('/api/lists/:id', async (req, res) => {
  try {
    const list = await List.findById(req.params.id);
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.json(list);
  } catch (error) {
    console.error('Error fetching list:', error);
    res.status(500).json({ message: 'Error fetching list', error: error.message });
  }
});

// Update list
app.put('/api/lists/:id', async (req, res) => {
  try {
    const { name, responseCodes, imageLinks } = req.body;
    const updatedList = await List.findByIdAndUpdate(
      req.params.id,
      { name, responseCodes, imageLinks },
      { new: true, runValidators: true }
    );
    if (!updatedList) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.json(updatedList);
  } catch (error) {
    console.error('Error updating list:', error);
    res.status(500).json({ message: 'Error updating list', error: error.message });
  }
});

// Delete list
app.delete('/api/lists/:id', async (req, res) => {
  try {
    const deletedList = await List.findByIdAndDelete(req.params.id);
    if (!deletedList) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.json({ message: 'List deleted successfully' });
  } catch (error) {
    console.error('Error deleting list:', error);
    res.status(500).json({ message: 'Error deleting list', error: error.message });
  }
});

// API endpoints for Authentication
app.post('/api/auth/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'User created' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }
  const token = jwt.sign({ email: user.email }, jwtSecret, { expiresIn: '1h' });
  res.json({ token });
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});
      
