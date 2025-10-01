import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000"; // Ajuste para o URL do seu backend

const api = axios.create({
  baseURL: API_BASE_URL,
});

// Interceptor para adicionar token JWT automaticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Função para registro
export const registerUser = async (userData) => {
  try {
    const response = await api.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Função para login
export const loginUser = async (credentials) => {
  try {
    const response = await api.post("/auth/login", credentials);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Função para vender ingresso
export const sellTicket = async (ticketData) => {
  try {
    const response = await api.post("/tickets/sell", ticketData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Função para comprar ingresso
export const buyTicket = async (ticketId, quantity) => {
  try {
    const response = await api.post(`/tickets/buy/${ticketId}`, {
      quantity,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Função para listar ingressos disponíveis
export const getAvailableTickets = async () => {
  try {
    const response = await api.get("/tickets/available");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Função para obter detalhes de um ingresso pelo ID
export const getTicketDetails = async (id) => {
  try {
    const response = await api.get(`/tickets/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Função para obter perfil do usuário
export const getUserProfile = async () => {
  try {
    const response = await api.get("/users/profile");
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Função para solicitar recuperação de senha
export const forgotPassword = async (email) => {
  try {
    const response = await api.post("/auth/forgot-password", { email });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

// Função para redefinir senha
export const resetPassword = async (token, newPassword) => {
  try {
    const response = await api.post("/auth/reset-password", {
      token,
      newPassword,
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
