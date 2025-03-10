import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useLoggedInAccessStore = defineStore('loggedInAccess', () => {
  //state
  const isLoggedIn = ref(false);
  const showLoginModal = ref(false);
  const showRegisterModal = ref(false);

  //getters
  const getIsLoggedIn = computed(() => isLoggedIn.value);
  const getShowLoginModal = computed(() => showLoginModal.value);
  const getshowRegisterModal = computed(() => showRegisterModal.value);

  //actions
  function setIsLoggedIn(temp) {
    isLoggedIn.value = temp
  }
  function setShowLoginModal(temp) {
    showLoginModal.value = temp
  }
  function setShowRegisterModal(temp) {
    showRegisterModal.value = temp
  }

  return { 
    isLoggedIn, 
    showLoginModal,
    showRegisterModal,
    getIsLoggedIn, 
    getShowLoginModal,
    getshowRegisterModal,
    setIsLoggedIn,
    setShowLoginModal,
    setShowRegisterModal
}
})
