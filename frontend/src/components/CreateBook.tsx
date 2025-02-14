import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const CreateBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    {/* 
    // @ts-ignore */}
    const token = JSON.parse(localStorage.getItem('user'))

    try {
      await axios.post("http://localhost:3000/books", {
        title,
        author,
        genre,
        description,
        url : "https://"+coverImage,
      }   
      , {
        headers: {
          Authorization: `Bearer ${token.token}`,  // Attach token in Authorization header
        },
      });

      // Redirect to books page after adding a book
      navigate("/books");
    } catch (error) {
      setErrorMessage("Failed to add book. Please try again.");
    }
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add a New Book</h2>

      {errorMessage && <p className="text-red-500">{errorMessage}</p>}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Book Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-4 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          className="p-4 border border-gray-300 rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="p-4 border border-gray-300 rounded-md"
          required
        />
        <textarea
          placeholder="Book Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="p-4 border border-gray-300 rounded-md"
          rows={4}
          required
        />
        <input
          type="text"
          placeholder="Cover Image URL"
          value={coverImage}
          onChange={(e) => setCoverImage(e.target.value)}
          className="p-4 border border-gray-300 rounded-md"
          required
        />
        <button type="submit" className="px-4 py-2 bg-green-500 text-white rounded-md">
          Add Book
        </button>
      </form>
    </div>
  );
};

export default CreateBook;
