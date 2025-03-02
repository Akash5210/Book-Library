<template>
    <div>
        <el-dialog v-if="dialogVisible" v-model="dialogVisible" :title="newBook.formData.btnStatus" width="500" destroy-on-close center>
            <el-form ref="ruleFormRef" style="max-width: 600px" :model="newBook.formData" :rules="rules" label-width="auto"
            class="demo-ruleForm" status-icon>
            <el-form-item label="Book Title" prop="title">
                <el-input v-model="newBook.formData.title" />
            </el-form-item>
            <el-form-item label="Genre" prop="type">
                <el-checkbox-group v-model="newBook.formData.type">
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
                <el-input v-model="newBook.formData.author" />
            </el-form-item>
            <el-form-item label="Price" prop="price">
                <!-- <el-input-number v-model="newBook.formData.price" :min=0>
                <template #prefix>
                    <span>₹</span>
                </template>
            </el-input-number> -->
                <el-input v-model="newBook.formData.price" />
            </el-form-item>
            <el-form-item label="Summary" prop="summary">
                <el-input v-model="newBook.formData.summary" type="textarea" />
            </el-form-item>
            <el-form-item class="dialog-footer">
                <el-button type="primary" @click="addItem(ruleFormRef)">{{ newBook.formData.btnStatus }}</el-button>
                <el-button @click="$emit('changeFormVisibility', false)">Cancel</el-button>
                <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
            </el-form-item>
        </el-form>
        </el-dialog>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';

const props = defineProps(['booksdata', 'isFormVisible', 'editBookData'])
const emit = defineEmits(['addBook', 'editBook', 'changeFormVisibility'])


const ruleFormRef = ref()
const newBook = ref({
    formData: props.editBookData || {
        id: "",
        title: '',
        type: [],
        author: "",
        price: "",
        summary: "",
        btnStatus: "Add"
    }
})
const dialogVisible = ref()

let isFormModalVisible = computed(()=>{
    console.log("triggered");
    dialogVisible.value = props.isFormVisible;
})
watch(isFormModalVisible, (currentValue)=>{
    dialogVisible.value = currentValue;
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

// const addItem1 = async (formEl) => {
//     if (!formEl) return
//     await formEl.validate((valid, fields) => {
//         if (valid) {
//             console.log('submit!')
//         } else {
//             console.log('error submit!', fields)
//         }
//     })
// }

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
        id: newBook.value.formData.btnStatus === "Add" ? Date.now() + Math.random() : newBook.value.formData.id,
        title: newBook.value.formData.title,
        type: newBook.value.formData.type,
        author: newBook.value.formData.author,
        price: newBook.value.formData.price,
        summary: newBook.value.formData.summary
    }
    // console.log(tempData);

    if (newBook.value.formData.btnStatus === "Add") {
        emit('addBook', tempData);
    } else {
        emit('editBook', tempData);
    }
    // resetValues();
    formEl.resetFields()
    emit("changeFormVisibility", false)
}
const resetForm = (formEl) => {
    console.log(formEl.formData)
    if (!formEl) return
    formEl.resetFields()
    //emit("changeFormVisibility", false)
}

</script>

