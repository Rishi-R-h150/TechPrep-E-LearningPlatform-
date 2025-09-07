const express = require('express')
const router = express.Router()
const Contest = require('../models/Contest')
const crypto = require('crypto')
const  protectt   = require('../middleware/authForSubMiddleware')
const { protect } = require('../middleware/authMiddleware')
router.post('/createContest',protectt,async (req,res)=>{
    try{
        const {name, startTime, endTime, visibility, customProblems } = req.body;
        if(!name || !startTime || !endTime || !visibility || !customProblems ){
            return res.status(400).json({error: 'All fields are required'})
        }
        console.log(req.user.id)
        const inviteCode = visibility === 'private'? crypto.randomBytes(4).toString('hex'):null
        const contest = new Contest(
        {
            name,
            startTime: new Date(startTime),
            endTime: new Date(endTime),
            visibility,
            inviteCode,
            customProblems,
            creator: req.user.id
        }
        )
        await contest.save()
        res.status(201).json({ message: 'Contest created successfully',contest })
    }catch(error){
        res.status(500).json({error: 'Error creating contest'})
        console.log(error)
    }
})

module.exports = router