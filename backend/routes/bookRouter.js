const express = require('express');
const Book = require('../models/book');
const { authenticateToken, checkAdmin } = require('../middleware/auth');
const BooksRouter = express.Router();

//get all books
BooksRouter.get('/', async (req, res) => {  
    try {
    const books = await Book.find()
    res.json(books);
    } catch (err) {
    res.status(500).json(
        { error: err.message }
    );
    }
});

//get book by Id
BooksRouter.get('/:Id', async (req,res) => {
    try {
        const book = await Book.findOne({ Id: req.params.Id });
        res.json(book);
      } catch (err) {
        res.status(404).json({ error: "Book not found" });
      }
})

//add a book
BooksRouter.post('/', authenticateToken ,async (req, res) => {
    const { title, author, genre, description, url , rating} = req.body;
    try {
      const book = new Book({ title, author, genre, description, url , rating});
      await book.save();
      res.status(201).json({bookId: book._id});
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

module.exports = { BooksRouter };
