import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || 'null');
  const id = user?.user;
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-slate-800 p-4 shadow-lg relative">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          {/* Left side - Logo */}
          <Link to={"/"}>
            <h1 className="text-white text-2xl font-extrabold">📚 Book Review</h1>
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={10} /> : <Menu size={10} />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-white text-lg font-semibold hover:underline">
              Home
            </Link>
            <Link to="/books" className="text-white text-lg font-semibold hover:underline">
              Books
            </Link>
            
            {user?.isAdmin && (
              <Link to="/add-book" className="text-green-400 text-lg font-semibold hover:underline">
                Add Book
              </Link>
            )}

            {!user ? (
              <>
                <Link to="/signup" className="text-white text-lg font-semibold hover:underline">
                  Sign Up
                </Link>
                <Link to="/login" className="text-white text-lg font-semibold hover:underline">
                  Login
                </Link>
              </>
            ) : (
              <>
                <Link to={`/users/${id}`} className="text-white text-lg font-semibold hover:underline">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-500 font-semibold hover:underline"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-slate-800 p-4 shadow-lg z-50">
            <div className="flex flex-col space-y-2">
              <Link 
                to="/" 
                className="text-white text-lg font-semibold hover:underline"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/books" 
                className="text-white text-lg font-semibold hover:underline"
                onClick={() => setIsMenuOpen(false)}
              >
                Books
              </Link>
              
              {user?.isAdmin && (
                <Link 
                  to="/add-book" 
                  className="text-green-400 text-lg font-semibold hover:underline"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Add Book
                </Link>
              )}

              {!user ? (
                <>
                  <Link 
                    to="/signup" 
                    className="text-white text-lg font-semibold hover:underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Sign Up
                  </Link>
                  <Link 
                    to="/login" 
                    className="text-white text-lg font-semibold hover:underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Login
                  </Link>
                </>
              ) : (
                <>
                  <Link 
                    to={`/users/${id}`} 
                    className="text-white text-lg font-semibold hover:underline"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-500 font-semibold hover:underline text-left"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Header;