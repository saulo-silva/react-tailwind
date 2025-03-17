import PropTypes from 'prop-types';

const Revisao = ({ formData, cart, subtotal, frete, total, prevStep, finalizarCompra }) => {
  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-3 font-semibold">Dados Pessoais</h3>
        <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
          <div>
            <span className="font-medium">Nome:</span> {formData.nome}
          </div>
          <div>
            <span className="font-medium">E-mail:</span> {formData.email}
          </div>
          <div>
            <span className="font-medium">CPF:</span> {formData.cpf}
          </div>
          <div>
            <span className="font-medium">Telefone:</span> {formData.telefone}
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-3 font-semibold">Endereço de Entrega</h3>
        <div className="grid gap-2 text-sm">
          <div>
            <span className="font-medium">Endereço:</span> {formData.endereco}, {formData.numero} {formData.complemento ? `- ${formData.complemento}` : ''}
          </div>
          <div>
            <span className="font-medium">Bairro:</span> {formData.bairro}
          </div>
          <div>
            <span className="font-medium">Cidade/UF:</span> {formData.cidade}/{formData.estado}
          </div>
          <div>
            <span className="font-medium">CEP:</span> {formData.cep}
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-3 font-semibold">Forma de Pagamento</h3>
        <div className="text-sm">
          {formData.metodoPagamento === 'cartao' && (
            <>
              <div>
                <span className="font-medium">Cartão de Crédito:</span> •••• •••• •••• {formData.numeroCartao.substring(formData.numeroCartao.length - 4)}
              </div>
              <div>
                <span className="font-medium">Nome no Cartão:</span> {formData.nomeCartao}
              </div>
              <div>
                <span className="font-medium">Parcelamento:</span> {formData.parcelas}x de R$ {(total / parseInt(formData.parcelas)).toFixed(2).replace('.', ',')}
              </div>
            </>
          )}
          
          {formData.metodoPagamento === 'boleto' && (
            <div>
              <span className="font-medium">Boleto Bancário</span> - Vencimento em 1 dia útil
            </div>
          )}
          
          {formData.metodoPagamento === 'pix' && (
            <div>
              <span className="font-medium">PIX</span> - Pagamento instantâneo
            </div>
          )}
        </div>
      </div>
      
      <div className="rounded-lg border border-gray-200 p-4">
        <h3 className="mb-3 font-semibold">Resumo do Pedido</h3>
        <div className="max-h-40 overflow-y-auto">
          {cart.map((item, index) => (
            <div key={index} className="mb-2 flex justify-between border-b pb-2">
              <div className="flex items-center">
                <img src={item.product.image} alt={item.product.name} className="mr-2 size-10 rounded object-cover" />
                <div>
                  <p className="font-medium">{item.product.name}</p>
                  <p className="text-xs text-gray-500">Quantidade: {item.quantity}</p>
                </div>
              </div>
              <div className="text-right">
                <p>R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span>Frete:</span>
            <span>{frete === 0 ? 'Grátis' : `R$ ${frete.toFixed(2).replace('.', ',')}`}</span>
          </div>
          <div className="flex justify-between border-t pt-2 text-lg font-bold">
            <span>Total:</span>
            <span>R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
      </div>
      
      {/* Política de privacidade e termos */}
      <div className="mt-2 text-center text-sm text-gray-600">
        <p>Ao finalizar o pedido, você concorda com nossa <a href="#" className="text-purple-700 hover:underline">Política de Privacidade</a> e <a href="#" className="text-purple-700 hover:underline">Termos de Uso</a>.</p>
      </div>
      
      {/* Botões de navegação */}
      <div className="mt-8 flex justify-between space-x-4">
        <button
          onClick={prevStep}
          className="rounded-lg border border-purple-700 px-6 py-2 text-purple-700 transition hover:bg-purple-50"
        >
          Voltar
        </button>
        <button
          onClick={finalizarCompra}
          className="rounded-lg bg-purple-700 px-6 py-2 text-white transition hover:bg-purple-800"
        >
          Finalizar Compra
        </button>
      </div>
    </div>
  );
};

Revisao.propTypes = {
  formData: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    cpf: PropTypes.string.isRequired,
    telefone: PropTypes.string.isRequired,
    endereco: PropTypes.string.isRequired,
    numero: PropTypes.string.isRequired,
    complemento: PropTypes.string,
    bairro: PropTypes.string.isRequired,
    cidade: PropTypes.string.isRequired,
    estado: PropTypes.string.isRequired,
    cep: PropTypes.string.isRequired,
    metodoPagamento: PropTypes.string.isRequired,
    numeroCartao: PropTypes.string.isRequired,
    nomeCartao: PropTypes.string.isRequired,
    parcelas: PropTypes.string.isRequired,
  }).isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      product: PropTypes.shape({
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        image: PropTypes.string.isRequired,
      }).isRequired,
      quantity: PropTypes.number.isRequired,
    })
  ).isRequired,
  subtotal: PropTypes.number.isRequired,
  frete: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  prevStep: PropTypes.func.isRequired,
  finalizarCompra: PropTypes.func.isRequired,
};

export default Revisao; 