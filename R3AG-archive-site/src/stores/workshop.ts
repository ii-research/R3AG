import { defineStore } from 'pinia'
import data from '../data/data.json'

export const useWorkshopStore = defineStore('workshop', {
  state: () => ({
    workshops: [] as typeof data.workshops
  }),
  actions: {
    loadWorkshops() {
      this.workshops = data?.workshops ?? []
    }
  }
})