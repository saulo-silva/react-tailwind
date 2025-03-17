import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const [orderNumber, setOrderNumber] = useState('');
  const [orderDetails, setOrderDetails] = useState(null);
  
  useEffect(() => {
    // Gerar um número de pedido aleatório para demonstração
    const randomOrderNumber = Math.floor(100000000 + Math.random() * 900000000).toString();
    setOrderNumber(randomOrderNumber);
    
    // Tentar recuperar detalhes do pedido do sessionStorage (seria colocado lá pelo checkout)
    const savedOrderDetails = sessionStorage.getItem('orderDetails');
    if (savedOrderDetails) {
      try {
        setOrderDetails(JSON.parse(savedOrderDetails));
      } catch (e) {
        console.error("Erro ao recuperar detalhes do pedido:", e);
      }
    }
    
    // Limpar carrinho
    localStorage.removeItem('cart');
    
    // Limpar detalhes do pedido após exibir
    return () => {
      sessionStorage.removeItem('orderDetails');
    };
  }, []);
  
  // Obter data estimada de entrega (7 dias úteis a partir de hoje)
  const getEstimatedDeliveryDate = () => {
    const date = new Date();
    let businessDays = 0;
    while (businessDays < 7) {
      date.setDate(date.getDate() + 1);
      const dayOfWeek = date.getDay();
      if (dayOfWeek !== 0 && dayOfWeek !== 6) { // Não contar sábados e domingos
        businessDays++;
      }
    }
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 py-12">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <div className="mb-6 text-center">
          <div className="mx-auto mb-4 flex size-24 items-center justify-center rounded-full bg-green-100 text-green-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
              <polyline points="22 4 12 14.01 9 11.01"></polyline>
            </svg>
          </div>
          <h1 className="mb-2 text-3xl font-bold text-green-600">Pedido Realizado com Sucesso!</h1>
          <p className="text-lg text-gray-600">Obrigado por comprar conosco.</p>
        </div>
        
        <div className="mb-6 rounded-lg bg-gray-50 p-4">
          <div className="mb-2 flex justify-between">
            <span className="font-medium text-gray-600">Número do Pedido:</span>
            <span className="font-bold">{orderNumber}</span>
          </div>
          <div className="mb-2 flex justify-between">
            <span className="font-medium text-gray-600">Data do Pedido:</span>
            <span>{new Date().toLocaleDateString('pt-BR')}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-600">Entrega Estimada:</span>
            <span>{getEstimatedDeliveryDate()}</span>
          </div>
        </div>
        
        {orderDetails && orderDetails.paymentMethod === 'pix' && (
          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 text-center">
            <h3 className="mb-3 font-medium text-gray-700">QR Code do PIX</h3>
            <div className="mx-auto mb-3 size-48 bg-gray-200 p-2">
              {/* Placeholder para QR Code */}
              <div className="flex size-full items-center justify-center border-2 border-dashed border-gray-400">
                <span className="text-sm text-gray-500">QR Code PIX</span>
              </div>
            </div>
            <p className="mb-2 text-sm text-gray-600">Escaneie o QR Code acima para realizar o pagamento</p>
            <p className="mb-1 text-sm font-semibold">Chave PIX:</p>
            <p className="mb-3 select-all rounded-md bg-gray-100 p-2 text-sm">abc123def456ghi789jkl012</p>
            <p className="text-xs text-red-600">O pagamento deve ser realizado em até 30 minutos</p>
          </div>
        )}
        
        {orderDetails && orderDetails.paymentMethod === 'boleto' && (
          <div className="mb-6 rounded-lg border border-gray-200 bg-white p-4 text-center">
            <h3 className="mb-3 font-medium text-gray-700">Boleto Bancário</h3>
            <p className="mb-3 text-sm text-gray-600">
              Seu boleto foi gerado e enviado para seu e-mail. Você também pode acessá-lo pelo botão abaixo:
            </p>
            <button className="mb-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
              Visualizar Boleto
            </button>
            <p className="text-xs text-red-600">O boleto vence em 1 dia útil</p>
          </div>
        )}
        
        <div className="mb-8 border-t border-gray-200 pt-6">
          <h2 className="mb-4 text-xl font-bold">Instruções:</h2>
          <ul className="list-inside list-disc space-y-2 text-gray-600">
            <li>Um e-mail com os detalhes do seu pedido foi enviado para você.</li>
            <li>Você pode acompanhar o status do seu pedido na área "Meus Pedidos".</li>
            <li>Em caso de dúvidas, entre em contato com nosso suporte.</li>
          </ul>
        </div>
        
        <div className="flex flex-col space-y-3 sm:flex-row sm:space-x-3 sm:space-y-0">
          <button
            onClick={() => navigate('/products')}
            className="flex-1 rounded-lg bg-purple-700 px-6 py-3 text-white hover:bg-purple-800"
          >
            Continuar Comprando
          </button>
          <button
            onClick={() => navigate('/orders')}
            className="flex-1 rounded-lg border border-purple-700 px-6 py-3 text-purple-700 hover:bg-purple-50"
          >
            Meus Pedidos
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccess;