const mongoose = require('mongoose')
const contestSchema = new mongoose.Schema({
    name:{ type: String,required: true},
    creator: { type: String,ref: 'User',required: true},
    customProblems: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          constraints: { type: String, required: true },
          testCases: [
            {
              input: { type: String, required: true },
              expectedOutput: { type: String, required: true }
            }
          ]
        }
      ],
    startTime: { type: Date,required: true},
    endTime: { type: Date,required: true},
    visibility: { type: String,enum: ['public','private'],default: 'public'},
    inviteCode : {type: String,required: function(){return this.visibility === 'private'}},
    participants: [{type: mongoose.Schema.Types.ObjectId,ref:'User'}],
    leaderboard:[
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
            score: {type: Number, default:0},
            totalTime: { type: Number, default: 0 }

        }
    ]

})
const Contest = mongoose.model('Contest',contestSchema)
module.exports = Contest