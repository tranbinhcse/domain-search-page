import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', {
  state: () => {
    return {
      showSidebar: true
    }
  },
  actions: {
    toggleSidebar () {
      this.showSidebar = !this.showSidebar
    }
  }
})