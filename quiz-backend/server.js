const dotenv=require("dotenv").config();
const cookieParser = require('cookie-parser');

const express=require ("express");
const mongoose=require ("mongoose");
const cors=require ("cors");

const app=express();
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser())
app.use(express.json());

app.use('/api/auth', require('./routes/user')); 
app.use('/api', require('./routes/quizRoutes'));
app.use('/api', require('./routes/uploadRoutes'));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () => console.log(`Server running on ${process.env.PORT}`));