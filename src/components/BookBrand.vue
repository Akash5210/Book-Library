<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <div>
      <el-switch v-model="rootStore.theme" size="large" inline-prompt
        style="--el-switch-on-color: #d2d533; --el-switch-off-color: #564f43; margin: 0 10px;" active-text="Light" inactive-text="Dark" />
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
import { useRootStore } from '@/stores/index';

const loggedInAccess = useLoggedInAccessStore();
const rootStore = useRootStore();


defineProps({
  msg: {
    type: String,
    required: true,
  },
})

const centerDialogVisible = ref(false)

// const theme = ref(true)                  //dark and light mode

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
