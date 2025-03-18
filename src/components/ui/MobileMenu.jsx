import { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MenuIcon = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={className}
    width="24"
    height="24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon = ({ className = '' }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    className={className}
    width="24"
    height="24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const MobileMenu = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={toggleMenu}
        className="rounded-md p-2 text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-white"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open main menu</span>
        <MenuIcon className="size-6" />
      </button>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-gray-900/50" onClick={closeMenu}>
          <div
            className="absolute right-0 top-0 h-full w-64 bg-primary-700 p-6 shadow-xl transition-transform"
            onClick={e => e.stopPropagation()}
          >
            <div className="mb-8 flex items-center justify-between">
              <span className="text-xl font-bold text-white">Menu</span>
              <button
                type="button"
                onClick={closeMenu}
                className="rounded-md p-2 text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-white"
              >
                <span className="sr-only">Close menu</span>
                <CloseIcon className="size-6" />
              </button>
            </div>
            <nav>
              <ul className="space-y-4">
                {links.map((link, index) => (
                  <li key={index}>
                    <Link
                      to={link.to}
                      className="block py-2 text-white transition-colors hover:text-primary-200"
                      onClick={closeMenu}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

MobileMenu.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      to: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MobileMenu;
