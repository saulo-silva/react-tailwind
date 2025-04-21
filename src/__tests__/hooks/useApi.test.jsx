import { describe, it, expect, vi, beforeAll, afterAll, afterEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useApi } from '../../hooks/useApi';

// Mock para o fetch global
const mockFetch = vi.fn();
window.fetch = mockFetch;

const wrapper = ({ children }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

describe('useApi', () => {
  beforeAll(() => {
    // Silenciar erros de console durante os testes
    vi.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    mockFetch.mockReset();
  });

  describe('useGetData', () => {
    it('busca dados da API com sucesso', async () => {
      const mockData = { id: 1, name: 'Produto Teste' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockData,
      });

      const { result } = renderHook(() => {
        const { useGetData } = useApi();
        return useGetData('products');
      }, { wrapper });

      // Inicialmente está em loading
      expect(result.current.isLoading).toBe(true);

      // Espera a resolução da promise
      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      // Verifica os dados retornados
      expect(result.current.data).toEqual(mockData);
      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/products');
    });

    it('trata erros corretamente', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      const { result } = renderHook(() => {
        const { useGetData } = useApi();
        return useGetData('products');
      }, { wrapper });

      await waitFor(() => {
        expect(result.current.isError).toBe(true);
      });

      expect(result.current.error).toBeDefined();
    });
  });

  describe('usePostData', () => {
    it('envia dados para a API com sucesso', async () => {
      const mockData = { name: 'Novo Produto' };
      const mockResponse = { id: 1, ...mockData };
      
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const { result } = renderHook(() => {
        const { usePostData } = useApi();
        return usePostData('products');
      }, { wrapper });

      // Executa a mutação
      result.current.mutate(mockData);

      await waitFor(() => {
        expect(result.current.isSuccess).toBe(true);
      });

      expect(mockFetch).toHaveBeenCalledWith('http://localhost:3000/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(mockData),
      });

      expect(result.current.data).toEqual(mockResponse);
    });
  });

  // Testes adicionais para useUpdateData e useDeleteData seguiriam o mesmo padrão
}); 