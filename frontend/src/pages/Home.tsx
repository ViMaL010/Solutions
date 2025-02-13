import { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState<any[]>([]); // Initialize as an empty array
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  // Fetch featured books
  const fetchFeaturedBooks = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/books", {
        params: {
          page: 1,
          limit: 10, // You can adjust the limit as needed
        },
      });
  
      // Log the response to inspect its structure
      console.log(response.data); // Check if the response contains an array of books
  
      // Now access the books array from the response
      const books = response.data;
  
      // Filter the books with rating 5
      const booksWithFiveStars = books.filter((book: any) => book.rating === 5);
  
      // Update the state with filtered books
      setFeaturedBooks(booksWithFiveStars);
    } catch (error) {
      setError("Error fetching featured books.");
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchFeaturedBooks();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Featured Books (Rating: 5)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featuredBooks.length > 0 ? (
          featuredBooks.map((book) => (
            <div key={book._id} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={book.url}
                alt={book.title}
                className="w-full h-60 object-cover rounded-lg"
              />
              <h3 className="text-xl font-semibold mt-2">{book.title}</h3>
              <p className="text-gray-700">{book.author}</p>
              <p className="text-sm text-gray-600">{book.genre}</p>
              <p className="mt-2 text-gray-800">{book.description}</p>
              <div className="mt-2 text-yellow-500">
                {"★".repeat(book.rating)}{"☆".repeat(5 - book.rating)}
              </div>
            </div>
          ))
        ) : (
          <div>No featured books with rating 5 found</div>
        )}
      </div>
    </div>
  );
};

export default Home;
