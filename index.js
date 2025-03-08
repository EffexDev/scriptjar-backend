const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Import CORS middleware

const app = express();

// Replace with your MongoDB URI
const mongoURI = 'mongodb://<your-mongo-uri>';

mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());

// Use CORS middleware to allow cross-origin requests
app.use(cors());  // Allow all origins by default

// Models (for each collection)
const Department = mongoose.model('Department', new mongoose.Schema({
  name: String
}));

const Group = mongoose.model('Group', new mongoose.Schema({
  departments_id: mongoose.Schema.Types.ObjectId,
  name: String
}));

const Set = mongoose.model('Set', new mongoose.Schema({
  groups_id: mongoose.Schema.Types.ObjectId,
  name: String
}));

const Template = mongoose.model('Template', new mongoose.Schema({
  sets_id: mongoose.Schema.Types.ObjectId,
  template_name: String,
  content: String
}));

// API to get templates based on Department, Group, and Set
app.get('/templates', async (req, res) => {
  try {
    const { departmentId, groupId, setId } = req.query;
    
    // Validate inputs
    if (!departmentId || !groupId || !setId) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Find templates based on the given Set ID
    const templates = await Template.find({ sets_id: setId });

    if (templates.length === 0) {
      return res.status(404).json({ message: 'No templates found' });
    }

    return res.json(templates);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Server error' });
  }
});

// Start server
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
