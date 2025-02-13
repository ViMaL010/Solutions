import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  coverImage: string;
  url: string;
}

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios.get("http://localhost:3000/books")
      .then((response) => {
        setBooks(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch books.");
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-5">{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-center mb-6">Books</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book) => (
          <div key={book.id} className="bg-white shadow-lg rounded-lg p-4">
            <img src={book.url} alt={book.title} className="w-full h-64 object-cover rounded-md" />
            <h3 className="text-lg font-semibold mt-3">{book.title}</h3>
            <p className="text-gray-600">By {book.author}</p>
            <p className="text-gray-700 text-sm mt-2">{book.description.substring(0, 100)}...</p>
            <Link to={`/books/${book.Id}`} className="block text-blue-600 mt-3 hover:underline">
            Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Books;
