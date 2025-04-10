import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '', // 初始 token 为空字符串
    userInfo: null, // 其他用户信息
    id: '',
  }),
  actions: {
    setToken(newToken) {
      this.token = newToken;
    },
    clearToken() {
      this.token = '';
    },
    setId(newId) {
      this.id = newId;
    },
    clearId() {
      this.id = '';
    },
  }
})
