import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProblemENV.css';

const ProblemENV = () => {
  const { contestID } = useParams();
  const [contestName, setContestName] = useState('');
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:5000/api/contests/${contestID}/problems`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProblems(response.data.problems || []);
        setContestName(response.data.contestName || 'Unknown Contest');
      } catch (err) {
        console.error(`Error in fetching problems: ${err}`);
      }
    };

    fetchProblems();
  }, [contestID]);

  return (
    <div className='contest-portal'>
      <h1 className='contest-portal-title'>🏆{contestName}🏆</h1>
      <table className='contest-table'>
        <thead>
          <tr>
            <th className='contest-table-header'>Contest Problems</th>
          </tr>
        </thead>
        <tbody>
          {problems.length > 0 ? (
            problems.map((problem, index) => (
              <tr
                key={index}
                className='contest-problem-row'
                onClick={() => {
                  setSelectedProblem(problem);
                  navigate(`/contest/joinedContest/${contestID}/environment/${problem.title}`, {
                    state: { selectProblem: problem }
                  });
                }}
              >
                <td className='contest-problem-name'>{problem.title}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="1" className='no-problems-message'>No problems available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProblemENV;
