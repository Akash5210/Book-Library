<template>
    <div>
        <el-dialog v-if="newBook" v-model="dialogVisible" :title="newBook.btnStatus" width="500" center
            @close="closeForm" @close-auto-focus="closeForm">
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="newBook" :rules="rules" label-width="auto"
                class="demo-ruleForm" status-icon>
                <el-form-item label="Book Title" prop="title">
                    <el-input v-model="newBook.title" />
                </el-form-item>
                <el-form-item label="Genre" prop="type">
                    <el-checkbox-group v-model="newBook.type">
                        <el-checkbox value="Science Fiction" name="type">
                            Science Fiction
                        </el-checkbox>
                        <el-checkbox value="Romance" name="type">
                            Romance
                        </el-checkbox>
                        <el-checkbox value="Horror" name="type">
                            Horror
                        </el-checkbox>
                        <el-checkbox value="Thriller" name="type">
                            Thriller
                        </el-checkbox>
                        <el-checkbox value="Fantasy" name="type">
                            Fantasy
                        </el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="Author" prop="author">
                    <el-input v-model="newBook.author" />
                </el-form-item>
                <el-form-item label="Price" prop="price">
                    <!-- <el-input-number v-model="newBook.price" :min=0>
                    <template #prefix>
                        <span>₹</span>
                    </template>
</el-input-number> -->
                    <el-input v-model="newBook.price" />
                </el-form-item>
                <el-form-item label="Summary" prop="summary">
                    <el-input v-model="newBook.summary" type="textarea" />
                </el-form-item>
                <el-form-item class="dialog-footer">
                    <el-button type="primary" @click="addItem(ruleFormRef)">{{ newBook.btnStatus }}</el-button>
                    <el-button @click="closeForm">Cancel</el-button>
                    <!-- <el-button @click="resetForm(ruleFormRef)">Reset</el-button> -->
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['booksdata', 'isFormVisible', 'modifyBookData'])
const emit = defineEmits(['addBook', 'editBook', 'changeFormVisibility'])


const ruleFormRef = ref()

const formData = {
    id: "",
    title: '',
    type: [],
    author: "",
    price: "",
    summary: "",
    btnStatus: "Add"
};

const newBook = ref(formData);
const dialogVisible = ref(false);

watch(() => props.isFormVisible, (currentValue) => {
    dialogVisible.value = currentValue;
}, { deep: true });

watch(() => props.modifyBookData, (currentValue) => {
    newBook.value = currentValue;
    newBook.value["btnStatus"] = "Update";
    dialogVisible.value = true;
})

const rules = ref({
    title: [
        { required: true, message: 'Please input Book title', trigger: 'blur' },
        { min: 2, message: 'Minimum 2 letters', trigger: 'blur' },
    ],
    type: [
        {
            type: 'array',
            required: true,
            message: 'Please select at least one book type',
            trigger: 'change',
        },
    ],
    author: [
        {}
    ],
    price: [
        {}
    ],
    date1: [
        {}
    ],
    summary: [
        {},
    ],
})

let addItem = async (formEl) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            console.log('Successfully added a book')
        } else {
            console.log('error submit!', fields)
        }
    })
    const tempData = {
        id: newBook.value.btnStatus === "Add" ? Date.now() + Math.random() : newBook.value.id,
        title: newBook.value.title,
        type: newBook.value.type,
        author: newBook.value.author,
        price: newBook.value.price,
        summary: newBook.value.summary
    }

    if (newBook.value.btnStatus === "Add") {
        emit('addBook', tempData);
    } else {
        emit('editBook', tempData);
    }
    // resetValues();
    formEl.resetFields()
    closeForm()
}

const closeForm = () => {
    dialogVisible.value = false;
    emit('changeFormVisibility', false)
    newBook.value = formData
}
</script>
