import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

interface Review {
  _id: string;
  userId: string;
  rating: number;
  comment: string;
}

interface Book {
  _id?: string;
  id: number;
  title: string;
  author: string;
  genre: string;
  description: string;
  coverImage: string;
  rating: number;  // Rating of the book itself, 1-5
  url: string;
}

const BookDetails = () => {
  const { id } = useParams();
  const authorized = JSON.parse(localStorage.getItem('user') || '{}');
  const navigate = useNavigate();

  const [book, setBook] = useState<Book | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [review, setReview] = useState("");
  const [reviewRating, setReviewRating] = useState<number | null>(null);

  // Fetch book details
  useEffect(() => {
    if (!id) return;
    const fetchBookDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/books/${id}`);
        setBook(response.data);
      } catch (error) {
        console.error("Error fetching book details:", error);
      }
    };
    fetchBookDetails();
  }, [id]);

  // Fetch reviews for the book whenever book details change
  useEffect(() => {
    if (!book) return; // Fetch reviews only if book details are available
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/reviews?bookId=${book._id}`);
        setReviews(response.data);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };
    fetchReviews();
  }, [book]); // Dependency on book, will trigger whenever book is set

  // Handle review submission
  const handleReviewSubmit = async () => {
    if (!authorized) return navigate("/signup"); // Redirect if not logged in
    if (!review || reviewRating === null) {
      alert("Please provide a comment and rating.");
      return;
    }

    try {
      await axios.post(`http://localhost:3000/reviews/`, 
        {/* 
        // @ts-ignore */},{
        bookId: book._id,
        userId: authorized.user,
        rating: reviewRating,
        comment: review,
      });

      // Fetch reviews again after posting a new review
      
      {/* 
      // @ts-ignore */}
      const response = await axios.get(`http://localhost:3000/reviews?bookId=${book._id}`);
      setReviews(response.data);

      // Reset review form
      setReview("");
      setReviewRating(null);
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };
  return (
    <div className="p-6 max-w-2xl mx-auto">
      {book && (
        <>
          <img src={book.url} alt={book.title} className="w-full h-96 object-cover rounded-md" />
          <h2 className="text-3xl font-bold mt-4">{book.title}</h2>
          <p className="text-gray-600">By {book.author}</p>
          <p className="text-gray-500">Genre: {book.genre}</p>
          <div className="text-yellow-500">
            {"★".repeat(book.rating)}{"☆".repeat(5 - book.rating)}
          </div>
          
          {/* Description Section */}
          <div className="mt-4">
            <h3 className="text-xl font-semibold italic">Description</h3> {/* Italic title */}
            <p className="italic text-gray-700 mt-2">{book.description}</p> {/* Italic description */}
          </div>
  
          {/* Reviews Section */}
          <div className="mt-6">
            <h3 className="text-xl font-semibold">Reviews</h3>
            {reviews.length > 0 ? (
              <div className="mt-4 space-y-4">
                {reviews.map((review, index) => (
                  <div key={index} className="border-b pb-2">
                    <p className="font-semibold">User {review.userId}</p>
                    <p className="text-gray-600">{review.comment}</p>
                    <div className="text-yellow-500">
                      {"★".repeat(review.rating)}{"☆".repeat(5 - review.rating)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
  
          {/* Review Submission Form */}
          {authorized? (
            <div className="mt-6">
              <textarea
                className="border p-2 w-full rounded-md"
                placeholder="Write your review..."
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
              <input
                type="number"
                max={5}
                min={1}
                className="border p-2 mt-2"
                placeholder="Rating (1-5)"
                value={reviewRating || ""}
                onChange={(e) => setReviewRating(parseInt(e.target.value))}
              />
              <button
                onClick={handleReviewSubmit}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md"
              >
                Submit Review
              </button>
            </div>
          ) : (
            <p className="text-red-500 mt-4">Login to submit a review.</p>
          )}
        </>
      )}
    </div>
  );  
};

export default BookDetails;
