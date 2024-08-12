import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-gray-800 shadow-lg py-6 sticky ">
        <div className="container mx-auto flex justify-between">
            <span className="font-serif text-3xl text-white text-center font-bold tracking-tight">
                <Link className="text-white " to="/">SHORINK</Link>
            </span>
            <span className="flex space-x-2">
                <Link className="font-serif font-bold text-center text-white tracking-tight hover:text-gray-300" to="/dashboard">Dashboard</Link>
                <Link className="font-serif font-bold text-center text-white tracking-tight hover:text-gray-300" to="/sign-in">Sign In</Link>
                <Link className="font-serif font-bold text-center text-white tracking-tight hover:text-gray-300" to="/sign-up">Sign Up</Link>
                <Link className="font-serif font-bold text-center text-white tracking-tight hover:text-gray-300" to="/sign-out">Sign Out</Link>
            </span>
        </div>
    </header>
  );
}

export default Header;