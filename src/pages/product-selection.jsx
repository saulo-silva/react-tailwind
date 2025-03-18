import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';

const ProductSelection = () => {
  // Lista de produtos disponíveis
  const [products] = useState([
    { id: 1, name: 'Camiseta Básica', price: 49.90, category: 'Roupas', sku: 'CM001', description: 'Camiseta 100% algodão em diversas cores' },
    { id: 2, name: 'Calça Jeans', price: 129.90, category: 'Roupas', sku: 'CJ002', description: 'Calça jeans tradicional com 5 bolsos' },
    { id: 3, name: 'Tênis Casual', price: 199.90, category: 'Calçados', sku: 'TC003', description: 'Tênis leve e confortável para o dia a dia' },
    { id: 4, name: 'Moletom com Capuz', price: 159.90, category: 'Roupas', sku: 'MC004', description: 'Moletom quentinho para os dias frios' },
    { id: 5, name: 'Bermuda Tactel', price: 69.90, category: 'Roupas', sku: 'BT005', description: 'Bermuda leve e confortável para o verão' },
    { id: 6, name: 'Meia Kit 3 pares', price: 29.90, category: 'Acessórios', sku: 'MK006', description: 'Kit com 3 pares de meias em cores variadas' },
    { id: 7, name: 'Relógio Esportivo', price: 249.90, category: 'Acessórios', sku: 'RE007', description: 'Relógio resistente à água com cronômetro' },
    { id: 8, name: 'Boné Ajustável', price: 59.90, category: 'Acessórios', sku: 'BA008', description: 'Boné com ajuste traseiro para melhor conforto' },
    { id: 9, name: 'Chinelo de Dedo', price: 39.90, category: 'Calçados', sku: 'CD009', description: 'Chinelo confortável para uso casual' },
    { id: 10, name: 'Jaqueta Corta-vento', price: 179.90, category: 'Roupas', sku: 'JC010', description: 'Jaqueta leve para proteção contra vento e chuva leve' },
  ]);

  // Estado para produtos filtrados
  const [filteredProducts, setFilteredProducts] = useState(products);
  
  // Estado para o termo de busca
  const [searchTerm, setSearchTerm] = useState('');
  
  // Estado para a categoria selecionada
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  
  // Estado para a ordenação
  const [sortBy, setSortBy] = useState('name-asc');

  // Categorias únicas para o filtro
  const categories = ['Todos', ...new Set(products.map(product => product.category))];
  
  const navigate = useNavigate();

  // Carrinho de compras com persistência
  const [cart, setCart] = useState([]);
  
  // Controle do modal de carrinho
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Carregar carrinho do localStorage ao iniciar
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
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
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Filtrar produtos quando mudar os filtros
  useEffect(() => {
    let result = [...products];
    
    // Aplicar filtro de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(term) || 
        product.sku.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term)
      );
    }
    
    // Aplicar filtro de categoria
    if (selectedCategory !== 'Todos') {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Aplicar ordenação
    if (sortBy === 'name-asc') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'name-desc') {
      result.sort((a, b) => b.name.localeCompare(a.name));
    } else if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    }
    
    setFilteredProducts(result);
  }, [products, searchTerm, selectedCategory, sortBy]);

  // Obter a quantidade atual de um produto no carrinho
  const getQuantityInCart = (productId) => {
    const item = cart.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  };

  // Atualizar quantidade de um produto (adiciona ao carrinho automaticamente)
  const updateProductQuantity = (product, newQuantity) => {
    const quantity = parseInt(newQuantity) || 0;
    
    if (quantity <= 0) {
      // Se a quantidade for zero ou negativa, remover do carrinho
      setCart(prevCart => prevCart.filter(item => item.product.id !== product.id));
      return;
    }
    
    const existingItemIndex = cart.findIndex(item => item.product.id === product.id);
    
    if (existingItemIndex >= 0) {
      // Se o produto já existe, atualiza a quantidade
      setCart(prevCart => prevCart.map((item, index) => 
        index === existingItemIndex
          ? { ...item, quantity }
          : item
      ));
    } else {
      // Se não existe, adiciona novo item
      setCart(prevCart => [...prevCart, { product, quantity }]);
    }
  };

  // Incrementar quantidade
  const incrementQuantity = (product) => {
    const currentQty = getQuantityInCart(product.id);
    updateProductQuantity(product, currentQty + 1);
  };

  // Decrementar quantidade
  const decrementQuantity = (product) => {
    const currentQty = getQuantityInCart(product.id);
    updateProductQuantity(product, Math.max(0, currentQty - 1));
  };

  // Atualizar quantidade no carrinho
  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      // Se a quantidade for zero ou negativa, remover do carrinho
      setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
      return;
    }

    setCart(prevCart => prevCart.map(item =>
      item.product.id === productId
        ? { ...item, quantity: newQuantity }
        : item
    ));
  };

  // Remover item do carrinho
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
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
    <div className="py-6">
      <div className="mb-8">
        <h1 className="mb-6 text-3xl font-bold text-primary-700 dark:text-primary-400">Catálogo de Produtos</h1>
        
        {/* Filtros */}
        <Card>
          <CardHeader>
            <CardTitle>Filtrar Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <Input
                  id="search"
                  type="text"
                  label="Buscar produtos"
                  placeholder="Nome, código ou descrição..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Categoria
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Ordenar por
                </label>
                <select
                  className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="name-asc">Nome (A-Z)</option>
                  <option value="name-desc">Nome (Z-A)</option>
                  <option value="price-asc">Preço (Menor para Maior)</option>
                  <option value="price-desc">Preço (Maior para Menor)</option>
                </select>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Botões de carrinho */}
      <div className="mb-6 flex justify-end gap-3">
        <Button
          variant="primary"
          onClick={() => setIsCartOpen(true)}
          className="flex items-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
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
          Ver Carrinho ({totalItems})
        </Button>
        <Button
          variant="outline"
          onClick={() => navigate('/cart')}
          className="flex items-center gap-2"
        >
          Página do Carrinho
        </Button>
      </div>
      
      {/* Tabela de produtos */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-left text-sm font-semibold uppercase tracking-wider text-gray-500 dark:bg-gray-700 dark:text-gray-300">
                <tr>
                  <th className="whitespace-nowrap px-6 py-4">Código</th>
                  <th className="whitespace-nowrap px-6 py-4">Produto</th>
                  <th className="whitespace-nowrap px-6 py-4">Categoria</th>
                  <th className="whitespace-nowrap px-6 py-4">Preço</th>
                  <th className="whitespace-nowrap px-6 py-4">Quantidade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="p-6 text-center text-gray-500 dark:text-gray-400">
                      Nenhum produto encontrado para os filtros selecionados.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map(product => (
                    <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {product.sku}
                      </td>
                      <td className="px-6 py-4">
                        <div className="font-medium text-gray-900 dark:text-white">{product.name}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">{product.description}</div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {product.category}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex w-36 items-center rounded-md border border-gray-300 dark:border-gray-600">
                          <button
                            type="button"
                            className="px-3 py-2 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            onClick={() => decrementQuantity(product)}
                          >
                            −
                          </button>
                          <input
                            type="text"
                            value={getQuantityInCart(product.id)}
                            onChange={(e) => updateProductQuantity(product, e.target.value)}
                            className="w-full border-0 bg-transparent p-0 text-center focus:outline-none dark:text-white"
                            style={{ minWidth: '40px' }}
                          />
                          <button
                            type="button"
                            className="px-3 py-2 text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
                            onClick={() => incrementQuantity(product)}
                          >
                            +
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
      
      {/* Modal de carrinho */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <Card className="max-h-[80vh] w-full max-w-2xl overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>
                Carrinho de Compras
                {totalItems > 0 && <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">({totalItems} {totalItems === 1 ? 'item' : 'itens'})</span>}
              </CardTitle>
              <button
                onClick={() => setIsCartOpen(false)}
                className="rounded-full p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </CardHeader>

            <CardContent className="max-h-[50vh] overflow-auto">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="64" 
                    height="64" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="mb-4 text-gray-400"
                  >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  <p className="mb-2 text-center text-gray-500 dark:text-gray-400">Seu carrinho está vazio</p>
                  <Button
                    variant="outline"
                    onClick={() => setIsCartOpen(false)}
                    className="mt-4"
                  >
                    Continuar comprando
                  </Button>
                </div>
              ) : (
                <table className="w-full">
                  <thead className="border-b text-left text-sm font-semibold uppercase text-gray-500 dark:border-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="py-3 pr-4">Produto</th>
                      <th className="py-3 pr-4">Preço</th>
                      <th className="py-3 pr-4">Qtde</th>
                      <th className="py-3 pr-4">Total</th>
                      <th className="py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {cart.map(item => (
                      <tr key={item.product.id}>
                        <td className="py-4 pr-4">
                          <div className="font-medium">{item.product.name}</div>
                          <div className="text-sm text-gray-500 dark:text-gray-400">{item.product.sku}</div>
                        </td>
                        <td className="whitespace-nowrap py-4 pr-4">
                          R$ {item.product.price.toFixed(2).replace('.', ',')}
                        </td>
                        <td className="py-4 pr-4">
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
                        <td className="whitespace-nowrap py-4 pr-4 font-medium">
                          R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                        </td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
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
              )}
            </CardContent>

            {cart.length > 0 && (
              <div className="border-t p-4 dark:border-gray-700">
                {/* Resumo do carrinho */}
                <div className="mb-4 rounded-lg bg-gray-50 p-4 dark:bg-gray-800">
                  <div className="flex justify-between border-b pb-2 dark:border-gray-700">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
                    <span className="font-medium">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="mt-3 flex justify-between pt-2 text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-primary-600 dark:text-primary-400">
                      R$ {cartTotal.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="text-red-500 hover:bg-red-50 hover:text-red-600 dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300"
                  >
                    Limpar
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsCartOpen(false)}
                  >
                    Continuar
                  </Button>
                  <Button
                    variant="primary"
                    onClick={() => {
                      setIsCartOpen(false);
                      navigate('/checkout');
                    }}
                  >
                    Finalizar
                  </Button>
                </div>
              </div>
            )}
          </Card>
        </div>
      )}
    </div>
  );
};

export default ProductSelection;