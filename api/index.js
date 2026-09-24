const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const dataDir = path.join(__dirname, '..', 'data');
const usersFile = path.join(dataDir, 'users.json');
const ratingsFile = path.join(dataDir, 'ratings.json');
const placesFile = path.join(dataDir, 'places.json');

function readJsonFile(filePath, defaultValue) {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    }
  } catch (err) {
    console.error(`Error reading ${filePath}:`, err.message);
  }
  return defaultValue;
}

function writeJsonFile(filePath, data) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
    return true;
  } catch (err) {
    console.error(`Error writing ${filePath}:`, err.message);
    return false;
  }
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    project: 'Incredible Explorer Backend',
    timestamp: new Date().toISOString()
  });
});

// Auth: Sign Up
app.post('/api/auth/signup', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }
  const trimmedEmail = email.trim().toLowerCase();
  const users = readJsonFile(usersFile, []);
  if (users.find(u => u.email.toLowerCase() === trimmedEmail)) {
    return res.status(409).json({ success: false, message: 'An account with this email already exists.' });
  }
  const newUser = {
    id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
    email: trimmedEmail,
    password: password,
    createdAt: new Date().toISOString()
  };
  users.push(newUser);
  writeJsonFile(usersFile, users);
  res.status(201).json({
    success: true,
    message: 'Sign up successful! Please log in.',
    user: { id: newUser.id, email: newUser.email }
  });
});

// Auth: Login
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required.' });
  }
  const trimmedEmail = email.trim().toLowerCase();
  const users = readJsonFile(usersFile, []);
  const user = users.find(u => u.email.toLowerCase() === trimmedEmail && u.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: 'Invalid email or password.' });
  }
  res.json({
    success: true,
    message: 'Login successful!',
    user: { id: user.id, email: user.email }
  });
});

// Places
app.get('/api/places', (req, res) => {
  const places = readJsonFile(placesFile, {});
  res.json({ success: true, data: places });
});

// Ratings
app.post('/api/ratings', (req, res) => {
  const { userEmail, stars, comment } = req.body;
  const starCount = parseInt(stars, 10);
  if (isNaN(starCount) || starCount < 1 || starCount > 5) {
    return res.status(400).json({ success: false, message: 'Rating must be between 1 and 5.' });
  }
  const ratings = readJsonFile(ratingsFile, []);
  const newRating = {
    id: ratings.length > 0 ? ratings[ratings.length - 1].id + 1 : 1,
    userEmail: userEmail || 'Anonymous',
    stars: starCount,
    comment: comment || '',
    createdAt: new Date().toISOString()
  };
  ratings.push(newRating);
  writeJsonFile(ratingsFile, ratings);
  const averageStars = (ratings.reduce((acc, r) => acc + r.stars, 0) / ratings.length).toFixed(1);
  res.status(201).json({
    success: true,
    message: `Thank you! You rated ${starCount} star${starCount > 1 ? 's' : ''}.`,
    stats: { totalRatings: ratings.length, averageRating: averageStars }
  });
});

app.get('/api/ratings', (req, res) => {
  const ratings = readJsonFile(ratingsFile, []);
  const averageStars = ratings.length > 0
    ? (ratings.reduce((acc, r) => acc + r.stars, 0) / ratings.length).toFixed(1)
    : 0;
  res.json({
    success: true,
    count: ratings.length,
    averageRating: averageStars,
    ratings: ratings.slice(-10).reverse()
  });
});

module.exports = app;
