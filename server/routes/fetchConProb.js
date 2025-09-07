const express = require('express')
const router = express.Router()
const Contest = require('../models/Contest.js')
const protectt = require('../middleware/authForSubMiddleware')

router.get('/:id/problems',protectt,async(req,res)=>{
    try{
        const contestId = req.params.id
        const contest = await Contest.findById(contestId)
        if (!contest){
            return res.status(404).json({message:'Contest not found'})
        }
        res.status(200).json({
            contestName: contest.name,
            problems: contest.customProblems
        })
    }catch(error){
        res.status(500).json({message: `Failed to fetch due to ${error}`})
    }
})

module.exports = router