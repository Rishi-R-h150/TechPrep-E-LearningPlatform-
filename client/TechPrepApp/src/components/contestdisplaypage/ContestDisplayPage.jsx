import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ContestDisplayPage.css';

const ContestDisplayPage = () => {
  const token = localStorage.getItem('token');
  const [contests, setContests] = useState([]);
  const [inviteCode, setInviteCode] = useState('');
  const [selectedContestId, setSelectedContestId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/displayContest/fetchContest', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setContests(response.data);
      } catch (err) {
        console.log('Failed to fetch contests:', err);
      }
    };
    fetchContests();
  }, []);

  const handleJoinClick = (contestId, isPrivate) => {
    if (isPrivate) {
      setSelectedContestId(contestId);
      setShowModal(true);
    } else {
      joinContest(contestId);
    }
  };

  const joinContest = async (contestId, inviteCode = null) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/joinContest/${contestId}/join`,
        { inviteCode },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        alert('Successfully joined the contest!');
      }
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to join the contest.');
    } finally {
      setShowModal(false);
      setInviteCode('');
    }
  };

  const getButton = (endTime, contest) => {
    const now = new Date();
    const contestEndTime = new Date(endTime);

    if (contestEndTime <= now) {
      return <p className="closed-message">Contest Closed</p>;
    }

    if (contest.visibility === 'private') {
      return (
        <button
          className="join-button"
          onClick={() => handleJoinClick(contest._id, true)}
        >
          Join Private Contest
        </button>
      );
    } else {
      return (
        <button
          className="join-button"
          onClick={() => handleJoinClick(contest._id, false)}
        >
          Join Contest
        </button>
      );
    }
  };

  return (
    <div>
      <h2>Available Contests</h2>
      <div className="outer-div">
        {contests.map((contest) => (
          <div className="contest-card" key={contest._id}>
            <h3>{contest.name}</h3>
            <p>Start Time: {new Date(contest.startTime).toLocaleString()}</p>
            <p>End Time: {new Date(contest.endTime).toLocaleString()}</p>
            {getButton(contest.endTime, contest)}
          </div>
        ))}

        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h3 className='model-text'>Enter Invite Code</h3>
              <input 
                type="text"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value)}
                placeholder="Invite Code"
                className='input-text'
              />
              <div className='button-container'>
              <button className = 'butT' onClick={() => joinContest(selectedContestId, inviteCode)}>
                Submit
              </button>
              <button className = 'butF' onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContestDisplayPage;
