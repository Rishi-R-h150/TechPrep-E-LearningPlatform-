import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import MonacoEditor from '@monaco-editor/react';
import axios from 'axios';
import languageOptions from '../../assets/languageOptions';
import './CodeEditorForCON.css';
import ClipLoader from 'react-spinners/ClipLoader';
import PopUpModel from '../popmodel/PopUpModel';

const CodeEditorForCON = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedProblem = location.state?.selectProblem;
  const [output,setOutput] = useState('')
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [loading, setLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
 
  // Handle language change
  const handleLanguageChange = (e) => {
    const selectedLanguage = languageOptions[e.target.value];
    setLanguage(selectedLanguage);
  };

  // Handle code change
  const handleCodeChange = (value) => {
    setCode(value);
    if (selectedProblem?.title) {
      localStorage.setItem(`code-${selectedProblem.title}`, value);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
        return;
      }
      try {
        await axios.get('http://localhost:5000/api/home', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch {
        navigate('/signin');
      }
    };
    fetchData();
  }, [navigate]);

  const handleRunCode = async (isSubmission) => {
    if(isSubmission){
      if(isSubmitted){
        setModalMessage('You have already submitted. You can only have one submission and it will be taken for final score.')
        setShowModel(true)
        return
      }else{
        setIsSubmitted(true)
        setModalMessage('Your submission is final and will be taken for final score.')
        setShowModel(false)
      }
    }

    setLoading(true);
    console.log(selectedProblem);
    const token = localStorage.getItem('token')
    try {
      const response = await axios.post('http://localhost:5000/api/con/submit-code', 
        {
          code: code,
          language: language,
          testCases: selectedProblem.testCases,
          problemName: selectedProblem.title,
          isSubmission,

        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Response:', response.data);
      const result = response.data;
      let outputDisplay = '';
      result.testCaseResults.forEach((testCaseResult, index) => {
        outputDisplay += `Test Case ${index + 1}:\n`;
        outputDisplay += `Input: ${testCaseResult.input}\n`;
        outputDisplay += `Output: ${testCaseResult.output}\n`;
        outputDisplay += `Expected: ${testCaseResult.expectedOutput}\n`;
        outputDisplay += testCaseResult.passes ? '✅ Passed\n' : '❌ Failed\n';
        if (testCaseResult.error) {
          outputDisplay += `Error: ${testCaseResult.error}\n`;
        }
        outputDisplay += '\n';
      })
      setOutput(outputDisplay);

    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };
  const closeModal = () => {
    setShowModel(false)
  }




  return (
    <div className="problem-page">
      <div className="content-layout">
        {/* Problem Section */}
        <div className="problem-section">
          <h1>{selectedProblem?.title}</h1>
          <p>
            <strong>Description:</strong> {selectedProblem?.description}
          </p>
          <p>
            <strong>Constraints:</strong>
          </p>
          <ul>
            <li>{selectedProblem?.constraints}</li>
          </ul>
          {selectedProblem?.testCases?.length > 0 && (
            <div className="example">
              <h3>Example:</h3>
              <div className="input-output">
                <p>
                  <strong>Input:</strong>
                </p>
                <pre>{selectedProblem.testCases[0].input}</pre>
                <p>
                  <strong>Output:</strong>
                </p>
                <pre>{selectedProblem.testCases[0].expectedOutput}</pre>
              </div>
            </div>
          )}
        </div>

        {/* Editor Section */}
        <div className="editor-section">
          <div className="language-selector">
            <label htmlFor="language">Select Language:</label>
            <select
              id="language"
              value={Object.keys(languageOptions).find(
                (key) => languageOptions[key] === language
              )}
              onChange={handleLanguageChange}
            >
              {Object.keys(languageOptions).map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
          <div className="editor-container">
            <MonacoEditor
              height="400px"
              language={language}
              theme="vs-dark"
              value={code}
              onChange={handleCodeChange}
              options={{
                minimap: { enabled: false },
                cursorBlinking: 'smooth',
                fontSize: 17,
              }}
            />
          </div>
          {loading ? (
            <div className='spinner-container'>
              <ClipLoader className='spinner' color = "#36D7B7" size = {50}/>
            </div>
          ):(
            <>
              <button className="run-button" onClick={() => handleRunCode(false)}>Run Code</button>
              <button className='submit-button' onClick={()=> handleRunCode(true)}>Submit Code</button>
            </>
          )}
          <div className="output-section">
            <h2>Output:</h2>
            <pre>{output}</pre>
          </div>
          {showModel && <PopUpModel message={modalMessage} onClose={closeModal} />}
        </div>
      </div>
    </div>
  );
};

export default CodeEditorForCON;
