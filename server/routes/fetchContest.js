const express = require('express');
const router = express.Router();
const protectt = require('../middleware/authForSubMiddleware');
const Contest = require('../models/Contest');
const mongoose = require('mongoose');

router.get('/fetchContest', protectt, async (req, res) => {
    try {
        const contest = await Contest.find({}, { name: 1, startTime: 1, endTime: 1, _id: 1, visibility: 1 });
        res.status(200).json(contest);
    } catch (err) {
        res.status(500).json({ error: `Failed to fetch contests due to ${err}` });
    }
});


router.get('/joinedContests', protectt, async (req, res) => {
    try {
        const userId = req.user.id; // This should be the logged-in user's ID
        console.log("User ID from request:", userId);

        // Convert userId to ObjectId to match the `participants` type in MongoDB
        const userObjectId = new mongoose.Types.ObjectId(userId);

        const now = new Date();

        // Query contests where user is a participant and contest is active
        const contests = await Contest.find(
            {
                participants: userObjectId, // Matches user in participants array
                endTime: { $gt: now }      // Active contests
            },
            { name: 1, startTime: 1, endTime: 1, customProblems: 1,_id:1}
        );

        console.log("Fetched Contests:", contests);

        // Handle no contests found case
        if (contests.length === 0) {
            return res.status(200).json({ message: "You currently don't have any active contests." });
        }

        res.status(200).json(contests);
    } catch (error) {
        console.error("Error fetching contests:", error);
        res.status(500).json({ message: `Failed to fetch contests: ${error.message}` });
    }
});








module.exports = router;
