const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
app.use(bodyParser.json());
// const Feedback = require('./model/feedbackSchema')
app.use(cors());


const feedbackSchema = new mongoose.Schema({
    comment: String,
    ratings: {
      routeLighting: Number,
      areaPopulation: Number,
      securityCameras: Number,
      lawEnforcementPresence: Number,
      crimeRate: Number,
      sidewalkMaintenance: Number,
      emergencyServices: Number,
      pedestrianCrossings: Number,
      trafficSafety: Number,
      disasterRisk: Number,
    },
  });
  
const Feedback = mongoose.model('Feedback', feedbackSchema);


// Connect to MongoDB
mongoose.connect('mongodb+srv://nayanbari89:nayan@cluster0.jsrt85g.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to the database');
});

app.post('/feedback', async (req, res) => {
    const feedbackData = req.body;
  
    try {
      const feedback = new Feedback(feedbackData);
      await feedback.save();
      res.status(200).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      res.status(500).json({ message: 'Error submitting feedback' });
    }
});

const PORT = 5000;

// Define your routes and other server logic here

// Start the server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});