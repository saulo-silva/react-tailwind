import PropTypes from 'prop-types';
import { formatCartao, formatValidade } from '../../utils/formatters';

const Pagamento = ({ formData, handleChange, errors, total }) => {
  const handleInputChange = (e, formatter = null) => {
    const { name, value } = e.target;
    const formattedValue = formatter ? formatter(value) : value;
    handleChange({ target: { name, value: formattedValue } });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Método de Pagamento</label>
        <select
          name="metodoPagamento"
          value={formData.metodoPagamento}
          onChange={handleInputChange}
          className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500"
        >
          <option value="cartao">Cartão de Crédito</option>
          <option value="boleto">Boleto Bancário</option>
          <option value="pix">PIX</option>
        </select>
      </div>

      {formData.metodoPagamento === 'cartao' && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Número do Cartão</label>
              <input
                type="text"
                name="numeroCartao"
                value={formData.numeroCartao}
                onChange={(e) => handleInputChange(e, formatCartao)}
                maxLength={19}
                className={`mt-1 w-full rounded-md border ${errors.numeroCartao ? 'border-red-500' : 'border-gray-300'} p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
                placeholder="0000 0000 0000 0000"
                required={formData.metodoPagamento === 'cartao'}
              />
              {errors.numeroCartao && <p className="mt-1 text-xs text-red-500">{errors.numeroCartao}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Nome no Cartão</label>
              <input
                type="text"
                name="nomeCartao"
                value={formData.nomeCartao}
                onChange={handleInputChange}
                className={`mt-1 w-full rounded-md border ${errors.nomeCartao ? 'border-red-500' : 'border-gray-300'} p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
                required={formData.metodoPagamento === 'cartao'}
              />
              {errors.nomeCartao && <p className="mt-1 text-xs text-red-500">{errors.nomeCartao}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Validade</label>
              <input
                type="text"
                name="validadeCartao"
                value={formData.validadeCartao}
                onChange={(e) => handleInputChange(e, formatValidade)}
                maxLength={5}
                placeholder="MM/AA"
                className={`mt-1 w-full rounded-md border ${errors.validadeCartao ? 'border-red-500' : 'border-gray-300'} p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
                required={formData.metodoPagamento === 'cartao'}
              />
              {errors.validadeCartao && <p className="mt-1 text-xs text-red-500">{errors.validadeCartao}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CVV</label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, '');
                  handleChange({ target: { name: 'cvv', value } });
                }}
                maxLength={4}
                className={`mt-1 w-full rounded-md border ${errors.cvv ? 'border-red-500' : 'border-gray-300'} p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
                required={formData.metodoPagamento === 'cartao'}
              />
              {errors.cvv && <p className="mt-1 text-xs text-red-500">{errors.cvv}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Parcelamento</label>
              <select
                name="parcelas"
                value={formData.parcelas}
                onChange={handleInputChange}
                className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500"
                required={formData.metodoPagamento === 'cartao'}
              >
                {[...Array(12)].map((_, i) => {
                  const parcelas = i + 1;
                  const valorParcela = total / parcelas;
                  return (
                    <option key={parcelas} value={parcelas}>
                      {parcelas}x de R$ {valorParcela.toFixed(2).replace('.', ',')}
                      {parcelas === 1 ? ' (à vista)' : ''}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
      )}

      {formData.metodoPagamento === 'boleto' && (
        <div className="mt-4 space-y-4 rounded-lg border border-gray-300 bg-gray-50 p-4">
          <p className="text-gray-700">
            O boleto será gerado após a confirmação do pedido e enviado para o seu e-mail.
            O prazo de validade é de 1 dia útil.
          </p>
          <p className="font-semibold text-gray-700">
            Valor do boleto: R$ {total.toFixed(2).replace('.', ',')}
          </p>
        </div>
      )}

      {formData.metodoPagamento === 'pix' && (
        <div className="mt-4 space-y-4 rounded-lg border border-gray-300 bg-gray-50 p-4">
          <p className="text-gray-700">
            O QR Code do PIX será gerado após a confirmação do pedido.
            O pagamento deve ser realizado em até 30 minutos.
          </p>
          <p className="font-semibold text-gray-700">
            Valor do PIX: R$ {total.toFixed(2).replace('.', ',')}
          </p>
        </div>
      )}
    </div>
  );
};

Pagamento.propTypes = {
  formData: PropTypes.shape({
    metodoPagamento: PropTypes.string.isRequired,
    numeroCartao: PropTypes.string.isRequired,
    nomeCartao: PropTypes.string.isRequired,
    validadeCartao: PropTypes.string.isRequired,
    cvv: PropTypes.string.isRequired,
    parcelas: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  total: PropTypes.number.isRequired,
};

export default Pagamento;
