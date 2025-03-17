import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stepper } from '../components/stepper';
import DadosPessoais from '../components/checkout/DadosPessoais';
import Endereco from '../components/checkout/Endereco';
import Pagamento from '../components/checkout/Pagamento';
import Revisao from '../components/checkout/Revisao';

// Componente principal de checkout
const Checkout = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [cart, setCart] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    // Dados pessoais
    nome: '',
    email: '',
    cpf: '',
    telefone: '',
    
    // Endereço
    cep: '',
    endereco: '',
    numero: '',
    complemento: '',
    bairro: '',
    cidade: '',
    estado: '',
    
    // Pagamento
    metodoPagamento: 'cartao',
    numeroCartao: '',
    nomeCartao: '',
    validadeCartao: '',
    cvv: '',
    parcelas: '1',
    
    // Boleto & Pix
    cpfBoleto: '',
  });
  
  // Carrega o carrinho do localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        if (Array.isArray(parsedCart) && parsedCart.length > 0) {
          setCart(parsedCart);
        } else {
          // Redireciona se o carrinho estiver vazio
          navigate('/products');
        }
      } catch (e) {
        console.error("Erro ao carregar carrinho:", e);
        navigate('/products');
      }
    } else {
      // Redireciona se o carrinho estiver vazio
      navigate('/products');
    }
  }, [navigate]);
  
  // Função para lidar com mudanças nos campos do formulário
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Remove o erro quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
    
    // Implementação para buscar o CEP
    if (name === 'cep' && value.replace(/\D/g, '').length === 8) {
      buscarCEP(value.replace(/\D/g, ''));
    }
  };
  
  // Função para buscar dados de CEP
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
  
  // Avança para o próximo passo
  const nextStep = () => {
    if (validateStep()) {
      setActiveStep(prev => Math.min(prev + 1, 3));
    }
  };
  
  // Volta para o passo anterior
  const prevStep = () => {
    setActiveStep(prev => Math.max(prev - 1, 0));
  };
  
  // Validação antes de prosseguir para o próximo passo
  const validateStep = () => {
    let isValid = true;
    const newErrors = {};
    
    switch (activeStep) {
      case 0: // Dados Pessoais
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
        break;
        
      case 1: // Endereço
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
        break;
        
      case 2: // Pagamento
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
        break;
        
      default:
        return true;
    }
    
    setErrors(newErrors);
    return isValid;
  };
  
  // Calcular subtotal
  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  
  // Calcular frete (fictício)
  const frete = subtotal > 200 ? 0 : 15.90;
  
  // Calcular total
  const total = subtotal + frete;
  
  // Função para finalizar a compra
  const finalizarCompra = () => {
    // Salvar detalhes do pedido para a página de sucesso
    const orderDetails = {
      paymentMethod: formData.metodoPagamento,
      date: new Date().toISOString(),
      total: total,
      items: cart
    };
    
    sessionStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    
    // Avançar para o último passo (tela de conclusão)
    setActiveStep(4);
  };
  
  return (
    <div className="container mx-auto max-w-5xl px-4 py-8">
      <h1 className="mb-8 text-center text-2xl font-bold text-purple-800">Finalizar Pedido</h1>
      
      <div className="mb-8">
        <Stepper active={activeStep} onStepClick={(step) => step < activeStep && setActiveStep(step)}>
          <Stepper.Step label="Dados Pessoais">
            <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-purple-800">Dados Pessoais</h2>
              <DadosPessoais
                formData={formData}
                handleChange={handleChange}
                errors={errors}
                nextStep={nextStep}
              />
            </div>
          </Stepper.Step>
          
          <Stepper.Step label="Endereço">
            <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-purple-800">Endereço de Entrega</h2>
              <Endereco
                formData={formData}
                handleChange={handleChange}
                errors={errors}
                prevStep={prevStep}
                nextStep={nextStep}
              />
            </div>
          </Stepper.Step>
          
          <Stepper.Step label="Pagamento">
            <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-purple-800">Forma de Pagamento</h2>
              <Pagamento
                formData={formData}
                handleChange={handleChange}
                errors={errors}
                prevStep={prevStep}
                nextStep={nextStep}
                total={total}
              />
            </div>
          </Stepper.Step>
          
          <Stepper.Step label="Revisão">
            <div className="mt-6 rounded-lg bg-white p-6 shadow-md">
              <h2 className="mb-4 text-xl font-semibold text-purple-800">Revisão do Pedido</h2>
              <Revisao
                formData={formData}
                cart={cart}
                subtotal={subtotal}
                frete={frete}
                total={total}
                prevStep={prevStep}
                finalizarCompra={finalizarCompra}
              />
            </div>
          </Stepper.Step>
          
          <Stepper.Completed>
            <div className="mt-6 rounded-lg bg-white p-6 text-center shadow-md">
              <div className="mb-4 text-6xl">✅</div>
              <h2 className="mb-4 text-2xl font-semibold text-purple-800">Pedido Realizado com Sucesso!</h2>
              <p className="mb-6 text-gray-700">
                Obrigado pela sua compra! Você receberá um e-mail com os detalhes do seu pedido.
              </p>
              <button
                onClick={() => navigate('/')}
                className="rounded-lg bg-purple-700 px-6 py-2 text-white transition hover:bg-purple-800"
              >
                Voltar para a Loja
              </button>
            </div>
          </Stepper.Completed>
        </Stepper>
      </div>
    </div>
  );
};

export default Checkout