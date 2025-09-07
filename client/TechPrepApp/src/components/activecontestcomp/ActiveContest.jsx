import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ActiveContest.css'

const ActiveContest = () => {
    const token = localStorage.getItem('token');
    const [joinedContests, setJoinedContests] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate()

    console.log(token);

    useEffect(() => {
        const fetchJoinedContests = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/displayContest/joinedContests', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setJoinedContests(Array.isArray(response.data) ? response.data : []);
                console.log(response.data);
            } catch (err) {
                console.log('Failed to fetch joined Contests', err);
            } finally {
                setLoading(false);
            }
        };

        fetchJoinedContests();
    }, []);

    console.log(joinedContests);
    const clickHandler = (id) => {
        navigate(`/contest/joinedContest/${id}/environment`)

    }

    return (
        <div>
            <h2>My Contests</h2>
            {loading ? (
                <p>Loading...</p>
            ) : joinedContests.length === 0 ? (
                <p>You currently don’t have any active contests</p>
            ) : (
                <div>
                    {joinedContests.map((contest) => (
                        <div key={contest._id} className="contest-card">
                            <h3>{contest.name}</h3>
                            <p>Start Time: {new Date(contest.startTime).toLocaleString()}</p>
                            <p>End Time: {new Date(contest.endTime).toLocaleString()}</p>
                            <button onClick={()=>{
                                clickHandler(contest._id)
                            }}>Enter Contest</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ActiveContest;
