const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoutes = require("./routes/auth")
const problemsRouter = require('./routes/problems')
const problemEvalRouter = require('./routes/codeEval')
const submissionRoutes = require('./routes/submission')
const createContestRoutes = require('./routes/createContestProb')
const fetchContestRoutes = require('./routes/fetchContest')
const joinContestRoutes = require('./routes/joinContest')
const fetchCONProblems = require('./routes/fetchConProb')
const contestEvalRouter = require('./routes/codeEvalforCON')
const cors = require('cors')
const { protect } = require("./middleware/authMiddleware") 
dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())
mongoose.connect (process.env.MONGO_URI,{
    connectTimeoutMS: 30000,
    socketTimeoutMS: 30000,
})
.then(()=>{
    console.log("CONNECTION SUCCESSFUL")
})
.catch((err)=>{
    console.log("could not connect",err)
})

app.use('/api/auth',authRoutes)
app.use('/api/problems',problemsRouter)
app.use('/api/problems',problemEvalRouter)
app.use('/api/handlesubmissions',submissionRoutes)
app.use('/api/contest',createContestRoutes)
app.use('/api/displayContest',fetchContestRoutes)
app.use('/api/joinContest',joinContestRoutes)
app.use('/api/contests',fetchCONProblems)
app.use('/api/con',contestEvalRouter)
app.get('/api/home', protect, (req, res) => {
    res.json({ message: `Welcome, ${req.user.username}` }); 
  });


app.get('/',(req,res)=>{
    res.send('server is running')
})

const PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`server is running`)
})
