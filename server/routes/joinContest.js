const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Contest = require('../models/Contest');
const protectt = require('../middleware/authForSubMiddleware');

router.post('/:id/join', protectt, async (req, res) => {
    try {
        const contestId = req.params.id;
        const userId = req.user.id;
        const { inviteCode } = req.body;

        
        if (!mongoose.Types.ObjectId.isValid(contestId)) {
            return res.status(400).json({ message: "Invalid contest ID" });
        }

        const contest = await Contest.findById(contestId);
        if (!contest) {
            return res.status(404).json({ message: "Contest not found" });
        }

        
        if (contest.visibility === 'private') {
            if (!inviteCode || inviteCode !== contest.inviteCode) {
                return res.status(400).json({ message: "Invalid invite code" });
            }
        }

        
        if (!Array.isArray(contest.participants)) {
            return res.status(500).json({ message: "Participants list is invalid" });
        }

        
        const isParticipant = contest.participants.some(
            participant => participant && participant.toString() === userId
        );
        if (isParticipant) {
            return res.status(400).json({ message: "You have already joined this contest" });
        }

        
        contest.participants.push(userId);
        await contest.save();

        res.status(200).json({ message: "Successfully joined the contest" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to join the contest" });
    }
});

module.exports = router;
