import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  coverImage: string;
  url: string;
}

const BookDetails = () => {
  const { id } = useParams(); // Get the book ID from URL
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;
    const numericId = parseInt(id); // Convert param to number
    axios
      .get(`http://localhost:3000/books/${numericId}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch book details.");
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-red-500 text-center mt-5">{error}</p>;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      {book && (
        <>
          <img src={book.url} alt={book.title} className="w-full h-96 object-cover rounded-md" />
          <h2 className="text-3xl font-bold mt-4">{book.title}</h2>
          <p className="text-gray-600">By {book.author}</p>
          <p className="text-gray-500">Genre: {book.genre}</p>   
          <div className="text-yellow-500">
                {"★".repeat(book.rating)}
                {"☆".repeat(5 - book.rating)}
              </div>
          <p className="mt-4">{book.description}</p>
        </>
      )}
    </div>
  );
};

export default BookDetails;
