import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetail";
import BooksList  from "./pages/BooksList";
import UserProfilePage from "./pages/UserProfile";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/Signup";


function App() {
  return (
    <Router>
      <Header />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BooksList/>} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/users/:id" element={<UserProfilePage/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/signup" element={<SignupPage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
