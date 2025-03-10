<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <div>
      <span v-if="!loggedInAccess.isLoggedIn">
        <el-button type="primary" @click="loggedInAccess.setShowLoginModal(true)">Login</el-button>
        <el-button plain @click="loggedInAccess.setShowRegisterModal(true)">Register</el-button>
      </span>
      <el-button v-else @click="handleLogout" type="danger">Logout</el-button>
    </div>
  </div>
</template>
<script setup>
import { logoutUser } from '@/auth';

import { useLoggedInAccessStore } from '@/stores/loggedInAccess'

const loggedInAccess = useLoggedInAccessStore();

defineProps({
  msg: {
    type: String,
    required: true,
  },
})

const handleLogout = async () => {
  await logoutUser();
  // Redirect or update UI after logout
  loggedInAccess.setIsLoggedIn(false);
  console.log("You are Logged Out successfully")
};
</script>
<style scoped>
</style>
