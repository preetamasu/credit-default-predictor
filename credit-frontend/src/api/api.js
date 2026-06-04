import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

const api = axios.create({
  baseURL: `${API_BASE}/api/v1`,
  headers: { 'Content-Type': 'application/json' },
})
//Customers
export const createCustomer = (customerData) => api.post('/customers', customerData)

export const getCustomers = () => api.get('/customers')

export const getCustomerById = (customerId) => api.get(`/customers/${customerId}`)

export const updateCustomer = (customerId, customerData) => api.put(`/customers/${customerId}`, customerData)

export const deleteCustomer = (customerId) => api.delete(`/customers/${customerId}`)

// Applications
export const createApplication = (data) => api.post('/applications', data)

// NOTE: backend does not provide a GET /applications endpoint; list by customer instead
export const getApplicationById = (applicationId) => api.get(`/applications/${applicationId}`)

export const getApplicationsByCustomerId = (customerId) => api.get(`/applications/customer/${customerId}`)

// Predictions
export const runPrediction = (applicationId) => api.post(`/predictions/applications/${applicationId}`)

export const getPredictions = () => api.get('/predictions')

export const getPredictionById = (predictionId) => api.get(`/predictions/${predictionId}`)

export const getPredictionsByApplicationId = (applicationId) => api.get(`/predictions/application/${applicationId}`)