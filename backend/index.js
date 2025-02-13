const express = require('express');
const { BooksRouter } = require('./routes/bookRouter');
const { ReviewRouter } = require('./routes/reviewRouter');
const userRouter = require('./routes/userRouter');
const app = express(); 
const port = 3000;
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const authRouter = require('./middleware/authRouter');

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/bookstore").then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

app.use('/books', BooksRouter);
app.use('/reviews', ReviewRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(3000);