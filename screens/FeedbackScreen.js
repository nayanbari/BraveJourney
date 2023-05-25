import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

import React, { useState } from 'react'
import axios from 'axios';

const questions = [
  {
    key: 'routeLighting',
    question: 'How well-lit is the route during nighttime?',
  },
  {
    key: 'areaPopulation',
    question: 'How populated is the area along the route?',
  },
  {
    key: 'securityCameras',
    question: 'How safe do you perceive the presence of security cameras on the route?',
  },
  {
    key: 'lawEnforcementPresence',
    question: 'How frequently are law enforcement or security personnel present along the route?',
  },
  {
    key: 'crimeRate',
    question: 'How safe do you consider the overall crime rate in the area?',
  },
  {
    key: 'sidewalkMaintenance',
    question: 'How well-maintained are the sidewalks or footpaths along the route?',
  },
  {
    key: 'emergencyServices',
    question: 'How safe do you feel about the presence of emergency services along the route?',
  },
  {
    key: 'pedestrianCrossings',
    question: 'How well-marked are the pedestrian crossings or traffic signals along the route?',
  },
  {
    key: 'trafficSafety',
    question: 'How safe is the route in terms of vehicular traffic?',
  },
  {
    key: 'disasterRisk',
    question: 'How safe do you perceive the route in terms of natural disaster risks?',
  },
];

const FeedbackScreen = () => {
  const [comment, setComment] = useState('');
  const [ratings, setRatings] = useState({
    routeLighting: '',
    areaPopulation: '',
    securityCameras: '',
    lawEnforcementPresence: '',
    crimeRate: '',
    sidewalkMaintenance: '',
    emergencyServices: '',
    pedestrianCrossings: '',
    trafficSafety: '',
    disasterRisk: '',
  });

  const handleRatingChange = (key, value) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [key]: parseInt(value),
    }));
  };

  const handleFormSubmit = async () => {
    const feedbackData = {
      comment,
      ratings,
    };
    console.log(feedbackData)
    // Perform any validation or data processing before submitting the form
    // For simplicity, we'll just pass the comment and ratings to the onSubmit callback
    await axios
    .post('http://localhost:5000/feedback', feedbackData)
    .then(response => {
      console.log('Feedback submitted successfully');
      // Reset the form after successful submission
      setComment('');
      setRatings({
        routeLighting: '',
        areaPopulation: '',
        securityCameras: '',
        lawEnforcementPresence: '',
        crimeRate: '',
        sidewalkMaintenance: '',
        emergencyServices: '',
        pedestrianCrossings: '',
        trafficSafety: '',
        disasterRisk: '',
      });
    })
    .catch(error => {
      console.error('Error submitting feedback:', error);
      // Handle error condition
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Leave Feedback</Text>
      <TextInput
        style={styles.input}
        multiline={true}
        numberOfLines={4}
        placeholder="Enter your feedback here"
        value={comment}
        onChangeText={text => setComment(text)}
      />

      <Text style={styles.sectionTitle}>Route Safety Ratings</Text>

        {questions.map(({question, key}) => (
        <View style={styles.questionContainer}>
            <Text style={styles.question}>{question}</Text>
            <TextInput
              style={styles.ratingInput}
              keyboardType="numeric"
              placeholder="1-5"
              value={ratings.routeLighting}
              onChangeText={text => handleRatingChange(`${key}`, text)}
            />
          </View>
        ))}
      {/* Add more rating questions as needed */}

      <TouchableOpacity style={styles.button} onPress={handleFormSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 100,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 6,
  },
  questionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  question: {
    flex: 1,
    fontSize: 14,
  },
  ratingInput: {
    width: 40,
    height: 40,
    borderColor: '#CCCCCC',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
    textAlign: 'center',
    fontSize: 14,
  },
  button: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});


export default FeedbackScreen