import React, { useState } from "react";
import axios from "axios";
import "./ContestCreation.css";

const ContestCreation = () => {
  const [contestName, setContestName] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [problems, setProblems] = useState([]);
  const [problemTitle, setProblemTitle] = useState("");
  const [description, setDescription] = useState("");
  const [constraints, setConstraints] = useState("");
  const [testCases, setTestCases] = useState([]);

  const handleAddTestCase = () => {
    setTestCases([...testCases, { input: "", expectedOutput: "" }]);
  };

  const handleAddProblem = () => {
    const newProblem = {
      title: problemTitle,
      description,
      constraints,
      testCases,
    };
    setProblems([...problems, newProblem]);
    setProblemTitle("");
    setDescription("");
    setConstraints("");
    setTestCases([]);
    console.log(problems);
  };

  const handleSubmitContest = async (e) => {
    e.preventDefault();
    const contestData = {
      name: contestName,
      startTime,
      endTime,
      visibility,
      customProblems: problems,
    };
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/contest/createContest",
        contestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Contest created successfully!");
      console.log(response.data);
    } catch (err) {
      alert("Failed to create contest");
      console.log(err);
    }
  };

  return (
    <div className="contest-creation">
      <h2 className="contest-title">Create a Contest</h2>
      <form className="contest-form" onSubmit={handleSubmitContest}>
        <div className="form-group">
          <label className="form-label">Contest Name:</label>
          <input
            className="form-input"
            type="text"
            value={contestName}
            onChange={(e) => setContestName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Start Time:</label>
          <input
            className="form-input"
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label className="form-label">End Time:</label>
          <input
            className="form-input"
            type="datetime-local"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label className="form-label">Visibility:</label>
          <select
            className="form-select"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="problem-section">
          <h3 className="section-title">Create a Problem</h3>
          <div className="form-group">
            <label className="form-label">Title:</label>
            <input
              className="form-input"
              type="text"
              value={problemTitle}
              onChange={(e) => setProblemTitle(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Description:</label>
            <textarea
              className="form-textarea"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Constraints:</label>
            <textarea
              className="form-textarea"
              value={constraints}
              onChange={(e) => setConstraints(e.target.value)}
            />
          </div>
          <div className="test-case-section">
            <h4 className="section-title">Test Cases:</h4>
            <button
              className="btn btn-add-test-case"
              type="button"
              onClick={handleAddTestCase}
            >
              Add Test Case
            </button>
            {testCases.map((testCase, index) => (
              <div className="test-case-inputs" key={index}>
                <input
                  className="form-input"
                  type="text"
                  placeholder="Input"
                  value={testCase.input}
                  onChange={(e) =>
                    setTestCases(
                      testCases.map((tc, i) =>
                        i === index ? { ...tc, input: e.target.value } : tc
                      )
                    )
                  }
                />
                <input
                  className="form-input"
                  type="text"
                  placeholder="Output"
                  value={testCase.expectedOutput}
                  onChange={(e) =>
                    setTestCases(
                      testCases.map((tc, i) =>
                        i === index
                          ? { ...tc, expectedOutput: e.target.value }
                          : tc
                      )
                    )
                  }
                />
              </div>
            ))}
          </div>
          <button
            className="btn btn-add-problem"
            type="button"
            onClick={handleAddProblem}
          >
            Add Problem
          </button>
        </div>
        <div className="problems-list">
          <h3 className="section-title">Problems in Contest:</h3>
          <ul className="problems-ul">
            {problems.map((problem, index) => (
              <li className="problem-item" key={index}>
                {problem.title}
              </li>
            ))}
          </ul>
        </div>
        <button className="btn btn-submit-contest" type="submit">
          Create Contest
        </button>
      </form>
    </div>
  );
};

export default ContestCreation;
