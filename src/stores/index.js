import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useRootStore = defineStore('root', () => {
  const theme = ref(true)
  const getTheme = computed(() => theme.value ? 'light' : 'dark')
  const setTheme = (newValue)=>{
    theme.value = newValue;
  }

  return { 
    theme, 
    getTheme, 
    setTheme 
  }
})
