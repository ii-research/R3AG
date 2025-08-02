import { defineStore } from 'pinia'
import data from '../data/data.json'

export const useTutorialStore = defineStore('tutorial', {
  state: () => ({
    tutorials: [] as typeof data.tutorials
  }),
  actions: {
    loadTutorials() {
      this.tutorials = data?.tutorials ?? []
    }
  }
})