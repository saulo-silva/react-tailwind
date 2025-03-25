import { useFormContext } from 'react-hook-form';
import { formatCEP } from '../../utils/formatters';

const Endereco = () => {
  const {
    register,
    formState: { errors, touchedFields },
    setValue,
    trigger
  } = useFormContext();

  const handleCEPChange = async (e) => {
    const formatted = formatCEP(e.target.value);
    setValue('cep', formatted, { shouldValidate: true });
    await trigger('cep');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="md:col-span-1">
          <label className="block text-sm font-medium text-gray-700">CEP</label>
          <input
            type="text"
            {...register('cep')}
            onChange={handleCEPChange}
            maxLength={9}
            className={`mt-1 w-full rounded-md border ${errors.cep ? 'border-red-500' : touchedFields.cep ? 'border-green-500' : 'border-gray-300'} p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
          />
          {errors.cep && <p className="mt-1 text-xs text-red-500">{errors.cep.message}</p>}
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700">Endereço</label>
          <input
            type="text"
            {...register('endereco', {
              onChange: () => trigger('endereco')
            })}
            className={`mt-1 w-full rounded-md border ${errors.endereco ? 'border-red-500' : touchedFields.endereco ? 'border-green-500' : 'border-gray-300'} p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
          />
          {errors.endereco && <p className="mt-1 text-xs text-red-500">{errors.endereco.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Número</label>
          <input
            type="text"
            {...register('numero', {
              onChange: () => trigger('numero')
            })}
            className={`mt-1 w-full rounded-md border ${errors.numero ? 'border-red-500' : touchedFields.numero ? 'border-green-500' : 'border-gray-300'} p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
          />
          {errors.numero && <p className="mt-1 text-xs text-red-500">{errors.numero.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Complemento</label>
          <input
            type="text"
            {...register('complemento')}
            className="mt-1 w-full rounded-md border border-gray-300 p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Bairro</label>
          <input
            type="text"
            {...register('bairro', {
              onChange: () => trigger('bairro')
            })}
            className={`mt-1 w-full rounded-md border ${errors.bairro ? 'border-red-500' : touchedFields.bairro ? 'border-green-500' : 'border-gray-300'} p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
          />
          {errors.bairro && <p className="mt-1 text-xs text-red-500">{errors.bairro.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Cidade</label>
          <input
            type="text"
            {...register('cidade', {
              onChange: () => trigger('cidade')
            })}
            className={`mt-1 w-full rounded-md border ${errors.cidade ? 'border-red-500' : touchedFields.cidade ? 'border-green-500' : 'border-gray-300'} p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
          />
          {errors.cidade && <p className="mt-1 text-xs text-red-500">{errors.cidade.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Estado</label>
          <select
            {...register('estado', {
              onChange: () => trigger('estado')
            })}
            className={`mt-1 w-full rounded-md border ${errors.estado ? 'border-red-500' : touchedFields.estado ? 'border-green-500' : 'border-gray-300'} p-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500`}
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
          {errors.estado && <p className="mt-1 text-xs text-red-500">{errors.estado.message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Endereco; 