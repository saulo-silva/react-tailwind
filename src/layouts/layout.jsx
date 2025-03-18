import { Link, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import ThemeToggle from "../components/ui/ThemeToggle";
import MobileMenu from "../components/ui/MobileMenu";

export default function Layout() {
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

    // Verificar a cada segundo (fallback para mudanças no mesmo navegador)
    const interval = setInterval(updateCartCount, 1000);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Produtos" },
    { to: "/cart", label: "Carrinho" },
    { to: "/contact", label: "Contato" },
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
              {navLinks.slice(0, -2).map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.to}
                    className="transition-colors hover:text-primary-200"
                  >
                    {link.label}
                    {link.to === "/cart" && cartItemCount > 0 && (
                      <span className="ml-1 inline-flex size-5 items-center justify-center rounded-full bg-secondary-500 text-xs font-bold">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              to="/cart"
              className="relative mr-2 flex size-10 items-center justify-center rounded-full hover:bg-primary-700 md:hidden"
              aria-label="Carrinho"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartItemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-secondary-500 text-xs font-bold">
                  {cartItemCount}
                </span>
              )}
            </Link>
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
