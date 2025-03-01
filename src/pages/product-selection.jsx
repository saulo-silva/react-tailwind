import { useState } from 'react';
import { ProductCard } from "../components/product-card";

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

  // Carrinho de compras
  const [cart, setCart] = useState([]);

  // Controle do modal de carrinho
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Função para adicionar produto ao carrinho
  const addToCart = (product, quantity) => {
    const existingItem = cart.find(item => item.product.id === product.id);

    if (existingItem) {
      // Se o produto já existe, atualiza a quantidade
      setCart(
        cart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      );
    } else {
      // Se não existe, adiciona novo item
      setCart([...cart, { product, quantity }]);
    }

    // Abre o carrinho após adicionar
    // setIsCartOpen(true);
  };

  // Função para remover item do carrinho
  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.product.id !== productId));
  };

  // Função para atualizar quantidade no carrinho
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }

    setCart(
      cart.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Calcular total do carrinho
  const cartTotal = cart.reduce((total, item) =>
    total + (item.product.price * item.quantity), 0
  );

  return (
    <div className="min-h-screen p-4">
      {/* Cabeçalho */}
      <header className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold text-purple-800">Loja Virtual</h1>
        <button
          onClick={() => setIsCartOpen(true)}
          className="flex items-center rounded-lg bg-white px-4 py-2 shadow hover:bg-gray-50"
        >
          <span className="mr-2">🛒</span>
          <span>Carrinho ({cart.reduce((total, item) => total + item.quantity, 0)})</span>
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

      {/* Modal de carrinho */}
      {isCartOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4">
          <div className="flex max-h-[80vh] w-full max-w-2xl flex-col rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-xl font-bold">Carrinho de Compras</h2>
              <button
                onClick={() => setIsCartOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-auto p-4">
              {cart.length === 0 ? (
                <p className="py-8 text-center text-gray-500">Seu carrinho está vazio</p>
              ) : (
                <ul className="divide-y">
                  {cart.map(item => (
                    <li key={item.product.id} className="flex py-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="size-20 rounded object-cover"
                      />
                      <div className="ml-4 flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">{item.product.name}</h3>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-sm text-red-600 hover:text-red-800"
                          >
                            Remover
                          </button>
                        </div>
                        <p className="text-gray-600">
                          R$ {item.product.price.toFixed(2).replace('.', ',')}
                        </p>
                        <div className="mt-2 flex items-center">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="rounded-l bg-gray-100 px-2 py-1 hover:bg-gray-200"
                          >
                            -
                          </button>
                          <span className="bg-gray-50 px-4 py-1">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="rounded-r bg-gray-100 px-2 py-1 hover:bg-gray-200"
                          >
                            +
                          </button>
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

            <div className="border-t p-4">
              <div className="mb-4 flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="flex-1 rounded border border-gray-300 py-2 hover:bg-gray-50"
                >
                  Continuar Comprando
                </button>
                <button
                  onClick={() => alert('Finalizar compra: R$ ' + cartTotal.toFixed(2))}
                  className="flex-1 rounded bg-purple-700 py-2 text-white hover:bg-purple-800"
                  disabled={cart.length === 0}
                >
                  Finalizar Compra
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductSelection;
