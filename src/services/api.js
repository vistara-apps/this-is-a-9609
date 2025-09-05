import axios from 'axios';

// Base API configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.zkproofs-factory.com';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// User API
export const userAPI = {
  create: (userData) => apiClient.post('/users', userData),
  get: (userId) => apiClient.get(`/users/${userId}`),
  update: (userId, userData) => apiClient.put(`/users/${userId}`, userData),
  delete: (userId) => apiClient.delete(`/users/${userId}`),
  getProfile: () => apiClient.get('/users/profile'),
};

// ZK Proof API
export const zkProofAPI = {
  getTemplates: () => apiClient.get('/templates'),
  getTemplate: (templateId) => apiClient.get(`/templates/${templateId}`),
  generateProof: (proofData) => apiClient.post('/proofs/generate', proofData),
  getProof: (proofId) => apiClient.get(`/proofs/${proofId}`),
  getUserProofs: (userId) => apiClient.get(`/users/${userId}/proofs`),
  verifyProof: (proofData) => apiClient.post('/proofs/verify', proofData),
};

// Token API
export const tokenAPI = {
  create: (tokenData) => apiClient.post('/tokens', tokenData),
  get: (tokenId) => apiClient.get(`/tokens/${tokenId}`),
  getUserTokens: (userId) => apiClient.get(`/users/${userId}/tokens`),
  deploy: (tokenId) => apiClient.post(`/tokens/${tokenId}/deploy`),
  mint: (tokenId, mintData) => apiClient.post(`/tokens/${tokenId}/mint`, mintData),
};

// Smart Contract API
export const contractAPI = {
  getTemplates: () => apiClient.get('/contracts/templates'),
  deploy: (contractData) => apiClient.post('/contracts/deploy', contractData),
  getContract: (contractId) => apiClient.get(`/contracts/${contractId}`),
  interact: (contractId, interactionData) => apiClient.post(`/contracts/${contractId}/interact`, interactionData),
};

// Base Network API
export const baseAPI = {
  getGasPrice: () => apiClient.get('/base/gas-price'),
  estimateGas: (transactionData) => apiClient.post('/base/estimate-gas', transactionData),
  sendTransaction: (transactionData) => apiClient.post('/base/send-transaction', transactionData),
  getTransactionStatus: (txHash) => apiClient.get(`/base/transaction/${txHash}`),
};

// Payment API
export const paymentAPI = {
  createSession: (amount, description) => apiClient.post('/payments/session', { amount, description }),
  getSession: (sessionId) => apiClient.get(`/payments/session/${sessionId}`),
  confirmPayment: (sessionId, paymentData) => apiClient.post(`/payments/session/${sessionId}/confirm`, paymentData),
};

export default apiClient;
