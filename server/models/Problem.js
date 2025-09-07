// models/Problem.js
const mongoose = require('mongoose');

const problemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  constraints: { type: String, required: true },
  slug: {type: String, required: true},
  testCases: [
    {
      input: { type: String, required: true },
      expectedOutput: { type: String, required: true }
    }
  ]
});



const Problem = mongoose.model('Problem', problemSchema);
module.exports = Problem;
