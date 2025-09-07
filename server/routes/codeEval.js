const express = require('express');
const axios = require('axios');  
const router = express.Router();
const dotenv = require('dotenv');
const verifyToken = require('../middleware/jwtVerify');
dotenv.config();

router.post('/submit-code', verifyToken, async (req, res) => {
  const { code, language, problemId, isSubmission } = req.body;
  console.log('Code:', code);
  console.log('Language:', language);
  console.log('Problem ID:', problemId);
  console.log('Is submission:', isSubmission);
  const user = req.user;
  const userId = user ? user.id : null;

  const testCases = generateTestCases(problemId);
  const casesToRun = isSubmission ? testCases : testCases.slice(0, 2);

  const results = [];
  let maxRuntime = 0;
  let maxMemory = 0;
  let allTestsPassed = true;

  for (const testCase of casesToRun) {
    try {
      const apiResponse = await axios.post('https://judge0-ce.p.rapidapi.com/submissions', {
        source_code: code,
        language_id: mapLanguageToJudge0Id(language),
        stdin: testCase.input,
      }, {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
          'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        }
      });

      const submissionToken = apiResponse.data.token;

      let submissionResult;
      while (true) {
        await new Promise(resolve => setTimeout(resolve, 1000)); 
        submissionResult = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${submissionToken}`, {
          headers: {
            'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
          },
        });

        const resultData = submissionResult.data;

        if (resultData.status.id === 3 || resultData.status.id === 6) { // 3: Accepted, 6: Compilation Error
          const isCorrect = resultData.stdout && resultData.stdout.trim() === testCase.expectedOutput.trim();
          if (!isCorrect) allTestsPassed = false;

          results.push({
            input: testCase.input,
            output: resultData.stdout ? resultData.stdout.trim() : null,
            expectedOutput: testCase.expectedOutput.trim(),
            passed: isCorrect,
            error: resultData.stderr || resultData.compile_output || null,
          });

          maxRuntime = Math.max(maxRuntime, parseFloat(resultData.time || "0"));
          maxMemory = Math.max(maxMemory, parseInt(resultData.memory || "0", 10));
          break;
        } else if (resultData.status.id >= 4) { 
          results.push({
            input: testCase.input,
            output: null,
            expectedOutput: testCase.expectedOutput.trim(),
            passed: false,
            error: resultData.stderr || 'Execution failed',
          });
          allTestsPassed = false;
          break;
        }
      }
    } catch (error) {
      allTestsPassed = false;
      results.push({
        input: testCase.input,
        output: null,
        expectedOutput: testCase.expectedOutput,
        passed: false,
        error: `Error: ${error.message}`,
      });
    }
  }

  const status = allTestsPassed ? 'Accepted' : 'Rejected';

  if (isSubmission) {
    const submissionData = {
      userId: userId,
      problemId: problemId,
      code: code,
      runtime: maxRuntime,
      memory: maxMemory,
      status: status,
    };

    try {
      const Submission = require('../models/Submission');
      const newSubmission = new Submission(submissionData);
      await newSubmission.save();
    } catch (error) {
      console.error('Database save error:', error);
      return res.status(500).json({ error: 'Failed to save submission.' });
    }
  }

  res.json({
    testCaseResults: results,
    maxRuntime,
    maxMemory,
    status,
  });
});

// Helper functions
function mapLanguageToJudge0Id(language) {
  const languageMap = {
    'python': 71,
    'cpp': 54,
    'c': 50,
    'java': 62,
  };
  return languageMap[language];
}

function generateTestCases(problemId) {
  const testCases = {
    // Arrays and Hashing
    1: [
      { input: '2 7 11 15\n9', expectedOutput: '[0, 1]\n' },
      { input: '3 2 4\n6', expectedOutput: '[1, 2]\n' },
      { input: '3 3\n6', expectedOutput: '[0, 1]\n' },
    ],
    2: [
      { input: '1 2 3 1', expectedOutput: 'true\n' },
      { input: '1 2 3 4', expectedOutput: 'false\n' },
      { input: '1 1 1 3 3 4 3 2 4 2', expectedOutput: 'true\n' },
    ],

    // Two Pointers
    3: [
      { input: 'A man, a plan, a canal: Panama', expectedOutput: 'true\n' },
      { input: 'race a car', expectedOutput: 'false\n' },
      { input: ' ', expectedOutput: 'true\n' },
    ],
    4: [
      { input: '1 8 6 2 5 4 8 3 7', expectedOutput: '49\n' },
      { input: '1 1', expectedOutput: '1\n' },
      { input: '4 3 2 1 4', expectedOutput: '16\n' },
    ],

    // Sliding Window
    5: [
      { input: '1 2 3 4 5\n3', expectedOutput: '12\n' },
      { input: '2 3 4 1 5 1\n4', expectedOutput: '13\n' },
      { input: '1 1 1 1 1\n2', expectedOutput: '2\n' },
    ],
    6: [
      { input: 'aabacbebebe\n3', expectedOutput: '7\n' },
      { input: 'aaaa\n1', expectedOutput: '4\n' },
      { input: 'abcde\n2', expectedOutput: '2\n' },
    ],

    // Stack
    7: [
      { input: '()', expectedOutput: 'true\n' },
      { input: '()[]{}', expectedOutput: 'true\n' },
      { input: '(]', expectedOutput: 'false\n' },
    ],
    8: [
      { input: 'nums1: 4,1,2\nnums2: 1,3,4,2', expectedOutput: '[-1,3,-1]\n' },
      { input: 'nums1: 2,4\nnums2: 1,2,3,4', expectedOutput: '[3,-1]\n' },
      { input: 'nums1: 1,3\nnums2: 1,3,4,2', expectedOutput: '[3,4]\n' },
    ],

    // Binary Search
    9: [
      { input: 'nums: -1,0,3,5,9,12\ntarget: 9', expectedOutput: '4\n' },
      { input: 'nums: -1,0,3,5,9,12\ntarget: 2', expectedOutput: '-1\n' },
      { input: 'nums: 5\ntarget: 5', expectedOutput: '0\n' },
    ],
    10: [
      { input: 'nums: 1,3,5,6\ntarget: 5', expectedOutput: '2\n' },
      { input: 'nums: 1,3,5,6\ntarget: 2', expectedOutput: '1\n' },
      { input: 'nums: 1,3,5,6\ntarget: 7', expectedOutput: '4\n' },
    ],
    11: [
      { input: '1->2->3->4->5', expectedOutput: '5->4->3->2->1' },
      { input: '1->2', expectedOutput: '2->1' },
      { input: '7->6->5->4->3', expectedOutput: '3->4->5->6->7' },
    ],
    12: [
      { input: '2->4->3, 5->6->4', expectedOutput: '7->0->8' },
      { input: '9->9->9, 1->1->1', expectedOutput: '0->1->1->1' },
      { input: '1->0->1, 1->1', expectedOutput: '2->1->1' },
    ],
  };
  return testCases[problemId] || [];
}


module.exports = router;
