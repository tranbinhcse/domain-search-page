import { defineStore } from 'pinia'
import { post } from '@/core/apiClient'
import { formatError } from '@/utility/formatError'
import LocationRepository from '@/repositories/LocatioRepository'

export const useLocationStore = defineStore('locationStore', {
  state: () => {
    return {
      loading: false,
      error: false,
      country: {'VN': 'Việt Nam'},
      states: [],
      cities: [],
      wards: [],
    }
  },
  actions: {
    async getStates(country){
        const states = await LocationRepository.states(country)
        this.states = states
    },

    async getCities(state){
        const cities = await LocationRepository.cities(state)
        this.cities = cities
    },

    async getWards(city){
        const wards = await LocationRepository.wards(city)
        this.wards = wards
    },
  
  },
  persist: {
    paths: ['country', 'states', 'cities', 'wards']
  }
})