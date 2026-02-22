import axios from 'axios';

// Função para tratar erros da API
export const handleApiError = (
  error: unknown,
): { statusCode: number; message: string } => {
  if (axios.isAxiosError(error) && error.response) {
    return {
      statusCode: error.response.status,
      message: error.response.data?.message || 'Ocorreu um erro inesperado',
    };
  }
  return { statusCode: 500, message: 'Erro desconhecido' };
};

// Função para processar respostas da API
export const handleApiResponse = <T>(result: {
  status: number;
  data: T;
}): { data?: T; statusCode: number } => {
  return { data: result.data, statusCode: result.status };
};
