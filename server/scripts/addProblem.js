const Problem = require('../models/Problem');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/TechPrep', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Function to add a problem to the database
const addProblem = async (problemFolder) => {
  const title = path.basename(problemFolder); // Get problem title from folder name
  
  // Check if the problem already exists in the database
  const existingProblem = await Problem.findOne({ title });
  if (existingProblem) {
    console.log(`Problem "${title}" already exists, skipping...`);
    return; // Skip this problem if it already exists
  }

  // Read problem details from files
  const description = fs.readFileSync(path.join(problemFolder, 'description.txt'), 'utf-8');
  const constraints = fs.readFileSync(path.join(problemFolder, 'constraints.txt'), 'utf-8');
  const testCases = JSON.parse(fs.readFileSync(path.join(problemFolder, 'testCases.json'), 'utf-8'));
  const slug = fs.readFileSync(path.join(problemFolder, 'slug.txt'), 'utf-8').trim();

  // Create a new problem document
  const problem = new Problem({
    title,
    description,
    constraints,
    testCases,
    slug,
  });

  await problem.save();
  console.log(`Problem "${title}" added successfully!`);
};

// Main function to read all problems from a directory
const addAllProblems = async () => {
  const problemsDirectory = path.join(__dirname, '../problems'); // Adjust path to where problems are stored
  const problemFolders = fs.readdirSync(problemsDirectory).map(folder => path.join(problemsDirectory, folder));

  for (const folder of problemFolders) {
    await addProblem(folder);
  }

  console.log('All problems processed successfully!');
};

// Execute the function and handle any errors
addAllProblems()
  .then(() => mongoose.disconnect())
  .catch((err) => {
    console.error('Error processing problems:', err);
    mongoose.disconnect();
  });
