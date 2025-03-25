import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { formatCartao, formatValidade } from '../../utils/formatters';

const Pagamento = ({ total }) => {
  const {
    register,
    formState: { errors, touchedFields },
    setValue,
    watch,
    trigger
  } = useFormContext();
  const metodoPagamento = watch('metodoPagamento');

  const handleCartaoChange = async (e) => {
    const formatted = formatCartao(e.target.value);
    setValue('numeroCartao', formatted, { shouldValidate: true });
    await trigger('numeroCartao');
  };

  const handleValidadeChange = async (e) => {
    const formatted = formatValidade(e.target.value);
    setValue('validadeCartao', formatted, { shouldValidate: true });
    await trigger('validadeCartao');
  };

  const handleCVVChange = async (e) => {
    const value = e.target.value.replace(/\D/g, '');
    setValue('cvv', value, { shouldValidate: true });
    await trigger('cvv');
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Método de Pagamento</label>
        <select
          {...register('metodoPagamento', {
            onChange: () => trigger('metodoPagamento')
          })}
          className={`mt-1 w-full rounded-md border ${errors.metodoPagamento ? 'border-red-500' : touchedFields.metodoPagamento ? 'border-green-500' : 'border-gray-300'} p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
        >
          <option value="cartao">Cartão de Crédito</option>
          <option value="boleto">Boleto Bancário</option>
          <option value="pix">PIX</option>
        </select>
        {errors.metodoPagamento && <p className="mt-1 text-xs text-red-500">{errors.metodoPagamento.message}</p>}
      </div>

      {metodoPagamento === 'cartao' && (
        <div className="mt-4 space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Número do Cartão</label>
              <input
                type="text"
                {...register('numeroCartao')}
                onChange={handleCartaoChange}
                maxLength={19}
                className={`mt-1 w-full rounded-md border ${errors.numeroCartao ? 'border-red-500' : touchedFields.numeroCartao ? 'border-green-500' : 'border-gray-300'} p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
                placeholder="0000 0000 0000 0000"
              />
              {errors.numeroCartao && <p className="mt-1 text-xs text-red-500">{errors.numeroCartao.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Nome no Cartão</label>
              <input
                type="text"
                {...register('nomeCartao', {
                  onChange: () => trigger('nomeCartao')
                })}
                className={`mt-1 w-full rounded-md border ${errors.nomeCartao ? 'border-red-500' : touchedFields.nomeCartao ? 'border-green-500' : 'border-gray-300'} p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
              />
              {errors.nomeCartao && <p className="mt-1 text-xs text-red-500">{errors.nomeCartao.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Validade</label>
              <input
                type="text"
                {...register('validadeCartao')}
                onChange={handleValidadeChange}
                maxLength={5}
                placeholder="MM/AA"
                className={`mt-1 w-full rounded-md border ${errors.validadeCartao ? 'border-red-500' : touchedFields.validadeCartao ? 'border-green-500' : 'border-gray-300'} p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
              />
              {errors.validadeCartao && <p className="mt-1 text-xs text-red-500">{errors.validadeCartao.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">CVV</label>
              <input
                type="text"
                {...register('cvv')}
                onChange={handleCVVChange}
                maxLength={4}
                className={`mt-1 w-full rounded-md border ${errors.cvv ? 'border-red-500' : touchedFields.cvv ? 'border-green-500' : 'border-gray-300'} p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
              />
              {errors.cvv && <p className="mt-1 text-xs text-red-500">{errors.cvv.message}</p>}
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Parcelamento</label>
              <select
                {...register('parcelas', {
                  onChange: () => trigger('parcelas')
                })}
                className={`mt-1 w-full rounded-md border ${errors.parcelas ? 'border-red-500' : touchedFields.parcelas ? 'border-green-500' : 'border-gray-300'} p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
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
              {errors.parcelas && <p className="mt-1 text-xs text-red-500">{errors.parcelas.message}</p>}
            </div>
          </div>
        </div>
      )}

      {metodoPagamento === 'boleto' && (
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

      {metodoPagamento === 'pix' && (
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
  total: PropTypes.number.isRequired,
};

export default Pagamento;
