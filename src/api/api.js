// api.js faylingiz mana bu bo‘ladi (siz yozgan kod + xatoliklarni to‘g‘rilab qo‘yish kerak)
import axios from "axios";

export const api = axios.create({
  baseURL: "https://nt-shopping-list.onrender.com/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["x-auth-token"] = token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Auth
export const login = (userData) => api.post("/auth", userData);
export const getMe = () => api.get("/auth");

// User
export const register = (userData) => api.post("/users", userData);
export const handelDelete = () => api.delete('/users');

// Groups
export const getMyGroups = () => api.get("/groups");
export const CreateGroup = (userData) => api.post("/groups", userData);
export const DeleteGroup = (groupId) => api.delete(`/groups/${groupId}`);
export const addMember = ({ groupId, memberId }) =>  api.post(`/groups/${groupId}/members`, { memberId });
export const RemoveMember = (groupId, memberId) => api.delete(`/groups/${groupId}/members/${memberId}`);
export const JoinToGroup = (groupId, userData) => api.post(`/groups/${groupId}/join`, userData);
export const LeaveFromGroup = ({groupId, userData}) => api.post(`/groups/${groupId}/leave`, {groupId, ...userData});

// Search
export const SearchUsers = (searchText) => api.get(`/users/search?q=${searchText}`);

// Items
export const addItem = ({ groupId, itemData }) => api.post(`/items`, { groupId, ...itemData });
export const removeItemFromGroup = (itemId) => api.delete(`/items/${itemId}`);
export const markItemAsBought = (itemId) => api.post(`/items/${itemId}/mark-as-bought`);
export const removeItemAsBought = (itemId) => api.delete(`/items/${itemId}/mark-as-bought`);