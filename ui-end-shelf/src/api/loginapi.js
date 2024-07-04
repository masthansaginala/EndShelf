import axios from "axios";
import axiosInstance from "../api/axiosInstance";

//Logi API
export const postLogin = async (data) => {
  try {
    const response = await axiosInstance.post("/user-login", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

//Sign Up API
export const createUser = async (data) => {
  try {
    const response = await axiosInstance.post("/user-register", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

//Sign Up API
export const addVendorApi = async (data) => {
  try {
    const response = await axiosInstance.post("/user-register-vendor/", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const editVendorApi = async (data) => {
  try {
    const response = await axiosInstance.put("/profile", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getVendorItems = async (vendor_id) => {
  try {
    const response = await axiosInstance.get(`/vendor-items-list/?vendor_id=${vendor_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const addItemApi = async (data) => {
  try {
    const response = await axios.post("http://127.0.0.1:8000/vendor-item/", data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const editItemApi = async (data, id) => {
  try {
    const response = await axios.put(`http://127.0.0.1:8000/vendor-item-update/?item_id=${id}`, data, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const deleteItemApi = async (item_id) => {
  try {
    const response = await axiosInstance.delete(`/vendor-item-delete/?item_id=${item_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const userFeedItems = async (user_id) => {
  try {
    const response = await axiosInstance.get(`/user-item-feed/?user_id=${user_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const userPlaceOrderApi = async (data) => {
  try {
    const response = await axiosInstance.post("/user-place-order", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getUserOrders = async (user_id) => {
  try {
    const response = await axiosInstance.get(`/user-orders/?user_id=${user_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const userRaiseDisputeApi = async (data) => {
  try {
    const response = await axiosInstance.post("/user-raise-dispute", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const userDeleteDisputeApi = async (dispute_id, user_id) => {
  try {
    const response = await axiosInstance.delete(`/delete-dispute/?dispute_id=${dispute_id}&user_id=${user_id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getVendorOrders = async (user_id, order_status) => {
  try {
    if (order_status !== "") {
      const response = await axiosInstance.get(`/vendor-orders/?user_id=${user_id}&order_status=${order_status}`);
      return response.data;
    } else {
      const response = await axiosInstance.get(`/vendor-orders/?user_id=${user_id}`);
      return response.data;
    }

  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};


export const vendorOrderStatusUpdate = async (order_id, vendor_id, data) => {
  try {
    const response = await axiosInstance.put(`/vendor-update-order-status/?order_id=${order_id}&vendor_id=${vendor_id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getVendorDisputes = async (vendor_id, dispute_status, dispute_category) => {
  try {
    let query = `/vendor-disputes/?vendor_id=${vendor_id}`;

    if (dispute_status) {
      query += `&dispute_status=${dispute_status}`;
    }

    if (dispute_category) {
      query += `&dispute_category=${dispute_category}`;
    }

    const response = await axiosInstance.get(query);
    return response.data;

  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const vendorDisputeStatusUpdate = async (dispute_id, vendor_id, data) => {
  try {
    const response = await axiosInstance.put(`/vendor-update-dispute-status/?dispute_id=${dispute_id}&vendor_id=${vendor_id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getUserDisputes = async (user_id, dispute_status = "") => {
  try {
    let query = `/user-disputes/?user_id=${user_id}`;

    if (dispute_status) {
      query += `&dispute_status=${dispute_status}`;
    }

    const response = await axiosInstance.get(query);
    return response.data;

  } catch (error) {
    console.error("Error fetching user disputes:", error);
    throw error;
  }
};

export const getCategories = async () => {
  try {
    const response = await axiosInstance.get("/categories");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

//list of books
export const getItems = async () => {
  try {
    const response = await axiosInstance.get("/itemsToBook");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const bookItem = async (data) => {
  try {
    const response = await axiosInstance.post("/book-item", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

//single items todo
export const addItem = async (data) => {
  try {
    const response = await axios.post("http://localhost:3000/item", data, {
      headers: {
        Authorization: localStorage.getItem("access_token"),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const editItem = async (data, id) => {
  try {
    const response = await axios.put(`"ttp://localhost:3000/item/${id}`, data, {
      headers: {
        Authorization: localStorage.getItem("access_token"),
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const deleteItem = async (id) => {
  try {
    const response = await axiosInstance.delete(`/item/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

//profile
export const editProfile = async (data) => {
  try {
    const response = await axiosInstance.put("/profile", data);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getProfile = async (data) => {
  try {
    const response = await axiosInstance.get("/profile");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

//Rented items
export const getRentedItems = async (data) => {
  try {
    const response = await axiosInstance.get("/requested-items");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const returnItem = async (id) => {
  try {
    const response = await axiosInstance.put(`/return-item/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

//requested items
export const getRequestedItems = async (data) => {
  try {
    const response = await axiosInstance.get("/rental-items");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const changeStatusRequestedItem = async (params, id) => {
  try {
    const response = await axiosInstance.put(`/update-status/${id}`, params);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
