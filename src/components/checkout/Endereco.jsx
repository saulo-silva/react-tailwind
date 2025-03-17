import PropTypes from 'prop-types';
import { formatCEP } from '../../utils/formatters';

const Endereco = ({ formData, handleChange, errors, prevStep, nextStep }) => {
  const handleInputChange = (e, formatter = null) => {
    const { name, value } = e.target;
    const formattedValue = formatter ? formatter(value) : value;
    handleChange({ target: { name, value: formattedValue } });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">CEP</label>
          <input
            type="text"
            name="cep"
            value={formData.cep}
            onChange={(e) => handleInputChange(e, formatCEP)}
            maxLength={9}
            className={`mt-1 w-full rounded-md border ${errors.cep ? 'border-red-500' : 'border-gray-300'} p-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500`}
            required
          />
          {errors.cep && <p className="mt-1 text-xs text-red-500">{errors.cep}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Endereço</label>
          <input
            type="text"
            name="endereco"
            value={formData.endereco}
            onChange={handleInputChange}
            className={`mt-1 w-full rounded-md border ${errors.endereco ? 'border-red-500' : 'border-gray-300'} p-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500`}
            required
          />
          {errors.endereco && <p className="mt-1 text-xs text-red-500">{errors.endereco}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Número</label>
          <input
            type="text"
            name="numero"
            value={formData.numero}
            onChange={handleInputChange}
            className={`mt-1 w-full rounded-md border ${errors.numero ? 'border-red-500' : 'border-gray-300'} p-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500`}
            required
          />
          {errors.numero && <p className="mt-1 text-xs text-red-500">{errors.numero}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Complemento</label>
          <input
            type="text"
            name="complemento"
            value={formData.complemento}
            onChange={handleInputChange}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bairro</label>
          <input
            type="text"
            name="bairro"
            value={formData.bairro}
            onChange={handleInputChange}
            className={`mt-1 w-full rounded-md border ${errors.bairro ? 'border-red-500' : 'border-gray-300'} p-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500`}
            required
          />
          {errors.bairro && <p className="mt-1 text-xs text-red-500">{errors.bairro}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cidade</label>
          <input
            type="text"
            name="cidade"
            value={formData.cidade}
            onChange={handleInputChange}
            className={`mt-1 w-full rounded-md border ${errors.cidade ? 'border-red-500' : 'border-gray-300'} p-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500`}
            required
          />
          {errors.cidade && <p className="mt-1 text-xs text-red-500">{errors.cidade}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            name="estado"
            value={formData.estado}
            onChange={handleInputChange}
            className={`mt-1 w-full rounded-md border ${errors.estado ? 'border-red-500' : 'border-gray-300'} p-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500`}
            required
          >
            <option value="">Selecione</option>
            <option value="AC">Acre</option>
            <option value="AL">Alagoas</option>
            <option value="AP">Amapá</option>
            <option value="AM">Amazonas</option>
            <option value="BA">Bahia</option>
            <option value="CE">Ceará</option>
            <option value="DF">Distrito Federal</option>
            <option value="ES">Espírito Santo</option>
            <option value="GO">Goiás</option>
            <option value="MA">Maranhão</option>
            <option value="MT">Mato Grosso</option>
            <option value="MS">Mato Grosso do Sul</option>
            <option value="MG">Minas Gerais</option>
            <option value="PA">Pará</option>
            <option value="PB">Paraíba</option>
            <option value="PR">Paraná</option>
            <option value="PE">Pernambuco</option>
            <option value="PI">Piauí</option>
            <option value="RJ">Rio de Janeiro</option>
            <option value="RN">Rio Grande do Norte</option>
            <option value="RS">Rio Grande do Sul</option>
            <option value="RO">Rondônia</option>
            <option value="RR">Roraima</option>
            <option value="SC">Santa Catarina</option>
            <option value="SP">São Paulo</option>
            <option value="SE">Sergipe</option>
            <option value="TO">Tocantins</option>
          </select>
          {errors.estado && <p className="mt-1 text-xs text-red-500">{errors.estado}</p>}
        </div>
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
          onClick={nextStep}
          className="rounded-lg bg-purple-700 px-6 py-2 text-white transition hover:bg-purple-800"
        >
          Próximo
        </button>
      </div>
    </div>
  );
};

Endereco.propTypes = {
  formData: PropTypes.shape({
    cep: PropTypes.string.isRequired,
    endereco: PropTypes.string.isRequired,
    numero: PropTypes.string.isRequired,
    complemento: PropTypes.string,
    bairro: PropTypes.string.isRequired,
    cidade: PropTypes.string.isRequired,
    estado: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default Endereco; 