const express = require('express');
const Book = require('../models/book');
const { authenticateToken, checkAdmin } = require('../middleware/auth');
const BooksRouter = express.Router();

//get all books
BooksRouter.get('/', async (req, res) => {  
    const { page = 1, limit = 10 } = req.query;
    try {
    const books = await Book.find()
        .limit(limit * 1)
        .skip((page - 1) * limit);
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
    const { title, author, genre, description, coverImage, url , rating} = req.body;
    try {
      const book = new Book({ title, author, genre, description, coverImage, url , rating});
      await book.save();
      res.status(201).json(book.Id);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
});

module.exports = { BooksRouter };
