import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import BookDetails from "./pages/BookDetail";
import BooksList from "./pages/BooksList";
import UserProfilePage from "./pages/UserProfile";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/Signup";
import AdminPage from "./pages/AdminPage"; // Admin Page
import Header from "./components/Header"; // Context for Auth
import { AuthProvider, useAuth } from "./Auth/AuthContext";
import { AdminRoute, ProtectedRoute } from "./Routes/ProtectedRoutes";
import CreateBook from "./components/CreateBook";

function App() {
  return (
      <Router>
        <AuthProvider>
        <AuthWrapper />
        </AuthProvider>
      </Router>
  );
}

// Wrap the entire app with Authentication logic
function AuthWrapper() { // Get authentication status from context

  return (
    <>
      <Header />
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<BooksList />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/users/:id" element={<UserProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/add-book" element={<CreateBook />} />
          <Route path="/admin" element={<AdminRoute><AdminPage /></AdminRoute>} />
        </Routes>
      </div>
    </>
  );
}

export default App;
