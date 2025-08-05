import { defineStore } from 'pinia'
import data from '../data/data.json'

interface Workshop {
  id: string;
  title: string;
  location: string;
  link: string;
  date: string;
  description: string;
  isOpen?: boolean;
};

export const useWorkshopStore = defineStore('workshop', {
  state: () => ({
    workshops: [] as Workshop[]
  }),
  actions: {
    loadWorkshops() {
      this.workshops = data?.workshops ?? []
    }
  }
})