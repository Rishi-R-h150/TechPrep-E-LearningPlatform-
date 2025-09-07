const mongoose = require('mongoose')

const submissionSchema = new mongoose.Schema({
    userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User', required: true},
    problemId: {type:Number, required: true},
    code: {type: String,required: true},
    runtime: {type: Number, required: true},
    memory : {type : Number , required:true},
    submissionDate : {type : Date , default : Date.now},
    status: { type: String, enum: ['Accepted', 'Rejected'], required: true },
     
})

module.exports = mongoose.model('Submission' , submissionSchema)                                                        