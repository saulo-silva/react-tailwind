import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import DadosPessoais from '../components/checkout/DadosPessoais';
import Endereco from '../components/checkout/Endereco';
import Pagamento from '../components/checkout/Pagamento';
import Revisao from '../components/checkout/Revisao';
import { checkoutSchema } from '../schemas/checkout';

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const methods = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      nome: '',
      email: '',
      cpf: '',
      telefone: '',
      cep: '',
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      estado: '',
      metodoPagamento: 'cartao',
      numeroCartao: '',
      nomeCartao: '',
      validadeCartao: '',
      cvv: '',
      parcelas: '1',
      cpfBoleto: '',
    },
    mode: 'all',
    criteriaMode: 'all',
    reValidateMode: 'onChange',
  });

  const { handleSubmit, setValue, formState: { errors } } = methods;

  console.log({ errors })
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          setCart(parsedCart);
        } else {
          navigate('/products');
        }
      } catch (e) {
        console.error("Erro ao carregar carrinho:", e);
        navigate('/products');
      }
    } else {
      navigate('/products');
    }
  }, [navigate]);

  const buscarCEP = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setValue('endereco', data.logradouro);
        setValue('bairro', data.bairro);
        setValue('cidade', data.localidade);
        setValue('estado', data.uf);
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  const onSubmit = (data) => {
    const orderDetails = {
      paymentMethod: data.metodoPagamento,
      date: new Date().toISOString(),
      total: total,
      items: cart,
      ...data,
    };

    sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    setOrderSuccess(true);
    localStorage.removeItem('cart');
  };

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const frete = subtotal > 200 ? 0 : 15.90;
  const total = subtotal + frete;

  if (orderSuccess) {
    return (
      <div className="container mx-auto max-w-5xl px-4 py-8">
        <div className="mt-6 rounded-lg bg-white p-6 text-center shadow-md">
          <div className="mb-4 text-6xl">✅</div>
          <h2 className="mb-4 text-2xl font-semibold text-primary-600 dark:text-primary-400">Pedido Realizado com Sucesso!</h2>
          <p className="mb-6 text-gray-700">
            Obrigado pela sua compra! Você receberá um e-mail com os detalhes do seu pedido.
          </p>
          <button
            onClick={() => navigate('/')}
            className="rounded-lg bg-primary-600 px-6 py-2 text-white transition hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
          >
            Voltar para a Loja
          </button>
        </div>
      </div>
    );
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="container mx-auto max-w-5xl px-4 py-8">
        <h1 className="mb-8 text-center text-2xl font-bold text-primary-600 dark:text-primary-400">Finalizar Pedido</h1>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="space-y-6">
            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-primary-600 dark:text-primary-400">Dados Pessoais</h2>
              <DadosPessoais buscarCEP={buscarCEP} />
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-primary-600 dark:text-primary-400">Endereço de Entrega</h2>
              <Endereco />
            </div>

            <div className="rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-primary-600 dark:text-primary-400">Forma de Pagamento</h2>
              <Pagamento total={total} />
            </div>
          </div>

          <div>
            <div className="sticky top-4 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-primary-600 dark:text-primary-400">Resumo do Pedido</h2>
              <Revisao
                cart={cart}
                subtotal={subtotal}
                frete={frete}
                total={total}
              />
            </div>
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default Checkout;