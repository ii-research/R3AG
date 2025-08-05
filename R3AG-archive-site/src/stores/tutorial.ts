import { defineStore } from 'pinia'
import data from '../data/data.json'

interface Tutorial {
  id: string;
  title: string;
  link: string;
  date: string;
  location?: string;
  description: string;
};

export const useTutorialStore = defineStore('tutorial', {
  state: () => ({
    tutorials: [] as Tutorial[]
  }),
  actions: {
    loadTutorials() {
      this.tutorials = data?.tutorials ?? []
    }
  }
})