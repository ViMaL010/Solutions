import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

interface Book {
  Id: string;
  title: string;
  author: string;
  genre: string;
  rating: number;
  url: string;
}

const BooksList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [booksPerPage] = useState(8); // Books per page

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/books'); // Replace with your backend URL
        if (Array.isArray(response.data)) {
          setBooks(response.data); // Populate the books state
        } else {
          setError('Invalid response format');
        }
        setLoading(false);
      } catch (err: any) {
        setError(err.message || 'An error occurred while fetching books');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []); // Empty dependency array ensures this effect runs only once on mount

  const filteredBooks = books.filter((book) => {
    const matchesTitle = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesAuthor = book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = selectedGenre ? book.genre.toLowerCase() === selectedGenre.toLowerCase() : true;
    const matchesRating = selectedRating ? book.rating === parseInt(selectedRating) : true;
    return (matchesTitle || matchesAuthor) && matchesGenre && matchesRating;
  });

  // Get the books to display on the current page
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Change page
  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div>
      {/* Search and Filter Controls */}
      <div className="flex flex-wrap gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title or author"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
        />

        <select
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
        >
          <option value="">Select Genre</option>
          <option value="Classic Literature">Classic Literature</option>
          <option value="fiction">Fiction</option>
          <option value="non-fiction">Non-fiction</option>
          {/* Add other genres as needed */}
        </select>

        <select
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
          className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-auto"
        >
          <option value="">Select Rating</option>
          <option value={5}>5 Stars</option>
          <option value={4}>4 Stars</option>
          <option value={3}>3 Stars</option>
          <option value={2}>2 Stars</option>
          <option value={1}>1 Star</option>
        </select>
      </div>

      {/* Loading or Error Message */}
      {loading ? (
        <div className="text-center text-gray-600">Loading...</div>
      ) : error ? (
        <div className="text-center text-red-500">{error}</div>
      ) : (
        <>
          {/* Display Books */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentBooks.map((book) => (
              <Link
                key={book.Id}
                to={`/books/${book.Id}`} // Redirecting to the individual book page
                className="p-4 bg-white rounded-md shadow-md hover:shadow-lg hover:border-blue-500 transform hover:scale-105 transition-all"
              >
                <div className="text-center">
                  <img
                    src={book.url}
                    alt={book.title}
                    className="w-full h-100 object-contain rounded-md mb-4"
                  />
                  <h3 className="text-lg font-semibold text-gray-800">{book.title}</h3>
                  <p className="text-sm text-gray-500">{book.author}</p>
                  <p className="text-sm text-gray-500">{book.genre}</p>
                  <p className="text-sm text-yellow-500">{book.rating} ★</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center gap-2 mt-6 w-[60%] mx-auto">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-blue-500 text-white rounded-md disabled:bg-gray-100"
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage * booksPerPage >= filteredBooks.length}
              className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-100"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default BooksList;
