import PropTypes from 'prop-types';

const Revisao = ({ formData, cart, subtotal, frete, total, finalizarCompra }) => {
  return (
    <div className="space-y-6">
      {/* Botão de finalização */}
      <div className="mb-4">
        <button
          onClick={finalizarCompra}
          className="w-full rounded-lg bg-primary-600 px-6 py-3 text-center text-white transition hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          Finalizar Compra
        </button>
      </div>
      
      <div className="rounded-lg border border-gray-200 p-4">
        <h3 className="mb-3 font-semibold">Produtos</h3>
        <div className="max-h-60 overflow-y-auto rounded-md bg-white p-2">
          {cart.map((item, index) => (
            <div key={index} className="mb-2 flex justify-between border-b border-gray-100 pb-2 last:mb-0 last:border-0">
              <div className="flex-1">
                <p className="font-medium text-primary-700">{item.product.name}</p>
                <div className="mt-1 flex justify-between text-xs text-gray-500">
                  <span>Quantidade: {item.quantity}</span>
                  <span className="mr-4">Unitário: R$ {item.product.price.toFixed(2).replace('.', ',')}</span>
                </div>
              </div>
              <div className="text-right font-medium">
                <p>R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-4 space-y-2 rounded-md border border-gray-100 bg-gray-50 p-3">
          <div className="flex justify-between text-sm">
            <span className="font-medium">Subtotal:</span>
            <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="font-medium">Frete:</span>
            <span>{frete === 0 ? <span className="font-medium text-green-600">Grátis</span> : `R$ ${frete.toFixed(2).replace('.', ',')}`}</span>
          </div>
          <div className="mt-2 flex justify-between border-t border-gray-200 pt-3 text-lg">
            <span className="font-bold">Total:</span>
            <span className="font-bold text-primary-700">R$ {total.toFixed(2).replace('.', ',')}</span>
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-3 font-semibold">Dados Pessoais</h3>
        <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
          <div>
            <span className="font-medium">Nome:</span> {formData.nome || 'Não informado'}
          </div>
          <div>
            <span className="font-medium">E-mail:</span> {formData.email || 'Não informado'}
          </div>
          <div>
            <span className="font-medium">CPF:</span> {formData.cpf || 'Não informado'}
          </div>
          <div>
            <span className="font-medium">Telefone:</span> {formData.telefone || 'Não informado'}
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-3 font-semibold">Endereço de Entrega</h3>
        <div className="grid gap-2 text-sm">
          <div>
            <span className="font-medium">Endereço:</span> {formData.endereco ? `${formData.endereco}, ${formData.numero} ${formData.complemento ? `- ${formData.complemento}` : ''}` : 'Não informado'}
          </div>
          <div>
            <span className="font-medium">Bairro:</span> {formData.bairro || 'Não informado'}
          </div>
          <div>
            <span className="font-medium">Cidade/UF:</span> {formData.cidade && formData.estado ? `${formData.cidade}/${formData.estado}` : 'Não informado'}
          </div>
          <div>
            <span className="font-medium">CEP:</span> {formData.cep || 'Não informado'}
          </div>
        </div>
      </div>
      
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        <h3 className="mb-3 font-semibold">Forma de Pagamento</h3>
        <div className="text-sm">
          {formData.metodoPagamento === 'cartao' && (
            <>
              <div>
                <span className="font-medium">Cartão de Crédito:</span> {formData.numeroCartao ? `•••• •••• •••• ${formData.numeroCartao.substring(formData.numeroCartao.length - 4)}` : 'Não informado'}
              </div>
              <div>
                <span className="font-medium">Nome no Cartão:</span> {formData.nomeCartao || 'Não informado'}
              </div>
              <div>
                <span className="font-medium">Parcelamento:</span> {formData.parcelas ? `${formData.parcelas}x de R$ ${(total / parseInt(formData.parcelas)).toFixed(2).replace('.', ',')}` : 'Não informado'}
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
      
      {/* Política de privacidade e termos */}
      <div className="mt-2 text-center text-sm text-gray-600">
        <p>Ao finalizar o pedido, você concorda com nossa <a href="#" className="text-primary-600 hover:underline">Política de Privacidade</a> e <a href="#" className="text-primary-600 hover:underline">Termos de Uso</a>.</p>
      </div>
      
      {/* Botão de finalização */}
      <div className="mt-6">
        <button
          onClick={finalizarCompra}
          className="w-full rounded-lg bg-primary-600 px-6 py-3 text-center text-white transition hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
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
  finalizarCompra: PropTypes.func.isRequired,
};

export default Revisao; 