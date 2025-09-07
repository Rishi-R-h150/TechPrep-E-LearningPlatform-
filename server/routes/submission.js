const express = require('express')
const router = express.Router()
const Submission = require('../models/Submission')
const protectt = require('../middleware/authForSubMiddleware')

router.get('/submission/:problemId' , protectt , async(req,res)=>{
    const { problemId } = req.params
    const userId = req.user.id

    try{
        const submission = await Submission.find({ userId, problemId })
        res.json(submission)
    }catch(err){
        res.status(500).json({error : 'Failed to retrieve submissions '})
    }
})


module.exports = router 