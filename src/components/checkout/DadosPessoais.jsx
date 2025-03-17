import PropTypes from 'prop-types';
import { formatCPF, formatTelefone } from '../../utils/formatters';

const DadosPessoais = ({ formData, handleChange, errors, nextStep }) => {
  const handleInputChange = (e, formatter = null) => {
    const { name, value } = e.target;
    const formattedValue = formatter ? formatter(value) : value;
    handleChange({ target: { name, value: formattedValue } });
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            className={`mt-1 w-full rounded-md border ${errors.nome ? 'border-red-500' : 'border-gray-300'} p-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500`}
            required
          />
          {errors.nome && <p className="mt-1 text-xs text-red-500">{errors.nome}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`mt-1 w-full rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} p-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500`}
            required
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CPF</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={(e) => handleInputChange(e, formatCPF)}
            maxLength={14}
            className={`mt-1 w-full rounded-md border ${errors.cpf ? 'border-red-500' : 'border-gray-300'} p-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500`}
            required
          />
          {errors.cpf && <p className="mt-1 text-xs text-red-500">{errors.cpf}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Telefone</label>
          <input
            type="text"
            name="telefone"
            value={formData.telefone}
            onChange={(e) => handleInputChange(e, formatTelefone)}
            maxLength={15}
            className={`mt-1 w-full rounded-md border ${errors.telefone ? 'border-red-500' : 'border-gray-300'} p-2 focus:border-purple-500 focus:outline-none focus:ring-purple-500`}
            required
          />
          {errors.telefone && <p className="mt-1 text-xs text-red-500">{errors.telefone}</p>}
        </div>
      </div>
      
      {/* Botões de navegação */}
      <div className="mt-8 flex justify-end space-x-4">
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

DadosPessoais.propTypes = {
  formData: PropTypes.shape({
    nome: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    cpf: PropTypes.string.isRequired,
    telefone: PropTypes.string.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default DadosPessoais; 