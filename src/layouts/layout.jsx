import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function Layout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="flex w-full items-center justify-center bg-purple-800 p-4 text-white">
        <div className="container mx-auto flex items-center justify-between">
          <svg
            className="size-10"
            viewBox="0 0 100 100"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50" cy="50" r="50" fill="white" />
            <text x="50%" y="55%" textAnchor="middle" fill="purple" fontSize="24" fontWeight="bold" dy=".3em">MP</text>
          </svg>

          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="transition-colors hover:text-purple-200">Home</Link></li>
              <li><Link to="/products" className="transition-colors hover:text-purple-200">Products</Link></li>
              <li><Link to="/stepper" className="transition-colors hover:text-purple-200">Stepper</Link></li>
              <li><Link to="/focus" className="transition-colors hover:text-purple-200">Focus</Link></li>
              <li><Link to="/church" className="transition-colors hover:text-purple-200">Church Form</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main role="main" className="flex-1 bg-gray-50 p-4">
        <div className="container mx-auto">
          {children}
        </div>
      </main>

      <footer className="w-full bg-purple-800 p-4 text-white">
        <div className="container mx-auto">
          <p className="text-center">© 2024 Meu Projeto. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node.isRequired
};
