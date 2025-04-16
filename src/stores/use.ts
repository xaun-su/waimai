import { defineStore } from 'pinia';

interface UserState {
  token: string;
  id: string;
}

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    token: localStorage.getItem('token') || '',
    id: localStorage.getItem('id') || '',
  }),
  actions: {
    setToken(newToken: string) {
      this.token = newToken;
      localStorage.setItem('token', newToken);
    },
    clearToken() {
      this.token = '';
      localStorage.removeItem('token');
    },
    setId(newId: string) {
      this.id = newId;
      localStorage.setItem('id', newId);
    },
    clearId() {
      this.id = '';
      localStorage.removeItem('id');
    },
  },
});
