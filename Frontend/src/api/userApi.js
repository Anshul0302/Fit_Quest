import axios from 'axios';

const API_BASE = 'http://localhost:3001/api/users'; // adjust based on your backend

export const getAllUsers = () => axios.get(API_BASE);

export const updateUserStatus = (id, status) =>
  axios.patch(`${API_BASE}/${id}/status`, { status });

export const deleteUser = (id) =>
  axios.delete(`${API_BASE}/${id}`);

export const updateUser = (id, data) =>
  axios.put(`${API_BASE}/${id}`, data);

export const getUserById = (id) =>
  axios.get(`${API_BASE}/${id}`);
