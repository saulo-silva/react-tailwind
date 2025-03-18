import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Carregar carrinho do localStorage apenas uma vez ao iniciar
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart)) {
            setCart(parsedCart);
          }
        }
      } catch (e) {
        console.error("Erro ao carregar carrinho:", e);
      } finally {
        setIsLoading(false);
      }
    };

    loadCart();
  }, []);

  // Apenas atualizar o localStorage quando houver mudanças intencionais no carrinho
  // e não no carregamento inicial
  const updateLocalStorage = (updatedCart) => {
    try {
      localStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (e) {
      console.error("Erro ao salvar carrinho:", e);
    }
  };

  // Atualizar quantidade no carrinho
  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      // Se a quantidade for zero ou negativa, remover do carrinho
      const updatedCart = cart.filter(item => item.product.id !== productId);
      setCart(updatedCart);
      updateLocalStorage(updatedCart);
      return;
    }

    const updatedCart = cart.map(item =>
      item.product.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    );
    
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
  };

  // Remover item do carrinho
  const removeFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.product.id !== productId);
    setCart(updatedCart);
    updateLocalStorage(updatedCart);
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

  if (isLoading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <div className="mb-4 text-xl font-medium text-primary-600 dark:text-primary-400">Carregando...</div>
          <div className="mx-auto size-8 animate-spin rounded-full border-4 border-primary-200 border-t-primary-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-primary-700 dark:text-primary-400">Carrinho de Compras</h1>
        <div className="flex gap-4">
          <Button 
            variant="outline" 
            onClick={() => navigate('/products')}
          >
            Continuar Comprando
          </Button>
          {cart.length > 0 && (
            <Button 
              variant="primary" 
              onClick={() => navigate('/checkout')}
            >
              Finalizar Compra
            </Button>
          )}
        </div>
      </div>

      {cart.length === 0 ? (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="80" 
              height="80" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              className="mb-6 text-gray-400"
            >
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <h2 className="mb-2 text-2xl font-semibold">Seu carrinho está vazio</h2>
            <p className="mb-8 text-center text-gray-500 dark:text-gray-400">
              Você ainda não adicionou produtos ao seu carrinho.
            </p>
            <Button
              variant="primary"
              onClick={() => navigate('/products')}
              className="px-8"
            >
              Ver Produtos
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          <Card className="mb-6">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left text-sm font-semibold uppercase tracking-wider text-gray-500 dark:bg-gray-700 dark:text-gray-300">
                    <tr>
                      <th className="px-6 py-4">Produto</th>
                      <th className="px-6 py-4">Preço Unitário</th>
                      <th className="px-6 py-4">Quantidade</th>
                      <th className="px-6 py-4">Subtotal</th>
                      <th className="px-6 py-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {cart.map(item => (
                      <tr key={item.product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white">{item.product.name}</div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Código: {item.product.sku}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium">
                          R$ {item.product.price.toFixed(2).replace('.', ',')}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex w-32 items-center rounded-md border border-gray-300 dark:border-gray-600">
                            <button
                              type="button"
                              className="px-2 py-1 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                              onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                            >
                              −
                            </button>
                            <input
                              type="text"
                              value={item.quantity}
                              onChange={(e) => updateCartQuantity(item.product.id, parseInt(e.target.value) || 0)}
                              className="w-full border-0 bg-transparent p-0 text-center focus:outline-none dark:text-white"
                              style={{ minWidth: '30px' }}
                            />
                            <button
                              type="button"
                              className="px-2 py-1 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                              onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-6 py-4 font-medium">
                          R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                            title="Remover item"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M3 6h18"></path>
                              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                            </svg>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between border-b pb-4 dark:border-gray-700">
                    <span>Quantidade de itens:</span>
                    <span className="font-medium">{totalItems} {totalItems === 1 ? 'item' : 'itens'}</span>
                  </div>
                  <div className="flex justify-between border-b pb-4 dark:border-gray-700">
                    <span>Subtotal:</span>
                    <span className="font-medium">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between border-b pb-4 dark:border-gray-700">
                    <span>Frete:</span>
                    <span className="font-medium">Grátis</span>
                  </div>
                  <div className="flex justify-between pt-2 text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary-600 dark:text-primary-400">
                      R$ {cartTotal.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Ações</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => navigate('/products')}
                  >
                    Continuar Comprando
                  </Button>
                  <Button
                    variant="primary"
                    className="w-full"
                    onClick={() => navigate('/checkout')}
                  >
                    Finalizar Compra
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full text-red-500 hover:bg-red-50 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                    onClick={clearCart}
                  >
                    Limpar Carrinho
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
