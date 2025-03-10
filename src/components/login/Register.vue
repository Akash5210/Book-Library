<template>
    <el-dialog class="loginDialog" v-if="loginDialogVisible" v-model="loginDialogVisible" title="Register" width="400" center
    @close="closeForm" @close-auto-focus="closeForm">
        <el-form @submit.prevent="handleRegister" label-width="auto" style="max-width: 500px">
            <el-form-item label="Email:">
                <el-input v-model="email" type="email" id="email" required />
            </el-form-item>
            <el-form-item label="Password:">
                <el-input v-model="password" type="password" id="password" required />
            </el-form-item>
            <button class="login loginBtn" type="submit">Register</button>
            <button class="login cancelBtn" @click="closeForm">Cancel</button>
        </el-form>
        <!-- <p v-if="errorMessage" class="error">{{ errorMessage }}</p> -->
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus'
import { registerUser } from '@/auth';

import { useLoggedInAccessStore } from '@/stores/loggedInAccess'

const loggedInAccess = useLoggedInAccessStore()

const email = ref('');
const password = ref('');
// const errorMessage = ref('');

const loginDialogVisible = ref(true);

const handleRegister = async () => {
    try {
        await registerUser(email.value, password.value);
        // errorMessage.value = '';  // Clear error message
        // Redirect or update UI after successful registration
        closeForm();
        ElMessage({
            message: "You are registered successfully",
            showClose: true,
            type: 'success',
        })
        console.log("You are registered successfully")
    } catch (error) {
        ElMessage({
            message: "Failed to register. Please try again. " + error,
            showClose: true,
            type: 'error',
        })
        // errorMessage.value = 'Failed to register. Please try again.';
    }
};

const closeForm = () => {
    loginDialogVisible.value = false;
    loggedInAccess.setShowRegisterModal(false);
}
</script>
<style scoped>
.login{
    color: white;
    border: 1px solid;
    border-radius: 4px;
    padding: 0.7rem;
    cursor: pointer;
    margin: 5px 0;
    width: 100%;
}
.login.loginBtn{
    border-color: #409EFF;
    color: #409EFF;
}
.login.cancelBtn{
    border-color: #f19797;
    color: #f19797;
}
.login.loginBtn:hover{
    border-color: #409EFF;
    color: white;
    background-color: #409EFF;
}
.login.cancelBtn:hover{
    border-color: #f19797;
    color: white;
    background-color: #f19797;
}
</style>