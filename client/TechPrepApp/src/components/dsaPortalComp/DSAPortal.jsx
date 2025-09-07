import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import topics from '../../assets/topicset';
import problems from '../../assets/problempertopicset';
import axios from 'axios';
import './DSAPortal.css'; // Import the CSS file

const DSAPortal = () => {
  const [expandedTopics, setExpandedTopics] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/signin');
      }

      try {
        await axios.get('http://localhost:5000/api/home', {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (error) {
        console.error('Error fetching protected data:', error);
        navigate('/signin');
      }
    };

    fetchData();
  }, [navigate]);

  const toggleTopic = (slug) => {
    setExpandedTopics((prevExpanded) => ({
      ...prevExpanded,
      [slug]: !prevExpanded[slug],
    }));
  };

  return (
    <div className="dsa-portal">
      <h1 className="dsa-portal-title">Practice</h1>
      <table className="dsa-table">
        <thead>
          <tr>
            <th className="dsa-table-header">Topics</th>
          </tr>
        </thead>
        <tbody>
          {topics.map((topic) => (
            <React.Fragment key={topic.id}>
              <tr
                className={`dsa-topic-row ${
                  expandedTopics[topic.slug] ? 'expanded' : ''
                }`}
                onClick={() => toggleTopic(topic.slug)}
              >
                <td>{topic.name}</td>
              </tr>
              {expandedTopics[topic.slug] && (
                <tr className="dsa-problems-row">
                  <td>
                    <ul className="dsa-problems-list">
                      {problems[topic.slug]?.map((problem) => (
                        <li key={problem.id} className="dsa-problem-item">
                          <Link
                            to={`/dsa-portal/${topic.slug}/${problem.id}`}
                            className="dsa-problem-link"
                          >
                            {problem.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DSAPortal;
