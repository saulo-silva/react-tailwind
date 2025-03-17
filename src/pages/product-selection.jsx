import { useState, useEffect } from 'react';
import { ProductCard } from "../components/product-card";
import { useNavigate } from 'react-router-dom';

const ProductSelection = () => {
  // Lista de produtos disponíveis
  const [products] = useState([
    { id: 1, name: 'Camiseta Básica', price: 49.90, image: 'https://placehold.co/120x150/EEE/31343C', description: 'Camiseta 100% algodão em diversas cores' },
    { id: 2, name: 'Calça Jeans', price: 129.90, image: 'https://placehold.co/120x150/EEE/31343C', description: 'Calça jeans tradicional com 5 bolsos' },
    { id: 3, name: 'Tênis Casual', price: 199.90, image: 'https://placehold.co/120x150/EEE/31343C', description: 'Tênis leve e confortável para o dia a dia' },
    { id: 4, name: 'Moletom com Capuz', price: 159.90, image: 'https://placehold.co/120x150/EEE/31343C', description: 'Moletom quentinho para os dias frios' },
    { id: 5, name: 'Bermuda Tactel', price: 69.90, image: 'https://placehold.co/120x150/EEE/31343C', description: 'Bermuda leve e confortável para o verão' },
    { id: 6, name: 'Meia Kit 3 pares', price: 29.90, image: 'https://placehold.co/120x150/EEE/31343C', description: 'Kit com 3 pares de meias em cores variadas' },
  ]);
  const navigate = useNavigate();

  // Carrinho de compras com persistência
  const [cart, setCart] = useState([]);
  
  // Controle do modal de carrinho
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  // Mini notificação ao adicionar ao carrinho
  const [notification, setNotification] = useState({ show: false, product: null });

  // Carregar carrinho do localStorage ao iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          console.log("Carrinho carregado do localStorage:", parsedCart);
          setCart(parsedCart);
        }
      } catch (e) {
        console.error("Erro ao carregar carrinho:", e);
        localStorage.removeItem('cart'); // Limpar carrinho inválido
      }
    }
  }, []);

  // Salvar carrinho no localStorage sempre que for atualizado
  useEffect(() => {
    try {
      const serializedCart = JSON.stringify(cart);
      localStorage.setItem('cart', serializedCart);
      console.log("Carrinho salvo no localStorage:", cart);
    } catch (e) {
      console.error("Erro ao salvar carrinho:", e);
    }
  }, [cart]);

  // Função para mostrar a notificação
  const showNotification = (product) => {
    setNotification({ show: true, product });
    
    // Esconder a notificação após 3 segundos
    setTimeout(() => {
      setNotification({ show: false, product: null });
    }, 3000);
  };

  // Função para adicionar produto ao carrinho
  const addToCart = (product, quantity) => {
    // Crie uma cópia do produto para garantir que não haja referências a objetos React
    const productCopy = { ...product };
    
    const existingItem = cart.find(item => item.product.id === productCopy.id);

    let newCart;
    if (existingItem) {
      // Se o produto já existe, atualiza a quantidade
      newCart = cart.map(item =>
        item.product.id === productCopy.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      // Se não existe, adiciona novo item
      newCart = [...cart, { product: productCopy, quantity }];
    }
    
    // Atualiza o estado e salva no localStorage imediatamente
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));

    // Mostra a notificação
    showNotification(productCopy);
  };

  // Função para remover item do carrinho
  const removeFromCart = (productId) => {
    const newCart = cart.filter(item => item.product.id !== productId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // Função para atualizar quantidade no carrinho
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    const newCart = cart.map(item =>
      item.product.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    );
    
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  // Limpar todo o carrinho
  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  // Calcular total do carrinho
  const cartTotal = cart.reduce((total, item) =>
    total + (item.product.price * item.quantity), 0
  );

  // Calcular quantidade total de itens
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="min-h-screen p-4">
      {/* Cabeçalho */}
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-purple-800">Loja Virtual</h1>
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center rounded-lg bg-white px-4 py-2 shadow-md transition hover:bg-gray-50"
        >
          <div className="relative mr-2">
            <span className="text-xl">🛒</span>
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </div>
          <span>Carrinho</span>
        </button>
      </header>

      {/* Grid de produtos */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>

      {/* Notificação de produto adicionado */}
      {notification.show && notification.product && (
        <div className="animate-fade-in fixed bottom-4 right-4 z-50 flex w-72 items-center rounded-lg bg-white p-4 shadow-lg">
          <img 
            src={notification.product.image} 
            alt={notification.product.name} 
            className="mr-3 size-14 rounded object-cover"
          />
          <div className="flex-1">
            <p className="text-sm font-semibold text-green-600">Produto adicionado!</p>
            <p className="text-sm">{notification.product.name}</p>
          </div>
          <button 
            onClick={() => setIsCartOpen(true)}
            className="ml-2 rounded-lg bg-purple-600 px-3 py-1 text-xs text-white hover:bg-purple-700"
          >
            Ver carrinho
          </button>
        </div>
      )}

      {/* Modal de carrinho */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="flex max-h-[80vh] w-full max-w-2xl flex-col overflow-hidden rounded-lg bg-white shadow-2xl">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-xl font-bold text-purple-800">
                Carrinho de Compras
                {totalItems > 0 && <span className="ml-2 text-sm text-gray-600">({totalItems} {totalItems === 1 ? 'item' : 'itens'})</span>}
              </h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <div className="mb-4 text-6xl">🛒</div>
                  <p className="mb-2 text-center text-gray-500">Seu carrinho está vazio</p>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4 rounded-lg bg-purple-700 px-6 py-2 text-white transition hover:bg-purple-800"
                  >
                    Continuar comprando
                  </button>
                </div>
              ) : (
                <ul className="divide-y">
                  {cart.map(item => (
                    <li key={item.product.id} className="flex py-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="size-24 rounded-md object-cover"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{item.product.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-sm text-red-600 transition hover:text-red-800"
                            aria-label="Remover item"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                        <p className="text-gray-600">
                          R$ {item.product.price.toFixed(2).replace('.', ',')}
                        </p>
                        <div className="mt-2 flex items-center">
                          <div className="flex items-center rounded-lg border border-gray-300">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              className="rounded-l-lg px-3 py-1 hover:bg-gray-100"
                              aria-label="Diminuir quantidade"
                            >
                              −
                            </button>
                            <span className="w-10 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              className="rounded-r-lg px-3 py-1 hover:bg-gray-100"
                              aria-label="Aumentar quantidade"
                            >
                              +
                            </button>
                          </div>
                          <span className="ml-auto font-semibold">
                            R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t p-4">
                {/* Resumo do carrinho */}
                <div className="mb-4 rounded-lg bg-gray-50 p-4">
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Subtotal:</span>
                    <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="mb-2 flex justify-between text-sm">
                    <span>Frete:</span>
                    <span>Grátis</span>
                  </div>
                  <div className="mt-3 flex justify-between border-t border-gray-200 pt-2 text-lg font-bold">
                    <span>Total:</span>
                    <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                </div>
                
                {/* Botões de ação */}
                <div className="flex space-x-4">
                  <button
                    onClick={clearCart}
                    className="rounded border border-red-500 px-4 py-2 text-red-500 transition hover:bg-red-50"
                  >
                    Limpar Carrinho
                  </button>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="flex-1 rounded-lg border border-gray-300 py-2 transition hover:bg-gray-50"
                  >
                    Continuar Comprando
                  </button>
                  <button
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/checkout');
                    }}
                    className="flex-1 rounded-lg bg-purple-700 py-2 text-white transition hover:bg-purple-800"
                  >
                    Finalizar Compra
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSelection;