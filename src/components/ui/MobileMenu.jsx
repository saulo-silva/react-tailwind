import { useState, useEffect } from 'react';
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
  const [cartItemCount, setCartItemCount] = useState(0);

  // Atualizar contador de itens do carrinho
  useEffect(() => {
    const updateCartCount = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart)) {
            const count = parsedCart.reduce((total, item) => total + item.quantity, 0);
            setCartItemCount(count);
          }
        } else {
          setCartItemCount(0);
        }
      } catch (e) {
        console.error("Erro ao buscar carrinho:", e);
        setCartItemCount(0);
      }
    };

    // Atualizar contagem inicial
    updateCartCount();

    // Monitorar mudanças no localStorage
    const handleStorageChange = () => {
      updateCartCount();
    };

    window.addEventListener('storage', handleStorageChange);

    // Verificar a cada segundo para mudanças no mesmo navegador
    const interval = setInterval(updateCartCount, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

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
                      className="flex items-center gap-2 py-2 text-white transition-colors hover:text-primary-200"
                      onClick={closeMenu}
                    >
                      {link.label}
                      {link.to === "/cart" && cartItemCount > 0 && (
                        <span className="inline-flex size-5 items-center justify-center rounded-full bg-secondary-500 text-xs font-bold">
                          {cartItemCount}
                        </span>
                      )}
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
