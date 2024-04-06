import { get, post } from "@/core/apiClient"
const LocationRepository = {
  states: async (country) => {
    console.log(country);
    const states = await get(`/location/VN/state`)
    return states
  },
 
  cities: async (state) => {
    const cities = await get(`/location/state/city/${state}`)
    return cities
  },
  wards: async (city) => {
    const wards = await get(`/location/city/ward/${city}`)
    return wards
  },
 
}

export default LocationRepository