import { z } from 'zod';

// Schema para dados pessoais
export const dadosPessoaisSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  cpf: z.string()
    .min(11, 'CPF inválido')
    .max(14, 'CPF inválido')
    .transform(val => val.replace(/\D/g, ''))
    .refine(val => val.length === 11, 'CPF inválido'),
  telefone: z.string()
    .min(10, 'Telefone inválido')
    .max(15, 'Telefone inválido')
    .transform(val => val.replace(/\D/g, ''))
    .refine(val => val.length >= 10 && val.length <= 11, 'Telefone inválido'),
});

// Schema para endereço
export const enderecoSchema = z.object({
  cep: z.string()
    .min(8, 'CEP inválido')
    .max(9, 'CEP inválido')
    .transform(val => val.replace(/\D/g, ''))
    .refine(val => val.length === 8, 'CEP inválido'),
  endereco: z.string().min(1, 'Endereço é obrigatório'),
  numero: z.string().min(1, 'Número é obrigatório'),
  complemento: z.string().optional(),
  bairro: z.string().min(1, 'Bairro é obrigatório'),
  cidade: z.string().min(1, 'Cidade é obrigatória'),
  estado: z.string().min(2, 'Estado é obrigatório').max(2, 'Estado inválido'),
});

// Schema para cartão de crédito
const cartaoSchema = z.object({
  numeroCartao: z.string()
    .min(16, 'Número do cartão inválido')
    .max(19, 'Número do cartão inválido')
    .transform(val => val.replace(/\D/g, ''))
    .refine(val => val.length === 16, 'Número do cartão inválido'),
  nomeCartao: z.string().min(1, 'Nome no cartão é obrigatório'),
  validadeCartao: z.string()
    .min(4, 'Validade inválida')
    .max(5, 'Validade inválida')
    .transform(val => val.replace(/\D/g, ''))
    .refine(val => val.length === 4, 'Validade inválida')
    .refine((val) => {
      const month = parseInt(val.substring(0, 2));
      const year = parseInt(val.substring(2, 4));
      const currentYear = new Date().getFullYear() % 100;
      const currentMonth = new Date().getMonth() + 1;
      
      return (year > currentYear) || (year === currentYear && month >= currentMonth);
    }, 'Data de validade expirada'),
  cvv: z.string()
    .min(3, 'CVV inválido')
    .max(4, 'CVV inválido')
    .transform(val => val.replace(/\D/g, ''))
    .refine(val => val.length >= 3 && val.length <= 4, 'CVV inválido'),
  parcelas: z.string().min(1, 'Selecione o número de parcelas'),
});

// Schema para pagamento (CORRIGIDO)
export const pagamentoSchema = z.discriminatedUnion('metodoPagamento', [
  // Opção 1: Usando z.object com z.literal e depois fazendo merge com cartaoSchema
  z.object({
    metodoPagamento: z.literal('cartao'),
  }).merge(cartaoSchema),
  
  z.object({
    metodoPagamento: z.literal('boleto'),
    cpfBoleto: z.string()
      .transform(val => val.replace(/\D/g, ''))
      .refine(val => !val || val.length === 11, 'CPF inválido')
      .optional(),
  }),
  z.object({
    metodoPagamento: z.literal('pix'),
  }),
]);

// Schema completo do checkout
export const checkoutSchema = dadosPessoaisSchema
  .merge(enderecoSchema)
  .merge(pagamentoSchema);

// Funções auxiliares de validação
export const validateDadosPessoais = (data) => {
  const result = dadosPessoaisSchema.safeParse(data);
  return {
    success: result.success,
    errors: result.success ? {} : formatZodErrors(result.error),
  };
};

export const validateEndereco = (data) => {
  const result = enderecoSchema.safeParse(data);
  return {
    success: result.success,
    errors: result.success ? {} : formatZodErrors(result.error),
  };
};

export const validatePagamento = (data) => {
  const result = pagamentoSchema.safeParse(data);
  return {
    success: result.success,
    errors: result.success ? {} : formatZodErrors(result.error),
  };
};

export const validateCheckout = (data) => {
  const result = checkoutSchema.safeParse(data);
  return {
    success: result.success,
    errors: result.success ? {} : formatZodErrors(result.error),
  };
};

// Função auxiliar para formatar erros do Zod
const formatZodErrors = (error) => {
  const errors = {};
  error.errors.forEach((err) => {
    errors[err.path[0]] = err.message;
  });
  return errors;
};