<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <div>
      <span v-if="!loggedInAccess.isLoggedIn">
        <el-button type="primary" @click="loggedInAccess.setShowLoginModal(true)">Login</el-button>
        <el-button plain @click="loggedInAccess.setShowRegisterModal(true)">Register</el-button>
      </span>
      <!-- <el-button v-else @click="handleLogout" type="danger">Logout</el-button> -->
      <el-button v-else @click="centerDialogVisible = true" type="danger">Logout</el-button>

    </div>
  </div>
  <el-dialog v-model="centerDialogVisible" title="Are you sure to logout?" width="500" align-center>
    <!-- <span>Open the dialog from the center from the screen</span> -->
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="centerDialogVisible = false">Cancel</el-button>
        <el-button type="danger" @click="handleLogout">
          Logout
        </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from 'vue';
import { logoutUser } from '@/auth';

import { useLoggedInAccessStore } from '@/stores/loggedInAccess'

const loggedInAccess = useLoggedInAccessStore();

defineProps({
  msg: {
    type: String,
    required: true,
  },
})

const centerDialogVisible = ref(false)

const handleLogout = async () => {
  await logoutUser();
  // Redirect or update UI after logout
  loggedInAccess.setIsLoggedIn(false);
  centerDialogVisible.value = false;
  console.log("You are Logged Out successfully")
};
</script>
<style scoped>
.greetings {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
