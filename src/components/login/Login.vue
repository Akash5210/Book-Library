<template>
    <el-dialog v-if="loginDialogVisible" class="loginDialog" v-model="loginDialogVisible" title="Login" width="400"
        center @close="closeForm" @close-auto-focus="closeForm">
        <el-form @submit.prevent="handleLogin" label-width="auto" style="max-width: 500px">
            <el-form-item label="Email:">
                <el-input v-model="email" type="email" id="email" required />
            </el-form-item>
            <el-form-item label="Password:">
                <el-input v-model="password" type="password" id="password" required />
            </el-form-item>
            <button button type="submit" class="login loginBtn">Login</button>
            <button @click="closeForm" class="login cancelBtn">Cancel</button>
        </el-form>
    </el-dialog>
</template>

<script setup>
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { loginUser } from '@/auth';
import { useLoggedInAccessStore } from '@/stores/loggedInAccess';

const loggedInAccess = useLoggedInAccessStore()

const email = ref('');
const password = ref('');
const loginDialogVisible = ref(true);

const handleLogin = async () => {
    try {
        await loginUser(email.value, password.value);
        // Redirect or update UI after successful login
        loggedInAccess.setIsLoggedIn(true)
        closeForm()
        ElMessage({
            message: "You are Logged In successfully",
            showClose: true,
            type: 'success',
        })
        console.log("You are Logged In successfully")
    } catch (error) {
        ElMessage({
            message: 'Failed to log in. Please try again. ' + error,
            showClose: true,
            type: 'error',
        })
    }
};

const closeForm = () => {
    loginDialogVisible.value = false;
    loggedInAccess.setShowLoginModal(false);
}
</script>
<style scoped>
.login {
    color: white;
    border: 1px solid;
    border-radius: 4px;
    padding: 0.7rem;
    cursor: pointer;
    margin: 5px 0;
    width: 100%;
}

.login.loginBtn {
    border-color: #409EFF;
    color: #409EFF;
}

.login.cancelBtn {
    border-color: #f19797;
    color: #f19797;
}

.login.loginBtn:hover {
    border-color: #409EFF;
    color: white;
    background-color: #409EFF;
}

.login.cancelBtn:hover {
    border-color: #f19797;
    color: white;
    background-color: #f19797;
}
</style>