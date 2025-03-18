import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const API_URL = 'http://localhost:3000'; // Using the default JSON server port

export const useApi = () => {
  const queryClient = useQueryClient();
  
  const fetchData = async (endpoint) => {
    const response = await fetch(`${API_URL}/${endpoint}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };
  
  const postData = async ({ endpoint, data }) => {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  };
  
  const updateData = async ({ endpoint, id, data }) => {
    const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  };
  
  const deleteData = async ({ endpoint, id }) => {
    const response = await fetch(`${API_URL}/${endpoint}/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    return response.json();
  };
  
  const useGetData = (endpoint, options = {}) => {
    return useQuery({
      queryKey: [endpoint],
      queryFn: () => fetchData(endpoint),
      ...options,
    });
  };
  
  const usePostData = (endpoint, options = {}) => {
    return useMutation({
      mutationFn: (data) => postData({ endpoint, data }),
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: [endpoint] });
      },
      ...options,
    });
  };
  
  const useUpdateData = (endpoint, options = {}) => {
    return useMutation({
      mutationFn: ({ id, data }) => updateData({ endpoint, id, data }),
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: [endpoint] });
      },
      ...options,
    });
  };
  
  const useDeleteData = (endpoint, options = {}) => {
    return useMutation({
      mutationFn: (id) => deleteData({ endpoint, id }),
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries({ queryKey: [endpoint] });
      },
      ...options,
    });
  };
  
  return {
    useGetData,
    usePostData,
    useUpdateData,
    useDeleteData,
  };
};

export default useApi;
