import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import MonacoEditor from '@monaco-editor/react';
import axios from 'axios';  
import './ProblemPage.css';
import ClipLoader from 'react-spinners/ClipLoader'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import problems from '../../assets/disTcaseinPpage';
import languageOptions from '../../assets/languageOptions';
import answersDSA from '../../assets/answersDSA';

const arr = ['Question','Solution','Submission']
const ProblemPage = () => {
  const { topicSlug, problemId } = useParams();
  const problem = problems[topicSlug]?.find((p) => p.id === parseInt(problemId));
  const correctAnswer = answersDSA[topicSlug]?.find((a) => a.id === parseInt(problemId));

  const [selectedTab,setSelectedTab] = useState('Question')
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [language, setLanguage] = useState('python'); 
  const [Loading,setLoading] = useState(false)
  const [submission, setSubmission] = useState([])
  const [expanded,setExpanded] = useState({})
  const navigate = useNavigate()
  let problemDiff = ""
  if(problem.difficulty === 'Easy'){
    problemDiff = 'Easy'
  }else if(problem.difficulty === 'Medium'){
    problemDiff = 'Medium' }else{
      problemDiff = 'Hard'
    }
  useEffect(()=>{
    const fetchData = async ()=>{
      const token = localStorage.getItem('token')
      if(!token){
        navigate("/signin")
      }
      try{
        const response = await axios.get('http://localhost:5000/api/home',{
          headers:{
            Authorization : `Bearer ${token}`
          }
        })
      }catch(error){
        navigate("/signin")
      }
      
    }
    fetchData()


  },[navigate])


  



  const toggleExpand = (id) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }))
  }



  const fetchSubmission = async ()=>{
    try{
      const tok = localStorage.getItem('token')
      const res = await axios.get(`http://localhost:5000/api/handlesubmissions/submission/${problemId}`,{
        headers:{
          Authorization : `Bearer ${tok}`
        },
      })
      

      setSubmission(res.data)
     
      console.log(submission)
    }catch(error){
      console.log(`Error in fetching Submissions ${error}`)
    }
  }
  
  useEffect(()=>{
    const savedCode = localStorage.getItem(`code-${topicSlug}-${problemId}`)
    if(savedCode){
      setCode(savedCode)
    }

    
  },[topicSlug, problemId])

  useEffect(()=>{
    fetchSubmission()
  },[problemId])

  useEffect(() => {
    console.log('Updated submission:', submission); 
  }, [submission]);
  

  const handleCodeChange = (value) =>{
    setCode(value)
    localStorage.setItem(`code-${topicSlug}-${problemId}`,value)
  }

  const token = localStorage.getItem('token')
  
  

  if (token) {
    const base64Url = token.split('.')[1]; 
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/'); 
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const decodedToken = JSON.parse(jsonPayload);
    //console.log(decodedToken); 
  }

 
  const handleRunCode = async (isSubmission) => {
    setLoading(true)
   
    console.log(token)
    try {
      const response = await axios.post('http://localhost:5000/api/problems/submit-code', {
        code: code,            
        language: language,   
        problemId: problem.id, 
        isSubmission,
      },
      {
        headers:{
          Authorization: `Bearer ${token}`
        }
      }
    
    );
      console.log(response)
      const result = response.data;

      
      let outputDisplay = '';
      result.testCaseResults.forEach((testCaseResult, index) => {
        outputDisplay += `Test Case ${index + 1}:\n`;
        outputDisplay += `Input: ${testCaseResult.input}\n`;
        outputDisplay += `Output: ${testCaseResult.output}\n`;
        outputDisplay += `Expected: ${testCaseResult.expectedOutput}\n`;
        outputDisplay += testCaseResult.passed ? '✅ Passed\n' : '❌ Failed\n';
        if (testCaseResult.error) {
          outputDisplay += `Error: ${testCaseResult.error}\n`;
        }
        outputDisplay += '\n';  
      });


      setOutput(outputDisplay);

      if(isSubmission){
        fetchSubmission()
      }
    } catch (error) {
      setOutput(`Error: ${error.message}`);
     
    } finally{
      setLoading(false)
    }
  };

  const handleLanguageChange = (e) => {
    const selectedLanguage = languageOptions[e.target.value];
    setLanguage(selectedLanguage); 
  };
  const renderTabContent = () => {
    if(selectedTab === 'Question')
    {
      return (
        <div>
          <h1>{problem.name}</h1>
          <p className={problemDiff}> {problem.difficulty}</p>
          <p><strong>Description:</strong> {problem.description}</p>
          <p><strong>Constraints:</strong></p>
          <ul>
                {problem.constraints.map((s)=>{
                  return (<li key = {problems.id}>
                    {s}
                  </li>)
                })}
          </ul>
          <div className='example'>
            <h3>Example:</h3>
            <div className='input-output'>
              <p><strong>Input:</strong></p>
              <pre>{problem.exampleInput}</pre>
              <p><strong>Output:</strong></p>
              <pre>{problem.exampleOutput}</pre>
            </div>
          </div>

        </div>
      )
    }else if(selectedTab === 'Solution'){
      return (
      <div>
        <h2>Solution</h2>
        <p><strong>Approach:</strong> {correctAnswer.solution.approach}</p>
        <p><strong>Time Complexity:</strong> {correctAnswer.solution.timeComplexity}</p>
        <p><strong>Space Complexity:</strong> {correctAnswer.solution.spaceComplexity}</p>
        <div className='code-box'>
          <pre>{correctAnswer.solution.code}</pre>
        </div>
      </div>
    );
    }else if(selectedTab === 'Submission'){
      return (
        <div>
          <h2>Submissions</h2>
          <ul className="submission-list">
            {submission.map((each_sub) => (
              <li key={each_sub._id} className="submission-item">
                <div className="submission-summary" onClick={() => toggleExpand(each_sub._id)}>
                  <p className="submission-status" style={{ color: each_sub.status === 'Accepted' ? 'green' : 'red' }}>
                    {each_sub.status}
                  </p>
                  <p className="submission-date">
                    {new Date(each_sub.submissionDate).toLocaleString()}
                  </p>
                  {expanded[each_sub._id] ? <FaChevronUp /> : <FaChevronDown />}
                </div>
                {expanded[each_sub._id] && (
                  <div className="submission-details">
                    <pre className="submission-code">{each_sub.code}</pre>
                    <p><strong>Runtime:</strong> {each_sub.runtime}</p>
                    <p><strong>Memory:</strong> {each_sub.memory}</p>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }

  if (!problem) return <div>Problem not found</div>;

  return (
    <div className="problem-page">
      
      
      <div className='content-bar'>
          <ul>
            {arr.map((tab)=>(
              <li key = {tab} className={selectedTab === tab ? 'active-tab' : ''} onClick={()=>{
                
                setSelectedTab(tab)
                console.log(tab)
                }}>
                  {tab}
              </li>
            ))}
          </ul>
      </div>
      
      <div className="content-layout">
       
        
        <div className="problem-section">
          {renderTabContent()}
        </div>

  
          <div className="editor-section">
            <div className="language-selector">
              <label htmlFor="language">Select Language:</label>
              <select id="language" value={Object.keys(languageOptions).find(key => languageOptions[key] === language)} onChange={handleLanguageChange}>
                {Object.keys(languageOptions).map((lang) => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>

            </div>
           
            <div className='editor-container'>
              <MonacoEditor
                height="400px"
                language={language}
                theme="vs-dark" 
                value={code}
                onChange={handleCodeChange}
                options={{
                  minimap: {enabled: false},
                  cursorBlinking: 'smooth',
                  fontSize: 17,
                
                }}
              />
            </div>
            {Loading ? (
              <div className='spinner-container'>
              <ClipLoader className = "spinner" color = "#36D7B7" size = {50}/>
              </div>
            ):(
            <>
              <button className="run-button" onClick = {() => handleRunCode(false)}>Run Code</button>
              <button className='submit-button' onClick = {() => handleRunCode(true)}>Submit Code</button>
            </>
          )
            }
            
         
            <div className="output-section">
              <h2>Output:</h2>
              <pre>{output}</pre>
            </div>
                
          </div>
                
      </div>
    </div>
  );
};

export default ProblemPage;
