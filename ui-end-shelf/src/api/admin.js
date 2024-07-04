import axios from "axios";
import axiosInstance from './axiosInstance';

export const getUsersForAdmin = async () => {
  try {
    const response = await axiosInstance.get('/admin/users');
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};

export const getVendorsForAdmin = async () => {
    try {
      const response = await axiosInstance.get('/admin/vendors');
      return response.data;
    } catch (error) {
      console.error("Error fetching vendors:", error);
      throw error;
    }
};

export const getItemsForAdmin = async () => {
    try {
      const response = await axiosInstance.get('/admin/items');
      return response.data;
    } catch (error) {
      console.error("Error fetching items:", error);
      throw error;
    }
};

export const getOrdersForAdmin = async () => {
    try {
      const response = await axiosInstance.get('/admin/orders');
      return response.data;
    } catch (error) {
      console.error("Error fetching orders:", error);
      throw error;
    }
};

export const getDisputesForAdmin = async () => {
    try {
      const response = await axiosInstance.get('/admin/disputes');
      return response.data;
    } catch (error) {
      console.error("Error fetching disputes:", error);
      throw error;
    }
  };