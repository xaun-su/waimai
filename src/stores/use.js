import { defineStore } from 'pinia';

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '', // 从 localStorage 中读取
    id: localStorage.getItem('id') || '',       // 从 localStorage 中读取
  }),
  actions: {
    setToken(newToken) {
      this.token = newToken;
      localStorage.setItem('token', newToken); // 更新 localStorage
    },
    clearToken() {
      this.token = '';
      localStorage.removeItem('token');       // 更新 localStorage
    },
    setId(newId) {
      this.id = newId;
      localStorage.setItem('id', newId);     // 更新 localStorage
    },
    clearId() {
      this.id = '';
      localStorage.removeItem('id');           // 更新 localStorage
    },
  },
});
