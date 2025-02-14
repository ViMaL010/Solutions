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

mongoose.set('debug', true);
mongoose.connect("mongodb+srv://vimalsde:qpuOFlUbnkbwogja@cluster0.svuug.mongodb.net/users")
  .then(() => console.log("MongoDB Connected"))

app.use('/books', BooksRouter);
app.use('/reviews', ReviewRouter);
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(3000);