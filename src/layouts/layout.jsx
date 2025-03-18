import { Link, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
import ThemeToggle from "../components/ui/ThemeToggle";
import MobileMenu from "../components/ui/MobileMenu";

export default function Layout({ children }) {
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/stepper", label: "Stepper" },
    { to: "/focus", label: "Focus" },
    { to: "/contact", label: "Contact" },
    { to: "/church", label: "Church Form" },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-gray-900">
      <header className="flex w-full items-center justify-center bg-primary-600 p-4 text-white dark:bg-primary-800">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <svg
              className="size-10"
              viewBox="0 0 100 100"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="50" cy="50" r="50" fill="white" />
              <text x="50%" y="55%" textAnchor="middle" fill="#0284c7" fontSize="24" fontWeight="bold" dy=".3em">RT</text>
            </svg>
            <span className="text-xl font-bold">React Tailwind</span>
          </div>

          <nav className="hidden md:block">
            <ul className="flex space-x-6">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link to={link.to} className="transition-colors hover:text-primary-200">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <MobileMenu links={navLinks} />
          </div>
        </div>
      </header>

      <main role="main" className="flex-1 bg-gray-50 p-4 dark:bg-gray-800 dark:text-white">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>

      <footer className="w-full bg-primary-600 p-4 text-white dark:bg-primary-800">
        <div className="container mx-auto">
          <p className="text-center">© 2024 React Tailwind Project. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

Layout.propTypes = {
  children: PropTypes.node
};
