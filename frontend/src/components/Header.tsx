import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="bg-slate-800 p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-extrabold">📚 Book Review</h1>
        {/* Flex container with spacing */}
        <div className="flex space-x-6"> {/* space-x-6 creates a gap between links */}
          <Link to="/" className="text-white text-lg font-semibold hover:underline">Home</Link>
          <Link to="/books" className="text-white text-lg font-semibold hover:underline">Books</Link>
        </div>
      </div>
    </nav>
  );
};

export default Header;
