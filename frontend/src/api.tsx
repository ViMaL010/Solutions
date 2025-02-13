import axios from "axios";

const API_URL = "http://localhost:3000"; // Change to your backend URL

export const fetchBooks = async () => {
  try {
    const response = await axios.get(`${API_URL}/books`);
    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export const fetchBookById = async (bookId: string) => {
  try {
    const response = await axios.get(`${API_URL}/books/${bookId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching book:", error);
    return null;
  }
};
