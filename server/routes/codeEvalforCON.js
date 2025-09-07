const express = require('express')
const axios = require('axios')
const router = express.Router()
const dotenv = require('dotenv')
const verifyToken = require('../middleware/jwtVerify')
dotenv.config()
router.post('/submit-code',verifyToken,async (req,res) => {
    const {code,language,testCases,problemName,isSubmission} = req.body;
    const user = req.user
    const userId = user ? user.id : null
    const casesToRun = isSubmission ? testCases : testCases.slice(0, 2);
    const results = []
    let maxRuntime = 0
    let maxMemory = 0
    let allTestsPassed = true
    console.log(`code - ${code}`)
    console.log('language - ${language]')
    console.log(`isSubmission -${isSubmission}`)
    console.log(`testCases - ${testCases}`)
    for(const testCase of casesToRun){
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
        let submissionResult = await axios.get(`https://judge0-ce.p.rapidapi.com/submissions/${submissionToken}`,{
            headers: {
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
            },
        })
        const resultData = submissionResult.data
        if(resultData.status.id === 3 || resultData.status.id === 6){
            const isCorrect = resultData.stdout && resultData.stdout.trim() === testCase.expectedOutput.trim(); 
            if(!isCorrect) allTestsPassed = false;
            results.push({
                input: testCase.input,
                output: resultData.stdout ? resultData.stdout.trim() : null,
                expectedOutput: testCase.expectedOutput.trim(),
                passes: isCorrect,
                error: resultData.stderr || resultData.compile_output || null,
            })
            maxRuntime = Math.max(maxRuntime, parseFloat(resultData.time || "0"));
            maxMemory = Math.max(maxMemory, parseInt(resultData.memory || "0", 10));

        }else if (resultData.status.id >= 4) { 
            results.push({
              input: testCase.input,
              output: null,
              expectedOutput: testCase.expectedOutput.trim(),
              passed: false,
              error: resultData.stderr || 'Execution failed',
            });
            allTestsPassed = false;
        }
        

        }catch(error){
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
    if(isSubmission){
        const submissionData = {
            userId: userId,
            code: code,
            runtime: maxRuntime,
            memory: maxMemory,
            status: status,
          };
    }
    
    res.json({
        testCaseResults: results,
        maxRuntime,
        maxMemory,
        status,
      });
})
//helper functions
function mapLanguageToJudge0Id(language) {
    const languageMap = {
      'python': 71,
      'cpp': 54,
      'c': 50,
      'java': 62,
    };
    return languageMap[language];
  }
  

module.exports = router