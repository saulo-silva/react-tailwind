import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DadosPessoais from '../components/checkout/DadosPessoais';
import Endereco from '../components/checkout/Endereco';
import Pagamento from '../components/checkout/Pagamento';
import Revisao from '../components/checkout/Revisao';

const Checkout = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [errors, setErrors] = useState({});
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({
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
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }

    if (name === 'cep' && value.replace(/\D/g, '').length === 8) {
      buscarCEP(value.replace(/\D/g, ''));
    }
  };

  const buscarCEP = async (cep) => {
    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (!data.erro) {
        setFormData(prev => ({
          ...prev,
          endereco: data.logradouro,
          bairro: data.bairro,
          cidade: data.localidade,
          estado: data.uf
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
    }
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!formData.nome) {
      newErrors.nome = 'Nome é obrigatório';
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = 'E-mail é obrigatório';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido';
      isValid = false;
    }
    if (!formData.cpf) {
      newErrors.cpf = 'CPF é obrigatório';
      isValid = false;
    } else if (formData.cpf.replace(/\D/g, '').length !== 11) {
      newErrors.cpf = 'CPF inválido';
      isValid = false;
    }
    if (!formData.telefone) {
      newErrors.telefone = 'Telefone é obrigatório';
      isValid = false;
    } else if (formData.telefone.replace(/\D/g, '').length < 10) {
      newErrors.telefone = 'Telefone inválido';
      isValid = false;
    }

    if (!formData.cep) {
      newErrors.cep = 'CEP é obrigatório';
      isValid = false;
    } else if (formData.cep.replace(/\D/g, '').length !== 8) {
      newErrors.cep = 'CEP inválido';
      isValid = false;
    }
    if (!formData.endereco) {
      newErrors.endereco = 'Endereço é obrigatório';
      isValid = false;
    }
    if (!formData.numero) {
      newErrors.numero = 'Número é obrigatório';
      isValid = false;
    }
    if (!formData.bairro) {
      newErrors.bairro = 'Bairro é obrigatório';
      isValid = false;
    }
    if (!formData.cidade) {
      newErrors.cidade = 'Cidade é obrigatória';
      isValid = false;
    }
    if (!formData.estado) {
      newErrors.estado = 'Estado é obrigatório';
      isValid = false;
    }

    if (formData.metodoPagamento === 'cartao') {
      if (!formData.numeroCartao) {
        newErrors.numeroCartao = 'Número do cartão é obrigatório';
        isValid = false;
      } else if (formData.numeroCartao.replace(/\D/g, '').length < 16) {
        newErrors.numeroCartao = 'Número do cartão inválido';
        isValid = false;
      }
      if (!formData.nomeCartao) {
        newErrors.nomeCartao = 'Nome no cartão é obrigatório';
        isValid = false;
      }
      if (!formData.validadeCartao) {
        newErrors.validadeCartao = 'Validade é obrigatória';
        isValid = false;
      } else if (formData.validadeCartao.replace(/\D/g, '').length !== 4) {
        newErrors.validadeCartao = 'Validade inválida';
        isValid = false;
      }
      if (!formData.cvv) {
        newErrors.cvv = 'CVV é obrigatório';
        isValid = false;
      } else if (formData.cvv.length < 3) {
        newErrors.cvv = 'CVV inválido';
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  };

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const frete = subtotal > 200 ? 0 : 15.90;
  const total = subtotal + frete;

  const finalizarCompra = () => {
    if (!validateForm()) {
      const firstErrorEl = document.querySelector('.border-red-500');
      if (firstErrorEl) {
        firstErrorEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    const orderDetails = {
      paymentMethod: formData.metodoPagamento,
      date: new Date().toISOString(),
      total: total,
      items: cart
    };

    sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    setOrderSuccess(true);
    localStorage.removeItem('cart');
  };

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
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-8 text-center text-2xl font-bold text-primary-600 dark:text-primary-400">Finalizar Pedido</h1>

      <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-6">
          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-primary-600 dark:text-primary-400">Dados Pessoais</h2>
            <DadosPessoais
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              nextStep={() => {}}
            />
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-primary-600 dark:text-primary-400">Endereço de Entrega</h2>
            <Endereco
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              prevStep={() => {}}
              nextStep={() => {}}
            />
          </div>

          <div className="rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-primary-600 dark:text-primary-400">Forma de Pagamento</h2>
            <Pagamento
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              prevStep={() => {}}
              nextStep={() => {}}
              total={total}
            />
          </div>
        </div>

        <div>
          <div className="sticky top-4 rounded-lg bg-white p-6 shadow-md">
            <h2 className="mb-4 text-xl font-semibold text-primary-600 dark:text-primary-400">Resumo do Pedido</h2>
            <Revisao
              formData={formData}
              cart={cart}
              subtotal={subtotal}
              frete={frete}
              total={total}
              prevStep={() => {}}
              finalizarCompra={finalizarCompra}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout