import PropTypes from 'prop-types';
import { useFormContext } from 'react-hook-form';
import { formatCPF, formatTelefone } from '../../utils/formatters';

const DadosPessoais = ({ buscarCEP }) => {
  const {
    register,
    formState: { errors, touchedFields },
    setValue,
    watch,
    trigger
  } = useFormContext();

  const handleCPFChange = async (e) => {
    const formatted = formatCPF(e.target.value);
    setValue('cpf', formatted, { shouldValidate: true });
    await trigger('cpf');
  };

  const handleTelefoneChange = async (e) => {
    const formatted = formatTelefone(e.target.value);
    setValue('telefone', formatted, { shouldValidate: true });
    await trigger('telefone');
  };

  // Observa mudanças no CEP para buscar o endereço
  const cep = watch('cep');
  if (cep?.replace(/\D/g, '').length === 8) {
    buscarCEP(cep.replace(/\D/g, ''));
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome Completo</label>
          <input
            type="text"
            {...register('nome', {
              onChange: () => trigger('nome')
            })}
            className={`mt-1 w-full rounded-md border ${errors.nome ? 'border-red-500' : touchedFields.nome ? 'border-green-500' : 'border-gray-300'} p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
          />
          {errors.nome && <p className="mt-1 text-xs text-red-500">{errors.nome.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">E-mail</label>
          <input
            type="email"
            {...register('email', {
              onChange: () => trigger('email')
            })}
            className={`mt-1 w-full rounded-md border ${errors.email ? 'border-red-500' : touchedFields.email ? 'border-green-500' : 'border-gray-300'} p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
          />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">CPF</label>
          <input
            type="text"
            {...register('cpf')}
            onChange={handleCPFChange}
            maxLength={14}
            className={`mt-1 w-full rounded-md border ${errors.cpf ? 'border-red-500' : touchedFields.cpf ? 'border-green-500' : 'border-gray-300'} p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
          />
          {errors.cpf && <p className="mt-1 text-xs text-red-500">{errors.cpf.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Telefone</label>
          <input
            type="text"
            {...register('telefone')}
            onChange={handleTelefoneChange}
            maxLength={15}
            className={`mt-1 w-full rounded-md border ${errors.telefone ? 'border-red-500' : touchedFields.telefone ? 'border-green-500' : 'border-gray-300'} p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
          />
          {errors.telefone && <p className="mt-1 text-xs text-red-500">{errors.telefone.message}</p>}
        </div>
      </div>
    </div>
  );
};

DadosPessoais.propTypes = {
  buscarCEP: PropTypes.func.isRequired,
};

export default DadosPessoais; 